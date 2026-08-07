const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        const allMatches = await coll.find({}).toArray();
        console.log("Checking all matches in DB with winner 'Kalyankar Venkata Raghavendra / Devi Palakonda':");
        const found = allMatches.filter(m => m.winner && m.winner.includes('Kalyankar'));
        console.log(JSON.stringify(found, null, 2));

        console.log("\nChecking Match 31 in DB:");
        const m31 = allMatches.filter(m => m.matchId === 'Match 31');
        console.log(JSON.stringify(m31, null, 2));

    } finally {
        await client.close();
    }
}

run();
