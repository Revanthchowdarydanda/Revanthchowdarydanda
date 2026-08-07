const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Rename Philomin to Sandeep Ganesh in Match 11
        console.log("Renaming Yesupogu Philomin to Sandeep Ganesh in Match 11...");
        const renameRes = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 11', round: "Men's Doubles - Round 1" },
            { $set: { team1: "Lenkati Aravind / Sandeep Ganesh" } }
        );
        console.log(`Renamed player: modified = ${renameRes.modifiedCount}`);

        // 2. Define the Round 1 Winners (second batch)
        const winners = {
            'Match 9': 'Kuchanapelli Maruthi Kumar / Maddela Prashanth',
            'Match 10': 'Siva Sarath Chandra Kapeesha Sakila / Jaidev Varma Pakalapati',
            'Match 11': 'Lenkati Aravind / Sandeep Ganesh',
            'Match 12': 'Naveen Kumar Musham / Danda Revanth Chowdary',
            'Match 13': 'Ganta Ram Prasad / Twinkle Satwik Marrapu',
            'Match 14': 'Ganavardhan Dangeti / Venkata Subrahmanyam Animalla',
            'Match 16': 'Ankit Thakur / Ayus Kumar Prusty'
        };

        // 3. Update Match 9 to Match 14 and Match 16 statuses and winners
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
        // Match 21 (Match 9 Winner vs Match 10 Winner)
        // Match 22 (Match 11 Winner vs Match 12 Winner)
        // Match 23 (Match 13 Winner vs Match 14 Winner)
        // Match 24 (Match 15 Winner vs Match 16 Winner)
        const nextRoundUpdates = [
            { matchId: 'Match 21', team1: 'Kuchanapelli Maruthi Kumar / Maddela Prashanth', team2: 'Siva Sarath Chandra Kapeesha Sakila / Jaidev Varma Pakalapati' },
            { matchId: 'Match 22', team1: 'Lenkati Aravind / Sandeep Ganesh', team2: 'Naveen Kumar Musham / Danda Revanth Chowdary' },
            { matchId: 'Match 23', team1: 'Ganta Ram Prasad / Twinkle Satwik Marrapu', team2: 'Ganavardhan Dangeti / Venkata Subrahmanyam Animalla' },
            { matchId: 'Match 24', team2: 'Ankit Thakur / Ayus Kumar Prusty' }
        ];

        for (const update of nextRoundUpdates) {
            console.log(`Updating next round ${update.matchId} with advanced teams...`);
            const $set = {};
            if (update.team1) $set.team1 = update.team1;
            if (update.team2) $set.team2 = update.team2;

            const nextRes = await coll.updateOne(
                { sport: 'badminton', matchId: update.matchId, round: "Men's Doubles - Round of 16" },
                { $set }
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
