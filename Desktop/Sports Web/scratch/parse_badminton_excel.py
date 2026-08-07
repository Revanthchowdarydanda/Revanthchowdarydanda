import pandas as pd
import json

file_path = "/Users/revanthchowdary/Downloads/Mixed_Doubles_Badminton_Round1_Fixtures.xlsx"
df = pd.read_excel(file_path, sheet_name=0)

# Replace NaN with None
df = df.where(pd.notnull(df), None)

print("Rows data:")
for idx, row in df.iterrows():
    print(f"Row {idx}:")
    print(f"  Match: {row.get('Match')}")
    print(f"  Teams: {row.get('Teams')}")
    print(f"  League Stage: {row.get('League Stage')}")
    print(f"  Date: {row.get('Date')}")
    # Format Reporting Time if it is a datetime/time object
    rt = row.get('Reporting Time')
    if rt:
        rt_str = str(rt)
    else:
        rt_str = None
    print(f"  Reporting Time: {rt_str}")
    print(f"  Co-ordinator: {row.get('Co-ordinator')}")
    print(f"  Teams.1: {row.get('Teams.1')}")
    print(f"  Quarters: {row.get('Quarters')}")
    print(f"  Reporting Time.1: {row.get('Reporting Time.1')}")
    print(f"  Co-ordinator.1: {row.get('Co-ordinator.1')}")
    print(f"  Teams.2: {row.get('Teams.2')}")
    print(f"  Semis: {row.get('Semis')}")
    print(f"  Reporting Time.2: {row.get('Reporting Time.2')}")
    print(f"  Co-ordinator.2: {row.get('Co-ordinator.2')}")
    print(f"  Teams.3: {row.get('Teams.3')}")
    print(f"  Final: {row.get('Final')}")
    print(f"  Co-ordinator.3: {row.get('Co-ordinator.3')}")
    print(f"  Unnamed: 17: {row.get('Unnamed: 17')}")
    print("-" * 40)
