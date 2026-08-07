import json

with open('scratch/all_partnerships.json') as f:
    all_p = json.load(f)

top10 = []
for idx, p in enumerate(all_p[:10], 1):
    top10.append({
        "rank": idx,
        "runs": p["runs"],
        "balls": p["balls"],
        "batter1": p["batter1"],
        "b1Runs": p["b1Runs"],
        "b1Balls": p["b1Balls"],
        "batter2": p["batter2"],
        "b2Runs": p["b2Runs"],
        "b2Balls": p["b2Balls"],
        "match": p["match"],
        "innings": p["innings"]
    })

with open('public/data/cricket_leaderboards.json', 'r') as f:
    leaderboards_data = json.load(f)

leaderboards_data['partnerships'] = top10

with open('public/data/cricket_leaderboards.json', 'w') as f:
    json.dump(leaderboards_data, f, indent=2)

print("Successfully added top 10 partnerships to public/data/cricket_leaderboards.json")
