const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

const sf1Squads = {
    cricket_t1_playing11: [
        "Rahul Sonti (c & wk)",
        "Ajith Kavali",
        "Babu K",
        "Charan",
        "Kumar",
        "Manoj",
        "Naveen",
        "Ravi Kumar",
        "Revanth",
        "Sai Kumar",
        "Santosh Sugur"
    ],
    cricket_t2_playing11: [
        "Sagar (c)",
        "GM Mani (wk)",
        "Mangesh Tanpure",
        "Maruthi",
        "Mohd Sarfaraz Ali",
        "Prasanth",
        "praveen Koduri",
        "Praveenkumar Reddy",
        "Rayudu Sai Dharma Teja",
        "Vinay Singuru",
        "Srikanth Nagayapally"
    ]
};

const sf2Squads = {
    cricket_t1_playing11: [
        "P Rohith (c & wk)",
        "Chandu",
        "E Pavan Kalyan",
        "Jaidev",
        "Kommineni Karthik",
        "Mahesh Katta",
        "Prasad Kulkarni",
        "Sree Ram",
        "Chandra Sekhar",
        "Koushik Nela",
        "Veerapratap"
    ],
    cricket_t2_playing11: [
        "Selvamani R (c)",
        "Bhavesh",
        "Deepak",
        "Govind Madhav Cyient (wk)",
        "Jayanth Reddy",
        "saurabh mowade",
        "Shiva Krishna",
        "Shivaraj",
        "V K Chary",
        "Amir Shamim",
        "Hruday Dirisala"
    ]
};

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');

        // 1. Update Semi-Final 1 squads
        const result1 = await coll.updateOne(
            { sport: 'cricket', matchId: 'Semi-Final 1' },
            { $set: sf1Squads }
        );
        console.log(`Updated Semi-Final 1: matched = ${result1.matchedCount}, modified = ${result1.modifiedCount}`);

        // 2. Update Semi-Final 2 squads
        const result2 = await coll.updateOne(
            { sport: 'cricket', matchId: 'Semi-Final 2' },
            { $set: sf2Squads }
        );
        console.log(`Updated Semi-Final 2: matched = ${result2.matchedCount}, modified = ${result2.modifiedCount}`);

        // Verification
        const m1 = await coll.findOne({ sport: 'cricket', matchId: 'Semi-Final 1' });
        const m2 = await coll.findOne({ sport: 'cricket', matchId: 'Semi-Final 2' });
        console.log("\nSemi-Final 1 squads:", m1.cricket_t1_playing11, m1.cricket_t2_playing11);
        console.log("Semi-Final 2 squads:", m2.cricket_t1_playing11, m2.cricket_t2_playing11);

    } catch (err) {
        console.error("Error updating squads:", err);
    } finally {
        await client.close();
    }
}

run();
