const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Match 29 and Match 30 scheduled times to 3:30 PM...\n");

        const res = await coll.updateMany(
            { sport: 'badminton', matchId: { $in: ['Match 29', 'Match 30'] } },
            { $set: { scheduledTime: '2026-08-07 15:30' } }
        );
        console.log(`- Modified matches count: ${res.modifiedCount}`);

        const matches = await coll.find({ sport: 'badminton', matchId: { $in: ['Match 29', 'Match 30'] } }).toArray();
        console.log("\nUpdated Matches Details:");
        matches.forEach(m => {
            console.log(`[${m.matchId} - ${m.round}] ${m.team1} vs ${m.team2} | Time: ${m.scheduledTime}`);
        });

    } catch (err) {
        console.error("Error updating scheduledTime:", err);
    } finally {
        await client.close();
    }
}

run();
