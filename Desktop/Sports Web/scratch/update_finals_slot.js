const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // Update the cricket final match
        const result = await coll.updateOne(
            { sport: 'cricket', matchId: 'Final' },
            { $set: { team2: "Weekend Warriors" } }
        );

        console.log(`Updated Cricket Final Match: modifiedCount = ${result.modifiedCount}`);

        // Verify the result
        const finalMatch = await coll.findOne({ sport: 'cricket', matchId: 'Final' });
        console.log("Verification:", finalMatch);

    } catch (err) {
        console.error("Error updating finals slot:", err);
    } finally {
        await client.close();
    }
}

run();
