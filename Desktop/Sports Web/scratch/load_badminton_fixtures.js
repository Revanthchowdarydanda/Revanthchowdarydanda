const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

const matches = [
  // Round 1
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 1",
    team1: "Rahul Sonti / Priyanshu Dalal",
    team2: "Bala Mahesh Balusu / Sriprada Ramancha",
    scheduledTime: "2026-07-30 14:30",
    venue: "Badminton Court",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 2",
    team1: "Suresh Cherukupalli / Kezia",
    team2: "Siva Sai Panchakarla / Merapala Jahnavi Devi",
    scheduledTime: "2026-07-30 14:30",
    venue: "Badminton Court",
    coordinator: "Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 3",
    team1: "Shalini Gupta / Satyanand Kumar Nidadavolu",
    team2: "Sai Kumar / Ramya",
    scheduledTime: "2026-07-30 14:30",
    venue: "Badminton Court",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 4",
    team1: "Manoj Vasamsetti / Ghadiyaram Soundarya Lahari",
    team2: "Divya / Tamil Arasu",
    scheduledTime: "2026-07-30 14:30",
    venue: "Badminton Court",
    coordinator: "Hr",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 5",
    team1: "Jerin Joy / G Manasa",
    team2: "Poojitha Davuluri / Pavan Kumar H",
    scheduledTime: "2026-07-30 15:00",
    venue: "Badminton Court",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 6",
    team1: "Monish / Meesala Vijaya Lakshmi",
    team2: "Sowjanya Kancheti / Mani Kumar",
    scheduledTime: "2026-07-30 15:00",
    venue: "Badminton Court",
    coordinator: "Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Round 1",
    matchId: "Match 7",
    team1: "Sagar / Soumya Marapelli",
    team2: "Potta Sai / M Sowmya",
    scheduledTime: "2026-07-30 15:00",
    venue: "Badminton Court",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  // Quarter-Finals
  {
    sport: "badminton",
    round: "Mixed Doubles - Quarter-Finals",
    matchId: "Match 8",
    team1: "Match 1 Winner",
    team2: "Match 2 Winner",
    scheduledTime: "2026-07-30 15:00",
    venue: "Badminton Court",
    coordinator: "Hr",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Quarter-Finals",
    matchId: "Match 9",
    team1: "Match 3 Winner",
    team2: "Match 4 Winner",
    scheduledTime: "2026-07-30 15:30",
    venue: "Badminton Court",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Quarter-Finals",
    matchId: "Match 10",
    team1: "Match 5 Winner",
    team2: "Match 6 Winner",
    scheduledTime: "2026-07-30 15:30",
    venue: "Badminton Court",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Quarter-Finals",
    matchId: "Match 11",
    team1: "Match 7 Winner",
    team2: "TBD",
    scheduledTime: "2026-07-30 15:30",
    venue: "Badminton Court",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  // Semi-Finals
  {
    sport: "badminton",
    round: "Mixed Doubles - Semi-Finals",
    matchId: "Match 12",
    team1: "Match 8 Winner",
    team2: "Match 9 Winner",
    scheduledTime: "2026-07-30 16:00",
    venue: "Badminton Court",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Mixed Doubles - Semi-Finals",
    matchId: "Match 13",
    team1: "Match 10 Winner",
    team2: "Match 7 Winner",
    scheduledTime: "2026-07-30 16:00",
    venue: "Badminton Court",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  // Final
  {
    sport: "badminton",
    round: "Mixed Doubles - Final",
    matchId: "Match 15",
    team1: "Match 12 Winner",
    team2: "Match 13 Winner",
    scheduledTime: "2026-07-30 16:30",
    venue: "Badminton Court",
    coordinator: "Aditya & Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('sportsfest');
        const coll = db.collection('matches');
        
        // Remove existing badminton mixed doubles matches first
        const deleteRes = await coll.deleteMany({ sport: 'badminton', round: { $regex: /^Mixed Doubles/i } });
        console.log(`Deleted ${deleteRes.deletedCount} existing badminton mixed doubles matches.`);
        
        // Insert new matches
        const insertRes = await coll.insertMany(matches);
        console.log(`Successfully inserted ${insertRes.insertedCount} badminton matches.`);
    } finally {
        await client.close();
    }
}

run();
