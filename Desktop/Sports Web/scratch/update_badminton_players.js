const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Update team1 where it is 'Ajith / Ramya'
        const res1 = await coll.updateMany(
            { sport: 'badminton', team1: 'Ajith / Ramya' },
            { $set: { team1: 'Sai Kumar / Ramya' } }
        );

        // 2. Update team2 where it is 'Ajith / Ramya'
        const res2 = await coll.updateMany(
            { sport: 'badminton', team2: 'Ajith / Ramya' },
            { $set: { team2: 'Sai Kumar / Ramya' } }
        );

        // 3. Update winner where it is 'Ajith / Ramya'
        const res3 = await coll.updateMany(
            { sport: 'badminton', winner: 'Ajith / Ramya' },
            { $set: { winner: 'Sai Kumar / Ramya' } }
        );

        console.log(`Updated 'Ajith / Ramya' to 'Sai Kumar / Ramya':`);
        console.log(`- team1 updates: ${res1.modifiedCount}`);
        console.log(`- team2 updates: ${res2.modifiedCount}`);
        console.log(`- winner updates: ${res3.modifiedCount}`);

        // Verify matches for Match 3
        const match3 = await coll.findOne({ sport: 'badminton', matchId: 'Match 3' });
        console.log("Verification Match 3:", match3);

    } catch (err) {
        console.error("Error updating player names:", err);
    } finally {
        await client.close();
    }
}

run();
