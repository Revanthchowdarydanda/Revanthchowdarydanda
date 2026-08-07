import pandas as pd
import json

file_path = "/Users/revanthchowdary/Downloads/Mens_Doubles_Template_Format.xlsx"

try:
    xls = pd.ExcelFile(file_path)
    print("Sheets:", xls.sheet_names)
    
    df = pd.read_excel(file_path, sheet_name=0)
    
    # Let's save a clean JSON representation of the first 35 rows and all columns
    data = []
    for idx, row in df.iterrows():
        # clean row to dictionary
        row_dict = {}
        for col in df.columns:
            val = row[col]
            if pd.isna(val):
                row_dict[str(col)] = ""
            else:
                row_dict[str(col)] = str(val)
        data.append(row_dict)
        
    with open("scratch/mens_doubles_dump.json", "w") as f:
        json.dump(data, f, indent=2)
    print("Successfully dumped sheet 0 to scratch/mens_doubles_dump.json")

except Exception as e:
    print("Error:", str(e))
