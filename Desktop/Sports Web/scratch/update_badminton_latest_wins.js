const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Latest Winners...\n");

        // 1. Match 20 (Round of 16): Ramkumar Bhake / Niranjan Kumar wins
        console.log("1. Setting winner for Match 20 (Round of 16) to 'Ramkumar Bhake / Niranjan Kumar'...");
        const resM20 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 20' },
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
        console.log(`   - Modified Match 20: ${resM20.modifiedCount}`);

        // Advance to Match 26 team2
        console.log("   Advancing Ramkumar Bhake / Niranjan Kumar to Match 26 team2...");
        const resM26 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 26' },
            { $set: { team2: 'Ramkumar Bhake / Niranjan Kumar' } }
        );
        console.log(`   - Modified Match 26: ${resM26.modifiedCount}`);

        // 2. Match 27 (Quarter-Finals): Kuchanapelli Maruthi Kumar / Maddela Prashanth wins
        console.log("\n2. Setting winner for Match 27 (Quarter-Finals) to 'Kuchanapelli Maruthi Kumar / Maddela Prashanth'...");
        const resM27 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 27' },
            {
                $set: {
                    status: 'completed',
                    winner: 'Kuchanapelli Maruthi Kumar / Maddela Prashanth',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`   - Modified Match 27: ${resM27.modifiedCount}`);

        // Advance to Match 30 team1
        console.log("   Advancing Kuchanapelli Maruthi Kumar / Maddela Prashanth to Match 30 team1...");
        const resM30_t1 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 30' },
            { $set: { team1: 'Kuchanapelli Maruthi Kumar / Maddela Prashanth' } }
        );
        console.log(`   - Modified Match 30 team1: ${resM30_t1.modifiedCount}`);

        // 3. Match 28 (Quarter-Finals): Kalyankar Venkata Raghavendra / Devi Palakonda wins
        console.log("\n3. Setting winner for Match 28 (Quarter-Finals) to 'Kalyankar Venkata Raghavendra / Devi Palakonda'...");
        const resM28 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 28' },
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
        console.log(`   - Modified Match 28: ${resM28.modifiedCount}`);

        // Advance to Match 30 team2
        console.log("   Advancing Kalyankar Venkata Raghavendra / Devi Palakonda to Match 30 team2...");
        const resM30_t2 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 30' },
            { $set: { team2: 'Kalyankar Venkata Raghavendra / Devi Palakonda' } }
        );
        console.log(`   - Modified Match 30 team2: ${resM30_t2.modifiedCount}`);

        console.log("\nUpdates applied successfully. Verifying updated matches...\n");

        const targetIds = ['Match 20', 'Match 26', 'Match 27', 'Match 28', 'Match 30'];
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
