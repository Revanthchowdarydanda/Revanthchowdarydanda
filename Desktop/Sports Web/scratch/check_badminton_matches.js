const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');
        const matches = await coll.find({ sport: 'badminton' }).toArray();
        console.log(`Found ${matches.length} badminton matches in DB:`);
        console.log(JSON.stringify(matches, null, 2));
    } finally {
        await client.close();
    }
}
run();
