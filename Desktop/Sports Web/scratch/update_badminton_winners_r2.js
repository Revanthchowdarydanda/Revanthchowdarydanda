const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Update Match 21
        console.log("Setting winner for Match 21 to Kuchanapelli Maruthi Kumar / Maddela Prashanth...");
        const updateM21 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 21', round: "Men's Doubles - Round of 16" },
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
        console.log(`  - modified: ${updateM21.modifiedCount}`);

        // Propagate Match 21 Winner to Match 27 team1
        console.log("Advancing Kuchanapelli Maruthi Kumar / Maddela Prashanth to Match 27 team1...");
        const updateM27 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 27', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team1: 'Kuchanapelli Maruthi Kumar / Maddela Prashanth' } }
        );
        console.log(`  - modified: ${updateM27.modifiedCount}`);

        // 2. Update Match 23
        console.log("Setting winner for Match 23 to Ganta Ram Prasad / Twinkle Satwik Marrapu...");
        const updateM23 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 23', round: "Men's Doubles - Round of 16" },
            {
                $set: {
                    status: 'completed',
                    winner: 'Ganta Ram Prasad / Twinkle Satwik Marrapu',
                    score1: '0 Games',
                    score2: '0 Games',
                    scoreDetail: ''
                }
            }
        );
        console.log(`  - modified: ${updateM23.modifiedCount}`);

        // Propagate Match 23 Winner to Match 28 team1
        console.log("Advancing Ganta Ram Prasad / Twinkle Satwik Marrapu to Match 28 team1...");
        const updateM28 = await coll.updateOne(
            { sport: 'badminton', matchId: 'Match 28', round: "Men's Doubles - Quarter-Finals" },
            { $set: { team1: 'Ganta Ram Prasad / Twinkle Satwik Marrapu' } }
        );
        console.log(`  - modified: ${updateM28.modifiedCount}`);

        console.log("Round 2 updates completed successfully!");

    } catch (err) {
        console.error("Error running database updates:", err);
    } finally {
        await client.close();
    }
}

run();
