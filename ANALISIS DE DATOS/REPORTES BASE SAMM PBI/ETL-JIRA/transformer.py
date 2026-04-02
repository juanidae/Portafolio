# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Transformación de issues de Jira en DataFrames listos para exportar
# ============================================================

import pandas as pd
from extractor import fetch_all_issues


def build_fact_issues(all_issues: list[dict]) -> pd.DataFrame:
    """
    Construye el DataFrame de hechos (fact_issues) a partir de la lista de issues.
    Incluye conversión de tipos de datos.
    """
    rows = []
    for issue in all_issues:
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
            "id_sprint"     : sprints[0]["id"] if sprints else None,
            "Version"       : fixVersions[0]["name"] if fixVersions else None,
        })

    fact = pd.DataFrame(rows)

    # ── Conversión de tipos ───────────────────────────────────
    fact["id_incidencia"] = fact["id_incidencia"].astype("int32")
    for col in ["id_epica", "id_prioridad", "id_tipo", "id_estado", "Story Points"]:
        fact[col] = pd.to_numeric(fact[col], errors="coerce").astype("Int32")

    return fact


def build_dim_sprint(all_issues: list[dict], top_n: int = 6) -> pd.DataFrame:
    """
    Construye la dimensión de sprints (dim_sprint) a partir de los issues.
    Devuelve los últimos 6 sprints únicos ordenados por fecha de inicio.
    """
    sprints = []
    for issue in all_issues:
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

    dim_sprint = (
        pd.DataFrame(sprints)
        .drop_duplicates(subset="id_sprint")
        .sort_values("fecha_inicio", ascending=False)
        .head(top_n)
        .reset_index(drop=True)
    )

    return dim_sprint


def filter_fact_by_sprints(
    fact: pd.DataFrame,
    dim_sprint: pd.DataFrame,
) -> pd.DataFrame:
    """
    Filtra fact_issues para conservar solo los issues
    que pertenecen a los sprints de dim_sprint.
    """
    return fact[fact["id_sprint"].isin(dim_sprint["id_sprint"])].reset_index(drop=True)
