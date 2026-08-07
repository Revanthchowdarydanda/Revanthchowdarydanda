import pandas as pd

file_path = "/Users/revanthchowdary/Downloads/Mens_Doubles_Template_Format.xlsx"

try:
    # Read the excel file
    xls = pd.ExcelFile(file_path)
    print("Sheets in the Excel file:", xls.sheet_names)
    
    # Read the first sheet
    df = pd.read_excel(file_path, sheet_name=0)
    print("\nColumns:")
    print(df.columns.tolist())
    print("\nFirst 10 rows:")
    print(df.head(10).to_string())
    
    # Print entire data
    print("\nAll rows:")
    print(df.to_string())
except Exception as e:
    print("Error reading excel file:", str(e))
