# Credenciales
import requests
from requests.auth import HTTPBasicAuth
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

email = os.getenv("CORREO")
api_token = os.getenv("TOKEN")

auth = HTTPBasicAuth(email, api_token)

# Endpoint
url = "https://softwaresamm.atlassian.net/rest/api/3/search/jql"

# Parámetros
params = {
    "jql": "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
    "maxResults": 50,
    "fields": "parent,status,priority,issuetype,customfield_10030,customfield_10020"
}

# Request
response = requests.get(url, auth=auth, params=params)

# Convertir a JSON
data = response.json()

all_issues = []
next_token = None

while True:
    params = {
        "jql": "project != 'Support Idae' AND Sprint is not EMPTY ORDER BY key",
        "maxResults": 50,
        "fields": "parent,status,priority,issuetype,customfield_10030,customfield_10020"
    }

    if next_token:
        params["nextPageToken"] = next_token

    response = requests.get(url, auth=auth, params=params)
    data = response.json()

    issues = data.get("issues", [])
    all_issues.extend(issues)

    if data.get("isLast", True):
        break

    next_token = data.get("nextPageToken")
     
    rows = []
    for issue in all_issues:
        fields = issue["fields"]
        sprints = fields.get("customfield_10020", [])

        rows.append({
    "id_incidencia": issue["id"],
    "incidencia": issue["key"],
    "id_epica": fields.get("parent", {} ).get("id"),
    "id_prioridad": fields.get("priority", {} ).get("id"),
    "id_tipo": fields.get("issuetype", {} ).get("id"),
    "id_estado": fields.get("status", {}).get("id"),
    "Puntos Historia": fields.get("customfield_10030"),
    "id_sprint": sprints[0]["id"] })
        
    df = pd.DataFrame(rows)
    
    ruta = r"C:\Users\silve\Documents\Portafolio\ANALISIS DE DATOS\REPORTES BASE SAMM PBI/incidencias.csv"
        
    # Guardar en CSV
    df.to_csv(ruta, index=False, encoding="utf-8-sig")