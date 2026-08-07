const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Update Match 17 status and winner
        console.log("Setting winner for Match 17 to Aditya / HR...");
        const updateM17 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 17', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Aditya / HR',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`  - modified: ${updateM17.modifiedCount}`);

        // 2. Propagate to Match 25
        console.log("Advancing Aditya / HR to Match 25...");
        const updateM25 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 25', round: "Men's Doubles - Quarter-Finals" },
            {
                $set: {
                    team1: 'Aditya / HR'
                }
            }
        );
        console.log(`  - modified: ${updateM25.modifiedCount}`);

        console.log("Match 17 update completed successfully!");

    } catch (err) {
        console.error("Error updating Match 17 winner:", err);
    } finally {
        await client.close();
    }
}

run();
