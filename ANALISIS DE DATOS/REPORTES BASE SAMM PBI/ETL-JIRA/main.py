# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Orquestador principal del ETL Jira → Excel
# ============================================================

import pandas as pd
from config      import OUTPUT_PATH
from extractor   import fetch_all_issues
from transformer import build_fact_issues, build_dim_sprint, filter_fact_by_sprints


def export_to_excel(fact: pd.DataFrame, dim_sprint: pd.DataFrame, ruta: str) -> None:
    """Exporta los DataFrames al archivo Excel en las hojas correspondientes."""
    with pd.ExcelWriter(ruta, engine="openpyxl") as writer:
        fact.to_excel(writer,      sheet_name="fact_issues", index=False)
        dim_sprint.to_excel(writer, sheet_name="Dim_Sprint",  index=False)
    print(f"Archivo guardado en: {ruta}")


def main():
    # 1. Extract
    all_issues = fetch_all_issues()

    # # 2. Transform
    fact      = build_fact_issues(all_issues)
    dim_sprint = build_dim_sprint(all_issues, top_n=6)
    fact       = filter_fact_by_sprints(fact, dim_sprint)

    # # 3. Load
    export_to_excel(fact, dim_sprint, OUTPUT_PATH)


if __name__ == "__main__":
    main()
