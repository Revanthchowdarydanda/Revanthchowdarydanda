const matchData = {
    id: "6a4f7f6d5b35acd2aba62688",
    sport: "cricket",
    round: "Finals",
    matchId: "Final",
    team1: "Hype Royals",
    team2: "Weekend Warriors",
    scheduledTime: "2026-08-10 14:30",
    venue: "SRRC Cricket Ground",
    coordinator: "Rahul/Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: "",
    note: "Tentative and subject to rain and weather"
};

async function updateMatch() {
    console.log("Updating Cricket Finals match...");
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
