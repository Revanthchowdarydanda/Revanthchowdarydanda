const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

const updates = [
    { old: "Anand Kale / Mohammad Maruf", new: "Anand Kale / Harshpreet" },
    { old: "Mohammad Jeelani / Nithesh Kumar", new: "Satyamohan / Ali" },
    { old: "Sai Krishna / Roman", new: "Sai Krishna / Bhaskar" },
    { old: "Abishek S / Chandu Sai Kumar", new: "Raghu / Chandu Sai Kumar" },
    { old: "Lokesh Moturi / Mani Kumar Jurra", new: "Ram Gopal / Mani Kumar Jurra" },
    { old: "Veera Prathap / Prasad", new: "Veera Prathap / Jaffar" },
    { old: "Santosh Sugur/Akash B", new: "Mahesh Davuluri/Akash B" }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        for (const update of updates) {
            console.log(`Updating "${update.old}" to "${update.new}"...`);

            // Update team1
            const res1 = await coll.updateMany(
                { sport: 'badminton', team1: update.old },
                { $set: { team1: update.new } }
            );

            // Update team2
            const res2 = await coll.updateMany(
                { sport: 'badminton', team2: update.old },
                { $set: { team2: update.new } }
            );

            // Update winner
            const res3 = await coll.updateMany(
                { sport: 'badminton', winner: update.old },
                { $set: { winner: update.new } }
            );

            console.log(`  - team1 modified: ${res1.modifiedCount}`);
            console.log(`  - team2 modified: ${res2.modifiedCount}`);
            console.log(`  - winner modified: ${res3.modifiedCount}`);
        }

        console.log("Updates completed successfully!");

    } catch (err) {
        console.error("Error updating badminton doubles players:", err);
    } finally {
        await client.close();
    }
}

run();
