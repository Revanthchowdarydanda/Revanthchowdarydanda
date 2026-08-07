const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');
    const m = await db.collection('matches').findOne({ sport: 'cricket', matchId: 'Match 6' });
    console.log(JSON.stringify(m, null, 2));
    await client.close();
}
run().catch(console.error);
