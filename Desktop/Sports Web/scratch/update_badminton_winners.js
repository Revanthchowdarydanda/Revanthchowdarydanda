const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Rename Eshwara Venkata Abhinay Kurukundu to Niranjan Kumar in the DB if present
        console.log("Renaming player in Match 8...");
        const renameTeam1 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 8', round: "Men's Doubles - Round 1" },
            { $set: { team1: "Ramkumar Bhake / Niranjan Kumar" } }
        );
        console.log(`Renamed team1 in Match 8: modified = ${renameTeam1.modifiedCount}`);

        // 2. Define the Round 1 Winners
        const winners = {
            'Match 1': 'Aditya / HR',
            'Match 2': 'Satyamohan / Ali',
            'Match 3': 'Koushik Thumula / Duddu Vivek Vardhan',
            'Match 4': 'Raghu / Chandu Sai Kumar',
            'Match 5': 'Ram Gopal / Mani Kumar Jurra',
            'Match 6': 'Lade Naresh / Dwasari Deepak',
            'Match 7': 'Kolloju Vamshi Krishna / Bhavesh Singh',
            'Match 8': 'Ramkumar Bhake / Niranjan Kumar'
        };

        // 3. Update Match 1 to Match 8 status and winners
        for (const [matchId, winnerName] of Object.entries(winners)) {
            console.log(`Setting winner for ${matchId} to ${winnerName}...`);
            const updateRes = await coll.updateOne(
                { sport: 'badminton', matchId: matchId, round: "Men's Doubles - Round 1" },
                {
                    $set: {
                        status: 'completed',
                        winner: winnerName,
                        score1: '0 Games',
                        score2: '0 Games',
                        scoreDetail: ''
                    }
                }
            );
            console.log(`  - modified: ${updateRes.modifiedCount}`);
        }

        // 4. Update the next round (Round of 16) matches with the advanced teams
        const nextRoundUpdates = [
            { matchId: 'Match 17', team1: 'Aditya / HR', team2: 'Satyamohan / Ali' },
            { matchId: 'Match 18', team1: 'Koushik Thumula / Duddu Vivek Vardhan', team2: 'Raghu / Chandu Sai Kumar' },
            { matchId: 'Match 19', team1: 'Ram Gopal / Mani Kumar Jurra', team2: 'Lade Naresh / Dwasari Deepak' },
            { matchId: 'Match 20', team1: 'Kolloju Vamshi Krishna / Bhavesh Singh', team2: 'Ramkumar Bhake / Niranjan Kumar' }
        ];

        for (const update of nextRoundUpdates) {
            console.log(`Updating next round ${update.matchId} with advanced teams...`);
            const nextRes = await coll.updateOne(
                { sport: 'badminton', matchId: update.matchId, round: "Men's Doubles - Round of 16" },
                {
                    $set: {
                        team1: update.team1,
                        team2: update.team2
                    }
                }
            );
            console.log(`  - modified: ${nextRes.modifiedCount}`);
        }

        console.log("All updates completed successfully!");

    } catch (err) {
        console.error("Error running database updates:", err);
    } finally {
        await client.close();
    }
}

run();
