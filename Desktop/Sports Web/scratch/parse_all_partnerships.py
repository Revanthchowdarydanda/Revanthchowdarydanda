import json
import re
import os

with open('scratch/ocr_raw_output.json') as f:
    raw_data = json.load(f)

partnerships = []

# Pattern for individual runs/balls e.g. "10(9)" or "0(0)"
score_pattern = re.compile(r'^(\d+)\s*\(\s*(\d+)\s*\)$')
# Pattern for total partnership e.g. "28 (22)" or "28(22)"
total_pattern = re.compile(r'^(\d+)\s*\(\s*(\d+)\s*\)$')

def extract_match_info(filename):
    # Filename format: Partnerships TeamA VS TeamB PWA-ACS-L1 Sports Championship [(1)].png
    clean_name = filename.replace("Partnerships ", "").replace(" PWA-ACS-L1 Sports Championship", "").replace(".png", "")
    is_innings_2 = "(1)" in clean_name
    clean_name = clean_name.replace(" (1)", "").strip()
    
    parts = clean_name.split(" VS ")
    team1 = parts[0].strip() if len(parts) > 0 else "Unknown"
    team2 = parts[1].strip() if len(parts) > 1 else "Unknown"
    
    return {
        "match": f"{team1} vs {team2}",
        "innings": 2 if is_innings_2 else 1,
        "filename": filename
    }

for filename, lines in raw_data.items():
    match_info = extract_match_info(filename)
    
    # We parse the lines sequentially
    # We look for score patterns: line i = score1, line i+1 = score2, line i+2 = total score
    i = 0
    while i < len(lines):
        # Check if lines[i], lines[i+1], lines[i+2] form a score group
        if i + 2 < len(lines):
            m1 = score_pattern.match(lines[i])
            m2 = score_pattern.match(lines[i+1])
            m3 = total_pattern.match(lines[i+2])
            
            # Sometimes scores start at i+2 and names are i, i+1
            if m1 and m2 and m3:
                # Batter names are likely at i-2 and i-1
                b1_name = lines[i-2] if i - 2 >= 0 and not score_pattern.match(lines[i-2]) else "Batter 1"
                b2_name = lines[i-1] if i - 1 >= 0 and not score_pattern.match(lines[i-1]) else "Batter 2"
                
                b1_runs, b1_balls = int(m1.group(1)), int(m1.group(2))
                b2_runs, b2_balls = int(m2.group(1)), int(m2.group(2))
                tot_runs, tot_balls = int(m3.group(1)), int(m3.group(2))
                
                partnerships.append({
                    "match": match_info["match"],
                    "innings": match_info["innings"],
                    "batter1": b1_name,
                    "b1Runs": b1_runs,
                    "b1Balls": b1_balls,
                    "batter2": b2_name,
                    "b2Runs": b2_runs,
                    "b2Balls": b2_balls,
                    "runs": tot_runs,
                    "balls": tot_balls,
                    "filename": filename
                })
                i += 3
                continue
        i += 1

# Sort partnerships by total runs descending
partnerships.sort(key=lambda x: (x["runs"], -x["balls"]), reverse=True)

print(f"Extracted {len(partnerships)} total partnerships across all matches.\n")

with open('scratch/all_partnerships.json', 'w') as f:
    json.dump(partnerships, f, indent=2)

print("Top 20 Partnerships Across Tournament:")
print("=" * 80)
for idx, p in enumerate(partnerships[:25], 1):
    print(f"{idx:2d}. {p['runs']} runs ({p['balls']} balls) | {p['batter1']} ({p['b1Runs']}) & {p['batter2']} ({p['b2Runs']}) | {p['match']} (Innings {p['innings']})")
