import pandas as pd
import datetime

file_path = "/Users/revanthchowdary/Downloads/Mens_Doubles_Template_Format.xlsx"
df = pd.read_excel(file_path, sheet_name=0)
df = df.where(pd.notnull(df), None)

print("PARSING EXCEL ROWS:")

# Let's inspect each column to construct the matches array
# Round 1: Matches 1-16
print("\n--- ROUND 1 (Matches 1-16) ---")
for i in range(16):
    row_t1_idx = i * 2
    row_t2_idx = i * 2 + 1
    
    match_num_val = df.iloc[row_t1_idx]['League Stage']
    t1 = df.iloc[row_t1_idx]['Teams']
    t2 = df.iloc[row_t2_idx]['Teams']
    date_val = df.iloc[row_t1_idx]['Date']
    time_val = df.iloc[row_t1_idx]['Reporting Time']
    coord = df.iloc[row_t1_idx]['Co-ordinator']
    
    print(f"Match {i+1} ({match_num_val}): {t1} vs {t2} | Date: {date_val} | Time: {time_val} | Coord: {coord}")

# Round 2 (Round of 16): Matches 17-24
print("\n--- ROUND 2 (Matches 17-24) ---")
for i in range(8):
    row_idx = i * 4  # Matches are spaced every 4 rows in Teams.1
    # Let's see if we can find Quarters / Teams.1
    t1 = df.iloc[row_idx]['Teams.1']
    t2 = df.iloc[row_idx + 2]['Teams.1']
    match_num_val = df.iloc[row_idx]['Quarters']
    date_val = df.iloc[row_idx]['Date.1']
    time_val = df.iloc[row_idx]['Reporting Time.1']
    coord = df.iloc[row_idx]['Co-ordinator.1']
    
    print(f"Match {17+i} ({match_num_val}): {t1} vs {t2} | Date: {date_val} | Time: {time_val} | Coord: {coord}")

# Round 3 (Quarter-Finals): Matches 25-28
print("\n--- ROUND 3 (Matches 25-28) ---")
for i in range(4):
    row_idx = i * 8
    t1 = df.iloc[row_idx]['Teams.2']
    t2 = df.iloc[row_idx + 4]['Teams.2']
    match_num_val = df.iloc[row_idx]['Semis']
    date_val = df.iloc[row_idx]['Date.2']
    time_val = df.iloc[row_idx]['Reporting Time.2']
    coord = df.iloc[row_idx]['Co-ordinator.2']
    
    print(f"Match {25+i} ({match_num_val}): {t1} vs {t2} | Date: {date_val} | Time: {time_val} | Coord: {coord}")

# Round 4 (Semi-Finals): Matches 29-30
print("\n--- ROUND 4 (Matches 29-30) ---")
for i in range(2):
    row_idx = i * 16
    t1 = df.iloc[row_idx]['Teams.3']
    t2 = df.iloc[row_idx + 8]['Teams.3']
    match_num_val = df.iloc[row_idx]['Semis.1']
    date_val = df.iloc[row_idx]['Date.3']
    time_val = df.iloc[row_idx]['Reporting Time.3']
    coord = df.iloc[row_idx]['Co-ordinator.3']
    
    print(f"Match {29+i} ({match_num_val}): {t1} vs {t2} | Date: {date_val} | Time: {time_val} | Coord: {coord}")

# Round 5 (Final): Match 31
print("\n--- ROUND 5 (Match 31) ---")
row_idx = 0
t1 = df.iloc[row_idx]['Final']
t2 = df.iloc[row_idx + 16]['Final']
# Let's check where the Final match ID is or if it is Match 31
# Let's inspect the headers and values of row 0
print(f"Final match info:")
print(f"  Final: {df.iloc[row_idx]['Final']}")
print(f"  Date.4: {df.iloc[row_idx]['Date.4']}")
print(f"  Reporting Time.4: {df.iloc[row_idx]['Reporting Time.4']}")
print(f"  Co-ordinator.4: {df.iloc[row_idx]['Co-ordinator.4']}")
