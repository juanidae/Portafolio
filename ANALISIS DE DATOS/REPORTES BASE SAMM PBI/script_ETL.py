# ============================================================
# Autor: Juan Manuel Gonzalez
# DATE: 01/04/2026
# Description : Script para extraer datos de Jira, transformarlos y cargarlos en un archivo Excel.  
# Jira API → ETL → Excel
# ============================================================

# ── Librerias ─────────────────────────────────────────────
import requests
from requests.auth import HTTPBasicAuth
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

# ── Credenciales ─────────────────────────────────────────────

email = os.getenv("CORREO")
api_token = os.getenv("TOKEN")

auth = HTTPBasicAuth(email, api_token)

# ── Endpoint ─────────────────────────────────────────────

url = "https://softwaresamm.atlassian.net/rest/api/3/search/jql"

# ── Parameters ─────────────────────────────────────────────
params = {
    "jql": "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
    "maxResults": 100,
    "fields": "parent,status,priority,issuetype,customfield_10030,customfield_10020,fixVersions"
}

# ── Request ─────────────────────────────────────────────
response = requests.get(url, auth=auth, params=params)

# ── Convert to Json ─────────────────────────────────────────────
data = response.json()

all_issues = []
next_token = None

# ── Page to Page ─────────────────────────────────────────────

while True:
    params = {
        "jql": "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
        "maxResults": 100,
        "fields": "parent,status,priority,issuetype,customfield_10030,customfield_10020,fixVersions"
    }

    if next_token:
        params["nextPageToken"] = next_token

    response = requests.get(url, auth=auth, params=params)
    data = response.json()

    issues = data.get("issues", [])
    all_issues.extend(issues)

    next_token = data.get("nextPageToken")
    if not next_token or len(issues) < 100:
        break

# ── Creacion Dataframe Fact ─────────────────────────────────────────────  
    
    rows = []
    for issue in all_issues:
        fields = issue["fields"]
        sprints = fields.get("customfield_10020", [])
        fixVersions = fields.get("fixVersions", [])

        rows.append({
    "id_incidencia": issue["id"],
    "incidencia": issue["key"],
    "id_epica": fields.get("parent", {} ).get("id"),
    "id_prioridad": fields.get("priority", {} ).get("id"),
    "id_tipo": fields.get("issuetype", {} ).get("id"),
    "id_estado": fields.get("status", {}).get("id"),
    "Story Points": fields.get("customfield_10030"),
    "id_sprint": sprints[0]["id"] if sprints else None,
    "Version" : fixVersions [0]["name"] if fixVersions else None })
        
    fact = pd.DataFrame(rows)
    
# ── Convert type Data ─────────────────────────────────────────────
   
    fact['id_incidencia'] = fact['id_incidencia'].astype('int32')
    fact['id_epica'] = pd.to_numeric(fact['id_epica'], errors='coerce').astype('Int32')
    fact['id_prioridad'] = pd.to_numeric(fact['id_prioridad'], errors='coerce').astype('Int32')
    fact['id_tipo'] = pd.to_numeric(fact['id_tipo'], errors='coerce').astype('Int32')
    fact['id_estado'] = pd.to_numeric(fact['id_estado'], errors='coerce').astype('Int32')
    fact['Story Points'] = pd.to_numeric(fact['Story Points'], errors='coerce').astype('Int32')
    

# ── Creacion Dataframe Dim_sprint ─────────────────────────────────────────────  
sprints = []

for issue in issues:
    sprint_list = issue["fields"].get("customfield_10020") or []
    for sprint in sprint_list:
        sprints.append({
            "id_sprint"    : sprint.get("id"),
            "Sprint"       : sprint.get("name"),
            "estado"       : sprint.get("state"),       # active, closed, future
            "fecha_inicio" : sprint.get("startDate"),
            "fecha_fin"    : sprint.get("endDate"),
            "fecha_cierre" : sprint.get("completeDate")
        })

# Eliminar duplicados
dim_sprint = pd.DataFrame(sprints).drop_duplicates(subset="id_sprint")

# Solo los últimos 6
dim_sprint = (
    dim_sprint
    .sort_values("fecha_inicio", ascending=False)
    .head(6)
    .reset_index(drop=True)
)

# # ── Filtrar los issues por los ultimos 6 sprints ─────────────────────

fact = fact[fact["id_sprint"].isin(dim_sprint["id_sprint"])]

# ── Exportar ──────────────────────────────────────────────────
ruta = r"C:\Users\silve\Documents\Portafolio\ANALISIS DE DATOS\REPORTES BASE SAMM PBI\incidencias.xlsx"

with pd.ExcelWriter(ruta, engine="openpyxl") as writer:
     fact.to_excel(writer,sheet_name="fact_issues", index=False)
     dim_sprint.to_excel(writer, sheet_name="Dim_Sprint",index=False)

print("Archivos guardados")
