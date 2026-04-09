# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Transformación de issues de Jira en DataFrames listos para exportar
# ============================================================

import pandas as pd
try:
    from Incidencias.extractor import fetch_all_issues
except ModuleNotFoundError:
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
            "id_sprint"     : max(sprints, key=lambda s: s.get("id", 0))["id"] if sprints else None,
            "Version"       : fixVersions[0]["name"] if fixVersions else None,
        })

    fact = pd.DataFrame(rows)

    # ── Conversión de tipos ───────────────────────────────────
    fact["id_incidencia"] = fact["id_incidencia"].astype("int32")
    for col in ["id_epica", "id_prioridad", "id_tipo", "id_estado", "Story Points","id_sprint"]:
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
        .sort_values("id_sprint", ascending=False)
        .head(top_n)
        .reset_index(drop=True)
    )

    return dim_sprint


def filter_fact_by_sprints(fact: pd.DataFrame, dim_sprint: pd.DataFrame,) -> pd.DataFrame:
    """
    Filtra fact_issues para conservar solo los issues
    que pertenecen a los sprints de dim_sprint.
    """
    return fact[fact["id_sprint"].isin(dim_sprint["id_sprint"])].reset_index(drop=True)


def build_dim_status(all_issues: list[dict]) -> pd.DataFrame:
    """
    Construye la dimensión de estados (dim_status) a partir de los issues.
    Devuelve los estados únicos ordenados alfabéticamente.
    """
    status = []

    for issue in all_issues:
        status_list = issue['fields'].get('status')
        status.append({
            
                "id_status"    : status_list.get("id"),
                "estado"       : status_list.get("name"),
                
                })

    dim_status = (
        pd.DataFrame(status)
        .drop_duplicates(subset="id_status")
        .sort_values("estado", ascending=True)
        .reset_index(drop=True)
    )

    return dim_status

def build_dim_type(all_issues: list[dict]) -> pd.DataFrame:
    """
    Construye la dimensión de tipos (dim_type) a partir de los issues.
    Devuelve los tipos únicos ordenados alfabéticamente.
    """
    types = []

    for issue in all_issues:
        type_list = issue['fields'].get('issuetype')
        types.append({
            
                "id_type"    : type_list.get("id") if type_list else None,
                "tipo"       : type_list.get("name") if type_list else None,
                
                })

    dim_type = (
        pd.DataFrame(types)
        .drop_duplicates(subset="id_type")
        .sort_values("tipo", ascending=True)
        .reset_index(drop=True)
    )

    return dim_type

def build_dim_priority(all_issues: list[dict]) -> pd.DataFrame:
    """
    Construye la dimensión de prioridades (dim_prioridad) a partir de los issues.
    Devuelve las prioridades únicas ordenadas alfabéticamente.
    """
    priority = []

    for issue in all_issues:
        priority_list = issue['fields'].get('priority')
        priority.append({
            
                "id_priority" : priority_list.get("id")   if priority_list else None,
                "prioridad"   : priority_list.get("name") if priority_list else None,
                
                })


    dim_priority = (
        pd.DataFrame(priority)
        .drop_duplicates(subset="id_priority")
        .dropna(subset=["id_priority", "prioridad"])
        .sort_values("prioridad", ascending=True)
        .reset_index(drop=True)
    )
    
    traduccion_prioridad = {
    'High'   : 'Alta',
    'Highest': 'Muy Alta',
    'Low'    : 'Baja',
    'Lowest' : 'Muy Baja',
    'Medium' : 'Media'
}
    dim_priority['prioridad'] = dim_priority['prioridad'].map(traduccion_prioridad).fillna(dim_priority['prioridad'])


    return dim_priority


def build_dim_epic(all_issues: list[dict]) -> pd.DataFrame:
    """
    Construye la dimensión de epics (dim_epic) a partir de los issues.
    Devuelve los epics únicos ordenados alfabéticamente.
    """
    epic = []

    for issue in all_issues:
        parent = issue["fields"].get("parent")
        if parent and isinstance(parent, dict):
            epic.append({
                
                "id_epica" : parent.get("id"),
                "epic"     : parent.get("fields", {}).get("summary")
            })

    dim_epic = (
        pd.DataFrame(epic)
        .drop_duplicates(subset="epic")
        .sort_values("epic", ascending=True)
        .reset_index(drop=True)
    )
    
    return dim_epic

# fa = build_fact_issues(fetch_all_issues())
# print(fa)
# spr = build_dim_sprint(fetch_all_issues())
# print(spr)