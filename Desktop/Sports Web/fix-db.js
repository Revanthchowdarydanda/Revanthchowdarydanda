const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        await coll.updateOne({ sport: 'chess', matchId: 'Match 50' }, { $set: { team1: 'Match 47 Winner (Raghu/Shiva)', team2: 'Vamshi Krishna Kolloju' } });
        await coll.updateOne({ sport: 'chess', matchId: 'Match 51' }, { $set: { team1: 'Prem Kumar Singh', team2: 'Soumya Marapelli' } });
        await coll.updateOne({ sport: 'chess', matchId: 'Match 52' }, { $set: { team1: 'JAGADEESWAR VEMPATI', team2: 'Aditya sri Krishna Goriparthi' } });
        await coll.updateOne({ sport: 'chess', matchId: 'Match 53' }, { $set: { team1: 'Jerin Joy', team2: 'Match 50 Winner' } });
        await coll.updateOne({ sport: 'chess', matchId: 'Match 54' }, { $set: { team1: 'Match 51 Winner', team2: 'Match 52 Winner' } });
        await coll.updateOne({ sport: 'chess', matchId: 'Bye' }, { $set: { team1: 'Jerin Joy', team2: 'Automatic Advance' } });

        console.log("DB updated successfully!");
    } finally {
        await client.close();
    }
}
run();
