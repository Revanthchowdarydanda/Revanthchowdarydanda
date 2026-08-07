const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Men's Doubles Final (Match 31) date to today (2026-08-07 16:30)...\n");

        const res = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 31' },
            { $set: { scheduledTime: '2026-08-07 16:30' } }
        );

        console.log(`- Modified matches count: ${res.modifiedCount}`);

        const match = await coll.findOne({ sport: 'badminton', matchId: 'Match 31' });
        console.log("\nUpdated Match 31 Details:");
        console.log(`[${match.matchId} - ${match.round}] ${match.team1} vs ${match.team2}`);
        console.log(`Scheduled Time: ${match.scheduledTime}`);
        console.log(`Status: ${match.status}`);

    } catch (err) {
        console.error("Error updating scheduledTime:", err);
    } finally {
        await client.close();
    }
}

run();
