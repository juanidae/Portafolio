# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Transformación de issues de Jira en DataFrames listos para exportar
# ============================================================

import pandas as pd
try:
    from Historicos.extractor_changelog import fetch_changelog_all_issues
except ModuleNotFoundError:
    from extractor_changelog import fetch_changelog_all_issues

def build_fact_issueschangelog(all_issues_changelog: list[dict]) -> pd.DataFrame:
    """
    Construye el DataFrame de hechos (fact_issueschangelog) a partir de la lista de issues.
    Incluye conversión de tipos de datos.
    """
    rows = []
    for issue in all_issues_changelog:
        fields      = issue["fields"]
        sprints     = fields.get("customfield_10020") or []
        fixVersions = fields.get("fixVersions") or []

        rows.append({
            "id_incidencia" : issue["id"],
            "incidencia"    : issue["key"],
            "id_epica"      : fields.get("parent",    {}).get("id"),
            "id_prioridad"  : fields.get("priority",  {}).get("id") if fields.get("priority") else None,
            "id_tipo"       : fields.get("issuetype", {}).get("id"),
            "id_estado"     : fields.get("status",    {}).get("id"),
            "Story Points"  : fields.get("customfield_10030"),
            "id_sprint"     : max(sprints, key=lambda s: s.get("id", 0))["id"] if sprints else None,
            "Version"       : fixVersions[0]["name"] if fixVersions else None,
            "Descripcion"   : fields.get ("summary")
        })

    fact = pd.DataFrame(rows)
    
    #── Conversión de tipos ───────────────────────────────────
    fact["id_incidencia"] = fact["id_incidencia"].astype("Int32")
    for col in ["id_epica", "id_prioridad", "id_tipo", "id_estado", "Story Points","id_sprint"]:
        fact[col] = pd.to_numeric(fact[col], errors="coerce").astype("Int32")
    
    changelog_rows = []
    for issue in all_issues_changelog:
        issue_id  = issue.get("id")
        histories = issue.get("changelog", {}).get("histories", [])

        for history in histories:
            author  = history.get("author", {})

            for item in history.get("items", []):
                changelog_rows.append({
                    "id_incidencia"    : issue_id,
                    "author"           : author.get("displayName"),
                    "Fecha Movimiento" : history.get("created"),
                    "field"            : item.get("field"),
                    "from_string"      : item.get("fromString"),
                    "to_string"        : item.get("toString"),
                })

    df_changelog = pd.DataFrame(changelog_rows)
    
    # ── Conversión de tipos ───────────────────────────────────
    df_changelog["id_incidencia"] = pd.to_numeric(df_changelog["id_incidencia"],errors="coerce").astype("Int32")
    # ── Union de consultas  ───────────────────────────────────
    df_changelog = df_changelog.merge(fact, on="id_incidencia", how="left")
    # ── Filtro para status ───────────────────────────────────
    fact_issueschangelog = df_changelog[df_changelog["field"] == "status"].reset_index(drop=True)
    
    return fact_issueschangelog


def build_dim_sprint_changelog(all_issues_changelog: list[dict]) -> pd.DataFrame:
    """
    Construye la dimensión de sprints (Dim_sprint_changelog) a partir de los issues.
    Devuelve el ultimo sprint Activo.
    """
    sprints = []
    for issue in all_issues_changelog:
        sprint_list = issue["fields"].get("customfield_10020") or []
        for sprint in sprint_list:
            sprints.append({
                "id_sprint"    : sprint.get("id"),
                "Sprint"       : sprint.get("name"),
                "estado"       : sprint.get("state"),
                "fecha_inicio" : sprint.get("startDate"),
                "fecha_fin"    : sprint.get("endDate"),
                "fecha_cierre" : sprint.get("completeDate"),
            })

    dim_sprint_changelog = (
        pd.DataFrame(sprints)
        .sort_values("id_sprint", ascending=False)
        .head(1)
        .reset_index(drop=True)
    )

    return dim_sprint_changelog

def filter_fact_by_sprints_changelog(fact: pd.DataFrame, dim_sprint_changelog: pd.DataFrame,) -> pd.DataFrame:
    """
    Filtra fact_issues para conservar solo los issues
    que pertenecen al ultimo sprint dim_sprint_changelog
    """
    return fact[fact["id_sprint"].isin(dim_sprint_changelog["id_sprint"])].reset_index(drop=True)

def build_dim_sprint_all(all_issues_changelog: list[dict], top_n: int = 6) -> pd.DataFrame:
    """
    Construye la dimensión de sprints (dim_sprint_all) a partir de los historicos issues.
    Devuelve los últimos 6 sprints únicos ordenados por fecha de inicio.
    """
    sprints = []
    for issue in all_issues_changelog:
        sprint_list = issue["fields"].get("customfield_10020") or []
        for sprint in sprint_list:
            sprints.append({
                "id_sprint"    : sprint.get("id"),
                "Sprint"       : sprint.get("name"),
                "estado"       : sprint.get("state"),
                "fecha_inicio" : sprint.get("startDate"),
                "fecha_fin"    : sprint.get("endDate"),
                "fecha_cierre" : sprint.get("completeDate"),
            })

    dim_sprint_all = (
        pd.DataFrame(sprints)
        .drop_duplicates(subset="id_sprint")
        .sort_values("id_sprint", ascending=False)
        .head(top_n)
        .reset_index(drop=True)
    )

    return dim_sprint_all



# fa = build_fact_issueschangelog(fetch_changelog_all_issues())
# print(fa)
# spr = build_dim_sprint(fetch_all_issues())
# print(spr)