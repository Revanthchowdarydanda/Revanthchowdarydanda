const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Remove FOW (fow_t1 and fow_t2) in all matches
        const clearResult = await coll.updateMany(
            { sport: 'cricket' },
            { $set: { fow_t1: [], fow_t2: [] } }
        );
        console.log(`Cleared FOW in ${clearResult.modifiedCount} matches.`);

        // 2. Set Fall of Wickets for RTX Server Smashers in Match 12
        const rtxFow = [
            {
                runs: 6,
                batsman: "Rakesh Nani",
                overs: "0.3"
            },
            {
                runs: 7,
                batsman: "Harish",
                overs: "1.0"
            }
        ];

        const updateResult = await coll.updateOne(
            { sport: 'cricket', matchId: 'Match 12' },
            { $set: { fow_t1: rtxFow } }
        );
        console.log(`Updated RTX Server Smashers FOW in Match 12: modifiedCount = ${updateResult.modifiedCount}`);

        // Verify the results
        const updatedMatches = await coll.find({ sport: 'cricket' }).toArray();
        console.log("\nVerification:");
        for (const m of updatedMatches) {
            const hasFow1 = m.fow_t1 && m.fow_t1.length > 0;
            const hasFow2 = m.fow_t2 && m.fow_t2.length > 0;
            if (hasFow1 || hasFow2) {
                console.log(`- ${m.matchId} (${m.team1} vs ${m.team2}):`);
                if (hasFow1) console.log(`  fow_t1 (Team 1 FOW):`, JSON.stringify(m.fow_t1));
                if (hasFow2) console.log(`  fow_t2 (Team 2 FOW):`, JSON.stringify(m.fow_t2));
            }
        }

    } catch (err) {
        console.error("Error running script:", err);
    } finally {
        await client.close();
    }
}

run();
