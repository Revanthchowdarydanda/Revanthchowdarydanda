const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        const matches = await coll.find({ sport: 'chess' }).toArray();
        console.log("Chess Matches in DB (Detailed):");
        matches.forEach(m => {
            console.log(`- [${m.matchId || m.id}] (${m.round || ''}) Status: ${m.status || 'unknown'}`);
            console.log(`  ${m.team1} (${m.score1 || '0'}) vs ${m.team2} (${m.score2 || '0'})`);
            console.log(`  Winner: ${m.winner || 'None'}`);
        });
    } finally {
        await client.close();
    }
}
run();
