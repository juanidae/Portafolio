# ============================================================
# Autor: Juan Manuel Gonzalez
# Fecha: 01/04/2026
# Descripción: Orquestador principal del ETL Jira → Excel
# ============================================================

import pandas as pd
from config      import OUTPUT_PATH
from extractor   import fetch_all_issues
from transformer import build_fact_issues, build_dim_sprint, filter_fact_by_sprints
from transformer import build_dim_status, build_dim_type, build_dim_priority, build_dim_epic


def export_to_excel(fact: pd.DataFrame, dim_sprint: pd.DataFrame,
                    dim_status: pd.DataFrame,dim_type: pd.DataFrame,
                    dim_priority: pd.DataFrame,dim_epic: pd.DataFrame,
                    ruta: str) -> None:
    """Exporta los DataFrames al archivo Excel en las hojas correspondientes."""
    with pd.ExcelWriter(ruta, engine="openpyxl") as writer:
        fact.to_excel(writer,      sheet_name="fact_issues", index=False)
        dim_sprint.to_excel(writer, sheet_name="Dim_Sprint",  index=False)
        dim_status.to_excel(writer, sheet_name="Dim_status",  index=False)
        dim_type.to_excel(writer, sheet_name="Dim_Type",  index=False)
        dim_priority.to_excel(writer, sheet_name="Dim_Priority",  index=False)
        dim_epic.to_excel(writer, sheet_name="Dim_Epic",  index=False)

    print(f"Archivo guardado en: {ruta}")


def main():
    # 1. Extract
    all_issues = fetch_all_issues()

    # # 2. Transform
    fact         = build_fact_issues (all_issues)
    dim_sprint   = build_dim_sprint (all_issues, top_n=6)
    fact         = filter_fact_by_sprints (fact, dim_sprint)
    dim_status   = build_dim_status (all_issues)
    dim_type     = build_dim_type (all_issues)
    dim_priority = build_dim_priority (all_issues)
    dim_epic     = build_dim_epic (all_issues)

    # # 3. Load
    export_to_excel(fact, dim_sprint, dim_status, dim_type, dim_priority, dim_epic, OUTPUT_PATH)


if __name__ == "__main__":
    main()
