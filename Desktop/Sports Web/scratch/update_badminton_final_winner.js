const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Men's Doubles Final (Match 31) result in MongoDB...\n");

        const res = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 31' },
            { 
                $set: { 
                    status: 'completed',
                    winner: 'Kalyankar Venkata Raghavendra / Devi Palakonda',
                    score1: '0 Games',
                    score2: '2 Games',
                    scheduledTime: '2026-08-07 15:30'
                } 
            }
        );

        console.log(`- Modified count: ${res.modifiedCount}`);

        const match = await coll.findOne({ sport: 'badminton', matchId: 'Match 31' });
        console.log("\nUpdated Match 31 Details:");
        console.log(`Match: ${match.matchId} (${match.round})`);
        console.log(`Team 1: ${match.team1} (${match.score1})`);
        console.log(`Team 2: ${match.team2} (${match.score2})`);
        console.log(`Winner: ${match.winner}`);
        console.log(`Status: ${match.status}`);

    } catch (err) {
        console.error("Error updating match 31 winner:", err);
    } finally {
        await client.close();
    }
}

run();
