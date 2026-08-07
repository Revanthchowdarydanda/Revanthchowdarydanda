const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Correcting Match 24 winner to Ankit Thakur / Ayus Kumar Prusty...\n");

        // 1. Update Match 24 winner to Ankit Thakur / Ayus Kumar Prusty
        const resM24 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 24', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Ankit Thakur / Ayus Kumar Prusty',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`- Modified Match 24: ${resM24.modifiedCount}`);

        // 2. Update Match 28 team2 to Ankit Thakur / Ayus Kumar Prusty
        console.log("Updating Match 28 team2 to Ankit Thakur / Ayus Kumar Prusty...");
        const resM28 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 28', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team2: 'Ankit Thakur / Ayus Kumar Prusty' } }
        );
        console.log(`- Modified Match 28: ${resM28.modifiedCount}`);

        console.log("\nCorrection applied successfully!\n");

        // Verification
        const updatedMatches = await coll.find({
            sport: 'badminton',
            matchId: { $in: ['Match 24', 'Match 28'] },
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
