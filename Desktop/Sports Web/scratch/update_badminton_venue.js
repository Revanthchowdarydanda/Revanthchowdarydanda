const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // Update all matches with sport: 'badminton'
        const result = await coll.updateMany(
            { sport: 'badminton' },
            { 
                $set: { 
                    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC"
                } 
            }
        );

        console.log(`Updated Badminton Venues: matched = ${result.matchedCount}, modified = ${result.modifiedCount}`);

        // Verify some results
        const matches = await coll.find({ sport: 'badminton' }).limit(3).toArray();
        console.log("Verification:", matches.map(m => ({ matchId: m.matchId, venue: m.venue })));

    } catch (err) {
        console.error("Error updating venues:", err);
    } finally {
        await client.close();
    }
}

run();
