process.env.MONGODB_URI = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";
process.env.PASSCODE = "cyient2026";

const handler = require('../api/matches.js');

// Mock request and response
function mockReqRes(method, body) {
    const req = {
        method,
        headers: { origin: 'http://localhost' },
        socket: { remoteAddress: '127.0.0.1' },
        body
    };
    const res = {
        statusVal: 200,
        headers: {},
        jsonVal: null,
        setHeader(name, value) {
            this.headers[name] = value;
        },
        status(code) {
            this.statusVal = code;
            return this;
        },
        json(val) {
            this.jsonVal = val;
            return this;
        },
        end() {
            return this;
        }
    };
    return { req, res };
}

async function run() {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('sportsfest');
    const coll = db.collection('matches');

    const m4 = await coll.findOne({ sport: 'badminton', matchId: 'Match 4', round: /Mixed/i });
    console.log("Current Match 4:", m4);

    const m9Before = await coll.findOne({ sport: 'badminton', matchId: 'Match 9', round: /Mixed/i });
    console.log("Current Match 9:", m9Before);

    // Call API handler to update Match 4 (simulating what happens when submitting)
    const updatedM4 = {
        ...m4,
        id: m4._id.toString(),
        winner: 'Manoj Vasamsetti / Ghadiyaram Soundarya Lahari'
    };

    const { req, res } = mockReqRes('POST', {
        passcode: 'cyient2026',
        match: updatedM4
    });

    console.log("Calling API handler to update Match 4...");
    await handler(req, res);
    console.log("API response status:", res.statusVal);
    console.log("API response body:", res.jsonVal);

    // Check Match 9 now
    const m9After = await coll.findOne({ sport: 'badminton', matchId: 'Match 9', round: /Mixed/i });
    console.log("Updated Match 9:", m9After);

    await client.close();
}
run();
