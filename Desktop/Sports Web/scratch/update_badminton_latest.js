const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Starting Badminton updates...\n");

        // 1. Update Match 15 (Round 1 Winner: Kalyankar Venkata Raghavendra / Devi Palakonda)
        console.log("1. Setting winner for Match 15 (Round 1) to Kalyankar Venkata Raghavendra / Devi Palakonda...");
        const resM15 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 15', round: "Men's Doubles - Round 1" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Kalyankar Venkata Raghavendra / Devi Palakonda',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 15: ${resM15.modifiedCount}`);

        // Advance Match 15 winner to Match 24 team1
        console.log("   Advancing Kalyankar Venkata Raghavendra / Devi Palakonda to Match 24 team1...");
        const resM24 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 24', round: "Men's Doubles - Round of 16" },
            { $set: { team1: 'Kalyankar Venkata Raghavendra / Devi Palakonda' } }
        );
        console.log(`   - Modified Match 24: ${resM24.modifiedCount}`);

        // 2. Update Match 18 (Round of 16 Winner: Raghu / Chandu Sai Kumar)
        console.log("\n2. Setting winner for Match 18 (Round of 16) to Raghu / Chandu Sai Kumar...");
        const resM18 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 18', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Raghu / Chandu Sai Kumar',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 18: ${resM18.modifiedCount}`);

        // Advance Match 18 winner to Match 25 team2
        console.log("   Advancing Raghu / Chandu Sai Kumar to Match 25 team2...");
        const resM25 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 25', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team2: 'Raghu / Chandu Sai Kumar' } }
        );
        console.log(`   - Modified Match 25: ${resM25.modifiedCount}`);

        // 3. Update Match 19 (Round of 16 Winner: Ram Gopal / Mani Kumar Jurra)
        console.log("\n3. Setting winner for Match 19 (Round of 16) to Ram Gopal / Mani Kumar Jurra...");
        const resM19 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 19', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Ram Gopal / Mani Kumar Jurra',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 19: ${resM19.modifiedCount}`);

        // Advance Match 19 winner to Match 26 team1
        console.log("   Advancing Ram Gopal / Mani Kumar Jurra to Match 26 team1...");
        const resM26 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 26', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team1: 'Ram Gopal / Mani Kumar Jurra' } }
        );
        console.log(`   - Modified Match 26: ${resM26.modifiedCount}`);

        // 4. Update Match 22 (Round of 16 Winner: Lenkati Aravind / Sandeep Ganesh)
        console.log("\n4. Setting winner for Match 22 (Round of 16) to Lenkati Aravind / Sandeep Ganesh...");
        const resM22 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 22', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Lenkati Aravind / Sandeep Ganesh',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 22: ${resM22.modifiedCount}`);

        // Advance Match 22 winner to Match 27 team2
        console.log("   Advancing Lenkati Aravind / Sandeep Ganesh to Match 27 team2...");
        const resM27 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 27', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team2: 'Lenkati Aravind / Sandeep Ganesh' } }
        );
        console.log(`   - Modified Match 27: ${resM27.modifiedCount}`);

        console.log("\nAll updates applied successfully!\n");

        // Fetch updated matches for verification
        const matchIds = ['Match 15', 'Match 18', 'Match 19', 'Match 22', 'Match 24', 'Match 25', 'Match 26', 'Match 27'];
        const updatedMatches = await coll.find({ sport: 'badminton', matchId: { $in: matchIds } }).toArray();

        console.log("Verification of Updated Matches:");
        updatedMatches.forEach(m => {
            console.log(`[${m.matchId} - ${m.round}] ${m.team1} vs ${m.team2} | Status: ${m.status} | Winner: ${m.winner || 'TBD'}`);
        });

    } catch (err) {
        console.error("Error executing database updates:", err);
    } finally {
        await client.close();
    }
}

run();
