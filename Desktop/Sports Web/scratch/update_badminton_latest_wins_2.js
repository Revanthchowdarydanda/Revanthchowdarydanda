const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Latest Winners (Part 2)...\n");

        // 1. Match 26 (Quarter-Finals): Ramkumar Bhake / Niranjan Kumar wins against Ram Gopal / Mani Kumar Jurra
        console.log("1. Setting winner for Match 26 (Quarter-Finals) to 'Ramkumar Bhake / Niranjan Kumar'...");
        const resM26 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 26' },
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
        console.log(`   - Modified Match 26: ${resM26.modifiedCount}`);

        // Advance Ramkumar Bhake / Niranjan Kumar to Match 29 (Semi-Finals) team2
        console.log("   Advancing Ramkumar Bhake / Niranjan Kumar to Match 29 team2...");
        const resM29 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 29' },
            { $set: { team2: 'Ramkumar Bhake / Niranjan Kumar' } }
        );
        console.log(`   - Modified Match 29 team2: ${resM29.modifiedCount}`);

        // 2. Match 30 (Semi-Finals): Kalyankar Venkata Raghavendra / Devi Palakonda wins against Kuchanapelli Maruthi Kumar / Maddela Prashanth
        console.log("\n2. Setting winner for Match 30 (Semi-Finals) to 'Kalyankar Venkata Raghavendra / Devi Palakonda'...");
        const resM30 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 30' },
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
        console.log(`   - Modified Match 30: ${resM30.modifiedCount}`);

        // Advance Kalyankar Venkata Raghavendra / Devi Palakonda to Match 31 (Final) team2
        console.log("   Advancing Kalyankar Venkata Raghavendra / Devi Palakonda to Match 31 team2...");
        const resM31 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 31' },
            { $set: { team2: 'Kalyankar Venkata Raghavendra / Devi Palakonda' } }
        );
        console.log(`   - Modified Match 31 team2: ${resM31.modifiedCount}`);

        console.log("\nUpdates applied successfully. Verifying updated matches...\n");

        const targetIds = ['Match 26', 'Match 29', 'Match 30', 'Match 31'];
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
