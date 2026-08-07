const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Match 25 (Quarter-Finals) winner...\n");

        // 1. Update Match 25
        const resM25 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 25', round: "Men's Doubles - Quarter-Finals" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Aditya / HR',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`- Modified Match 25: ${resM25.modifiedCount}`);

        // 2. Advance to Match 29 (Semi-Finals team1)
        console.log("Advancing Aditya / HR to Match 29 team1...");
        const resM29 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 29', round: "Men's Doubles - Semi-Finals" },
            { $set: { team1: 'Aditya / HR' } }
        );
        console.log(`- Modified Match 29: ${resM29.modifiedCount}`);

        console.log("\nUpdates completed successfully!\n");

        // Verification
        const updatedMatches = await coll.find({
            sport: 'badminton',
            matchId: { $in: ['Match 25', 'Match 29'] },
            round: { $regex: /^Men's Doubles/i }
        }).toArray();

        console.log("Verification:");
        updatedMatches.forEach(m => {
            console.log(`[${m.matchId} - ${m.round}] ${m.team1} vs ${m.team2} | Status: ${m.status} | Winner: ${m.winner || 'TBD'}`);
        });

    } catch (err) {
        console.error("Error updating database:", err);
    } finally {
        await client.close();
    }
}

run();
