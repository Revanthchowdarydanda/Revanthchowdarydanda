const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');

    // Fix Match 6: Hunting Cheethas were NOT all out - 9 wickets, not 10
    // Monish (last batter) was NOT OUT, so only 9 wickets fell
    // Score should be 91/9 (9.3), not 91/10
    // For NRR, we now use 10.0 overs (full allotted) since they were not all out

    // Fix the playerStats: Set Monish as not out (already done), mark the last batsman out properly
    // The main thing to fix: cricket_t2_wickets, score2

    const res = await db.collection('matches').updateOne(
        { sport: 'cricket', matchId: 'Match 6' },
        {
            $set: {
                score2: "91/9 (9.3)",          // Corrected score - NOT all out
                cricket_t2_wickets: 9,           // 9 wickets, not 10
                scoreDetail: "Jet Jaguars won by 28 runs",
            }
        }
    );
    console.log("Updated Match 6:", res.modifiedCount);

    // Verify
    const m = await db.collection('matches').findOne({ sport: 'cricket', matchId: 'Match 6' });
    console.log(`score2: ${m.score2}`);
    console.log(`cricket_t2_wickets: ${m.cricket_t2_wickets}`);

    await client.close();
}
run().catch(console.error);
