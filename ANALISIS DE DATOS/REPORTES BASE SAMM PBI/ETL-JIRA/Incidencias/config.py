# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Configuración de credenciales y constantes del ETL
# ============================================================

import os
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth

load_dotenv()

# ── Credenciales ──────────────────────────────────────────────
EMAIL     = os.getenv("CORREO")
API_TOKEN = os.getenv("TOKEN")
assert EMAIL and API_TOKEN 

AUTH      = HTTPBasicAuth(EMAIL, API_TOKEN)

# ── Endpoint ──────────────────────────────────────────────────
JIRA_URL = "https://softwaresamm.atlassian.net/rest/api/3/search/jql"

# ── JQL y campos a extraer ────────────────────────────────────
PARAMS = {
    
    "jql": "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
    "fields": "parent,status,priority,issuetype,customfield_10030,customfield_10020,fixVersions"
}
MAX_RESULTS = 50

# ── Ruta de exportación ───────────────────────────────────────
OUTPUT_PATH = (
    r"C:\Users\Admin\Documents\Portafolio\ANALISIS DE DATOS\REPORTES BASE SAMM PBI\ETL-JIRA\incidencias.xlsx"
)
