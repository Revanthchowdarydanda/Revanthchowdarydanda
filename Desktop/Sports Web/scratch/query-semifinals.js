const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');
    const matches = await db.collection('matches').find({ 
        sport: 'volleyball', 
        matchId: { $in: ['Semi-Final 1', 'Semi-Final 2'] } 
    }).toArray();
    console.log(JSON.stringify(matches, null, 2));
    await client.close();
}
run();
