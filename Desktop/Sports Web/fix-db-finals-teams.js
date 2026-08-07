const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        const result = await coll.updateOne(
            { sport: 'chess', matchId: 'Winner' },
            { 
                $set: { 
                    team1: 'Match 53 Winner',
                    team2: 'Match 54 Winner'
                } 
            }
        );

        console.log(`Successfully updated ${result.modifiedCount} document(s).`);
    } catch (e) {
        console.error("Error updating database:", e);
    } finally {
        await client.close();
    }
}
run();
