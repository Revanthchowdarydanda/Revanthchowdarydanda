const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Match 20 scheduled time...\n");

        const resM20 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 20' },
            { $set: { scheduledTime: '2026-08-06 15:00' } }
        );
        console.log(`- Modified Match 20 count: ${resM20.modifiedCount}`);

        const match20 = await coll.findOne({ sport: 'badminton', matchId: 'Match 20' });
        console.log("\nUpdated Match 20 Details:");
        console.log(JSON.stringify(match20, null, 2));

    } catch (err) {
        console.error("Error updating scheduledTime:", err);
    } finally {
        await client.close();
    }
}

run();
