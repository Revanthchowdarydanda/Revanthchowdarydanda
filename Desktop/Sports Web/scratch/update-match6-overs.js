const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');

    const res = await db.collection('matches').updateOne(
        { sport: 'cricket', matchId: 'Match 6' },
        { 
            $set: {
                score2: "91/10 (10.0)",
                cricket_t2_overs: "10.0",
                overs_t2: 10
            }
        }
    );
    console.log("Updated Match 6 score2 to 91/10 (10.0):", res.modifiedCount);

    const m = await db.collection('matches').findOne({ sport: 'cricket', matchId: 'Match 6' });
    console.log(`Match 6 score1: ${m.score1}`);
    console.log(`Match 6 score2: ${m.score2}`);
    console.log(`cricket_t2_overs: ${m.cricket_t2_overs}`);

    await client.close();
}

run().catch(console.error);
