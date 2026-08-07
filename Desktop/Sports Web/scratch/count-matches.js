const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";
async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');
    const matches = await db.collection('matches').find({}).toArray();
    const counts = {};
    matches.forEach(m => {
        const key = `${m.sport} - ${m.status}`;
        counts[key] = (counts[key] || 0) + 1;
    });
    console.log(JSON.stringify(counts, null, 2));
    await client.close();
}
run();
