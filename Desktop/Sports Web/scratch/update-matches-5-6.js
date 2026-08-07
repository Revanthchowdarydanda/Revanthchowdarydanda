const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');

    const res5 = await db.collection('matches').updateOne(
        { sport: 'cricket', matchId: 'Match 5' },
        { 
            $set: {
                cricket_potm_override: "Ravi Kumar",
                cricket_best_batter_override: "Ravi Kumar",
                cricket_best_bowler_override: "RGN SAGAR 333"
            }
        }
    );
    console.log("Updated Match 5 overrides:", res5.modifiedCount);

    const res6 = await db.collection('matches').updateOne(
        { sport: 'cricket', matchId: 'Match 6' },
        { 
            $set: {
                cricket_potm_override: "Selvamani R",
                cricket_best_batter_override: "Selvamani R",
                cricket_best_bowler_override: "V K Chary"
            }
        }
    );
    console.log("Updated Match 6 overrides:", res6.modifiedCount);

    await client.close();
}

run().catch(console.error);
