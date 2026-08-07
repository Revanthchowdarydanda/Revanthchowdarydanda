const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // Update Match 11 for Mixed Doubles
        const result = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 11', round: 'Mixed Doubles - Quarter-Finals' },
            { 
                $set: { 
                    team2: "Bye", 
                    status: "completed",
                    score1: "Bye",
                    score2: "",
                    winner: "Match 7 Winner",
                    scoreDetail: "Advanced on Bye"
                } 
            }
        );

        console.log(`Updated Badminton Match 11: matched = ${result.matchedCount}, modified = ${result.modifiedCount}`);

        // Verify result
        const match11 = await coll.findOne({ sport: 'badminton', matchId: 'Match 11', round: 'Mixed Doubles - Quarter-Finals' });
        console.log("Verification:", match11);

    } catch (err) {
        console.error("Error updating Match 11:", err);
    } finally {
        await client.close();
    }
}

run();
