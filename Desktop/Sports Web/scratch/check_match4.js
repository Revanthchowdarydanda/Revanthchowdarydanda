async function run() {
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');
    const coll = db.collection('matches');

    const m4 = await coll.findOne({ sport: 'badminton', matchId: 'Match 4', round: /Mixed/i });
    console.log("Database Match 4:", m4);

    const m9 = await coll.findOne({ sport: 'badminton', matchId: 'Match 9', round: /Mixed/i });
    console.log("Database Match 9:", m9);

    await client.close();
}
run();
