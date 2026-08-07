const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";
async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // Mark the Bye as completed with Jerin Joy as winner
        await coll.updateOne(
            { sport: 'chess', matchId: 'Bye' },
            { $set: {
                team1: 'Jerin Joy',
                team2: 'Bye',
                status: 'completed',
                score1: '1',
                score2: '0',
                winner: 'Jerin Joy',
                scoreDetail: 'Jerin Joy advances via Bye'
            }}
        );

        // Also update Match 53 team1 to Jerin Joy
        await coll.updateOne(
            { sport: 'chess', matchId: 'Match 53' },
            { $set: { team1: 'Jerin Joy' } }
        );

        console.log("Bye fixed successfully!");
    } finally {
        await client.close();
    }
}
run();
