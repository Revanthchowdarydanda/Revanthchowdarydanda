const matchData = {
    id: "6a4f7f6b5b35acd2aba62686",
    sport: "cricket",
    round: "Semi-Finals",
    matchId: "Semi-Final 1",
    team1: "Hype Royals",
    team2: "Team DC",
    scheduledTime: "2026-07-27 14:30",
    venue: "SRRC Cricket Ground",
    coordinator: "Rahul/Revanth",
    status: "completed",
    score1: "128/3 (9.0)",
    score2: "122/7 (15.0)",
    winner: "Hype Royals",
    scoreDetail: "Hype Royals won by 7 wickets",
    cricket_active_batting: "t1",
    cricket_toss_winner: "t1",
    cricket_toss_decision: "field",
    cricket_t1_runs: 128,
    cricket_t1_wickets: 3,
    cricket_t1_overs: "9.0",
    cricket_t2_runs: 122,
    cricket_t2_wickets: 7,
    cricket_t2_overs: "15.0",
    cricket_target: 123,
    cricket_potm_override: "Ravi Kumar",
    cricket_commentary: "Hype Royals won by 7 wickets. Ravi Kumar played an unbelievable knock of 95* off 30 balls (6 fours, 11 sixes) to lead Hype Royals into the Finals!",
    cricket_extras_t1: { b: 0, lb: 0, w: 2, nb: 3 },
    cricket_extras_t2: { b: 1, lb: 0, w: 8, nb: 4 },
    playerStats: {
        batting: [
            // Team DC
            { name: "Vinay Singuru", team: "Team DC", runs: 27, balls: 15, fours: 4, sixes: 1, out: true },
            { name: "GM Mani (wk)", team: "Team DC", runs: 58, balls: 34, fours: 6, sixes: 4, out: true },
            { name: "praveen Koduri", team: "Team DC", runs: 9, balls: 7, fours: 2, sixes: 0, out: true },
            { name: "Mohd Sarfaraz Ali", team: "Team DC", runs: 4, balls: 5, fours: 1, sixes: 0, out: true },
            { name: "Sagar (c)", team: "Team DC", runs: 2, balls: 4, fours: 0, sixes: 0, out: true },
            { name: "Prasanth", team: "Team DC", runs: 2, balls: 10, fours: 0, sixes: 0, out: true },
            { name: "Maruthi", team: "Team DC", runs: 1, balls: 3, fours: 0, sixes: 0, out: true },
            { name: "Rayudu Sai Dharma Teja", team: "Team DC", runs: 3, balls: 6, fours: 0, sixes: 0, out: true },
            { name: "Mangesh Tanpure", team: "Team DC", runs: 2, balls: 6, fours: 0, sixes: 0, out: false },
            { name: "Srikanth Nagayapally", team: "Team DC", runs: 1, balls: 4, fours: 0, sixes: 0, out: false },
            // Hype Royals
            { name: "Ajith Kavali", team: "Hype Royals", runs: 2, balls: 5, fours: 0, sixes: 0, out: true },
            { name: "Revanth", team: "Hype Royals", runs: 1, balls: 2, fours: 0, sixes: 0, out: true },
            { name: "Rahul Sonti (c & wk)", team: "Hype Royals", runs: 0, balls: 1, fours: 0, sixes: 0, out: true },
            { name: "Kumar", team: "Hype Royals", runs: 25, balls: 19, fours: 3, sixes: 0, out: false },
            { name: "Ravi Kumar", team: "Hype Royals", runs: 95, balls: 30, fours: 6, sixes: 11, out: false }
        ],
        bowling: [
            // Hype Royals Bowlers
            { name: "Ajith Kavali", team: "Hype Royals", overs: "3", maidens: 0, runs: 30, wickets: 1, nb: 0, wd: 3 },
            { name: "Sai Kumar", team: "Hype Royals", overs: "3", maidens: 0, runs: 43, wickets: 0, nb: 3, wd: 2 },
            { name: "Naveen", team: "Hype Royals", overs: "3", maidens: 0, runs: 11, wickets: 2, nb: 1, wd: 0 },
            { name: "Ravi Kumar", team: "Hype Royals", overs: "3", maidens: 0, runs: 26, wickets: 0, nb: 0, wd: 3 },
            { name: "Kumar", team: "Hype Royals", overs: "3", maidens: 0, runs: 11, wickets: 3, nb: 0, wd: 0 },
            // Team DC Bowlers
            { name: "Sagar (c)", team: "Team DC", overs: "3", maidens: 0, runs: 30, wickets: 2, nb: 0, wd: 0 },
            { name: "Prasanth", team: "Team DC", overs: "2", maidens: 0, runs: 38, wickets: 1, nb: 1, wd: 1 },
            { name: "Vinay Singuru", team: "Team DC", overs: "2", maidens: 0, runs: 15, wickets: 0, nb: 2, wd: 0 },
            { name: "praveen Koduri", team: "Team DC", overs: "2", maidens: 0, runs: 45, wickets: 0, nb: 0, wd: 1 }
        ]
    }
};

async function updateMatch() {
    console.log("Updating Semi-Final 1 scorecard...");
    const payload = {
        passcode: "cyient2026",
        match: matchData
    };

    try {
        const response = await fetch('https://pwa-aftermarket-sports-fest.vercel.app/api/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const resJson = await response.json();
        console.log("Response:", resJson);
    } catch (e) {
        console.error("Failed to update match:", e);
    }
}

updateMatch();
