const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Latest Winner (Match 29)...\n");

        // 1. Match 29 (Semi-Finals): Ramkumar Bhake / Niranjan Kumar wins against Aditya / HR
        console.log("1. Setting winner for Match 29 (Semi-Finals) to 'Ramkumar Bhake / Niranjan Kumar'...");
        const resM29 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 29' },
            {
                $set: {
                    status: 'completed',
                    winner: 'Ramkumar Bhake / Niranjan Kumar',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 29: ${resM29.modifiedCount}`);

        // Advance Ramkumar Bhake / Niranjan Kumar to Match 31 (Final) team1
        console.log("   Advancing Ramkumar Bhake / Niranjan Kumar to Match 31 team1...");
        const resM31 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 31' },
            { $set: { team1: 'Ramkumar Bhake / Niranjan Kumar' } }
        );
        console.log(`   - Modified Match 31 team1: ${resM31.modifiedCount}`);

        console.log("\nUpdates applied successfully. Verifying updated matches...\n");

        const targetIds = ['Match 29', 'Match 31'];
        const updated = await coll.find({ sport: 'badminton', matchId: { $in: targetIds } }).toArray();

        updated.forEach(m => {
            console.log(`[${m.matchId} - ${m.round}] ${m.team1} vs ${m.team2} | Status: ${m.status} | Winner: ${m.winner || 'TBD'}`);
        });

    } catch (err) {
        console.error("Database update error:", err);
    } finally {
        await client.close();
    }
}

run();
