const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

const timingUpdates = [
    { matchId: 'Match 15', scheduledTime: '2026-08-05 15:00', coordinator: 'Aditya' },
    { matchId: 'Match 18', scheduledTime: '2026-08-05 15:00', coordinator: 'Subbu' },
    { matchId: 'Match 19', scheduledTime: '2026-08-05 15:00', coordinator: 'Manoj / Rahul' },
    { matchId: 'Match 20', scheduledTime: '2026-08-05 15:30', coordinator: 'Aditya' },
    { matchId: 'Match 22', scheduledTime: '2026-08-05 15:30', coordinator: 'Subbu' },
    { matchId: 'Match 24', scheduledTime: '2026-08-05 15:30', coordinator: 'Manoj / Rahul' }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Restore the Mixed Doubles Match 15 timing
        console.log("Restoring Mixed Doubles Match 15 timing...");
        const restoreRes = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 15', round: "Mixed Doubles - Final" },
            {
                $set: {
                    scheduledTime: "2026-07-30 16:30",
                    coordinator: "Aditya & Raghu"
                }
            }
        );
        console.log(`  - Mixed Doubles restored: ${restoreRes.modifiedCount}`);

        // 2. Perform the correct updates on Men's Doubles matches
        for (const update of timingUpdates) {
            console.log(`Updating Men's Doubles ${update.matchId}: time = ${update.scheduledTime}, coordinator = ${update.coordinator}...`);
            const res = await coll.updateOne(
                { sport: 'badminton', matchId: update.matchId, round: { $regex: /^Men's Doubles/i } },
                {
                    $set: {
                        scheduledTime: update.scheduledTime,
                        coordinator: update.coordinator
                    }
                }
            );
            console.log(`  - modified: ${res.modifiedCount}`);
        }

        console.log("Database corrections completed successfully!");

    } catch (err) {
        console.error("Error updating match timings in DB:", err);
    } finally {
        await client.close();
    }
}

run();
