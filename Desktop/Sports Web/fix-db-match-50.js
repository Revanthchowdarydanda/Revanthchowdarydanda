const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        await coll.updateOne({ sport: 'chess', matchId: 'Match 50' }, { $set: { team1: 'Match 47 Winner' } });

        console.log("DB updated successfully!");
    } finally {
        await client.close();
    }
}
run();
