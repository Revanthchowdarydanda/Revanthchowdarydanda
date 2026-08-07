const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        console.log("Updating Badminton Semi-Final 1 and Final Match Details...\n");

        // 1. Update Match 29 (Semi-Final 1): Winner = Ramkumar Bhake / Niranjan Kumar
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

        // 2. Update Match 31 (Final): Teams and scheduled time update to 8 Aug 3:00 PM (2026-08-08 15:00)
        console.log("\n2. Updating Match 31 (Final) teams and scheduled time to '2026-08-08 15:00'...");
        const resM31 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 31' },
            {
                $set: {
                    team1: 'Ramkumar Bhake / Niranjan Kumar',
                    team2: 'Kalyankar Venkata Raghavendra / Devi Palakonda',
                    scheduledTime: '2026-08-08 15:00'
                }
            }
        );
        console.log(`   - Modified Match 31: ${resM31.modifiedCount}`);

        console.log("\nUpdates applied successfully. Verifying updated matches...\n");

        const targetIds = ['Match 29', 'Match 30', 'Match 31'];
        const updated = await coll.find({ sport: 'badminton', matchId: { $in: targetIds } }).toArray();

        updated.forEach(m => {
            console.log(`[${m.matchId} - ${m.round}] ${m.team1} vs ${m.team2} | Scheduled: ${m.scheduledTime} | Status: ${m.status} | Winner: ${m.winner || 'TBD'}`);
        });

    } catch (err) {
        console.error("Database update error:", err);
    } finally {
        await client.close();
    }
}

run();
