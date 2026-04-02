# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Extracción paginada de issues desde la API de Jira
# ============================================================

import requests
from config import AUTH, JIRA_URL, MAX_RESULTS

def fetch_all_issues() -> list[dict]:
    """
    Extrae todos los issues de Jira usando paginación por nextPageToken.
    Retorna una lista con todos los issues encontrados.
    """
    all_issues = []
    next_token = None

    while True:
        PARAMS = {
            
            "jql"        : "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
            "maxResults" : MAX_RESULTS,
            "fields"     : "parent,status,priority,issuetype,customfield_10030,customfield_10020,fixVersions"
        }

        if next_token:
            PARAMS["nextPageToken"] = next_token

        response = requests.get(JIRA_URL, auth=AUTH, params=PARAMS)
        response.raise_for_status()
        data = response.json()

        issues = data.get("issues", [])
        all_issues.extend(issues)

        next_token = data.get("nextPageToken")

        # Detener si no hay más páginas o si la página actual está incompleta
        if not next_token or len(issues) < MAX_RESULTS: #valor tomado de config.py
            break
        
    
    print(f"Issues extraídos: {len(all_issues)}")
    return all_issues


