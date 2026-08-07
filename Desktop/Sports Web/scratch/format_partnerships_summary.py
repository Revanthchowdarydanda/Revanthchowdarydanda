import json

with open('scratch/all_partnerships.json') as f:
    partnerships = json.load(f)

print(f"Total Partnerships Processed: {len(partnerships)}")

# Group by team
team_partnerships = {}
for p in partnerships:
    # Match string like "Team DC vs Hype Royals"
    teams = p["match"].split(" vs ")
    # Determine team based on file context or batter names if possible, else list by match
    match_key = f"{p['match']} (Innings {p['innings']})"
    if match_key not in team_partnerships:
        team_partnerships[match_key] = []
    team_partnerships[match_key].append(p)

summary_md = []
summary_md.append("# 🏏 Complete Tournament Partnerships Analysis")
summary_md.append(f"**Total Partnerships Extracted:** {len(partnerships)} across all 26 match innings screenshots.\n")

summary_md.append("## 🏆 Top 20 Highest Partnerships (All Matches)")
summary_md.append("| Rank | Runs (Balls) | Batter 1 (Runs) | Batter 2 (Runs) | Match | Innings |")
summary_md.append("| :--- | :--- | :--- | :--- | :--- | :--- |")

for idx, p in enumerate(partnerships[:20], 1):
    summary_md.append(f"| **#{idx}** | **{p['runs']}** ({p['balls']}b) | {p['batter1']} ({p['b1Runs']}) | {p['batter2']} ({p['b2Runs']}) | {p['match']} | Innings {p['innings']} |")

summary_md.append("\n---\n")

summary_md.append("## 📋 All Partnerships Grouped by Match\n")

for match_name, p_list in team_partnerships.items():
    summary_md.append(f"### 📍 {match_name}")
    summary_md.append("| Runs (Balls) | Batters | Scores |")
    summary_md.append("| :--- | :--- | :--- |")
    # Sort within match by runs
    p_list_sorted = sorted(p_list, key=lambda x: x["runs"], reverse=True)
    for p in p_list_sorted:
        summary_md.append(f"| **{p['runs']}** ({p['balls']}b) | {p['batter1']} & {p['batter2']} | {p['batter1']} {p['b1Runs']}({p['b1Balls']}), {p['batter2']} {p['b2Runs']}({p['b2Balls']}) |")
    summary_md.append("")

with open('scratch/partnerships_summary.md', 'w') as f:
    f.write("\n".join(summary_md))

print("Summary written to scratch/partnerships_summary.md")
