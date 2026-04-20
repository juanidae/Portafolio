# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 04/04/2026
# Descripción: Extracción paginada de issues desde la API de Jira
# ============================================================

import requests
try:
    from Historicos.config_changelog import AUTH, JIRA_URL, MAX_RESULTS
except ModuleNotFoundError:
    from config_changelog import AUTH, JIRA_URL, MAX_RESULTS
    
def fetch_changelog_all_issues() -> list[dict]:
    """
    Extrae todos los issues de Jira usando paginación por nextPageToken.
    Retorna una lista con todos los issues encontrados.
    """
    all_issues_changelog = []
    next_token = None

    while True:
        PARAMS = {
            
            "jql"        : "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
            "maxResults" : MAX_RESULTS,
            "expand"     : "changelog",
            "fields"     : "parent,status,priority,issuetype,customfield_10030,customfield_10020,fixVersions,summary"
        }

        if next_token:
            PARAMS["nextPageToken"] = next_token

        response = requests.get(JIRA_URL, auth=AUTH, params=PARAMS)
        response.raise_for_status()
        data = response.json()

        issues = data.get("issues", [])
        all_issues_changelog.extend(issues)

        next_token = data.get("nextPageToken")

        # Detener si no hay más páginas o si la página actual está incompleta
        if data.get("isLast", True):
            break

        next_token = data.get("nextPageToken")
             
    return all_issues_changelog

