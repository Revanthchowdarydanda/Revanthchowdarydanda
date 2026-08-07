const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

const matches = [
  // Round 1 (Matches 1-16)
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 1",
    team1: "Aditya / HR",
    team2: "Anand Kale / Harshpreet",
    scheduledTime: "2026-08-03 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 2",
    team1: "Satyamohan / Ali",
    team2: "Suraj Kumar Sia / Mohammad Khajamoinoddin",
    scheduledTime: "2026-08-03 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 3",
    team1: "Koushik Thumula / Duddu Vivek Vardhan",
    team2: "Sai Krishna / Bhaskar",
    scheduledTime: "2026-08-03 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 4",
    team1: "Raghu / Chandu Sai Kumar",
    team2: "Ramana / Dorababu",
    scheduledTime: "2026-08-03 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 5",
    team1: "Ram Gopal / Mani Kumar Jurra",
    team2: "Manish / Charan",
    scheduledTime: "2026-08-03 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 6",
    team1: "Lade Naresh / Dwasari Deepak",
    team2: "Veera Prathap / Jaffar",
    scheduledTime: "2026-08-03 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 7",
    team1: "Kolloju Vamshi Krishna / Bhavesh Singh",
    team2: "Mahesh Davuluri/Akash B",
    scheduledTime: "2026-08-03 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 8",
    team1: "Ramkumar Bhake / Niranjan Kumar",
    team2: "Hruday Dirisala / Jayanthreddy Alla",
    scheduledTime: "2026-08-03 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 9",
    team1: "Ajith / Sai Kiran",
    team2: "Kuchanapelli Maruthi Kumar / Maddela Prashanth",
    scheduledTime: "2026-08-04 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 10",
    team1: "Siva Sarath Chandra Kapeesha Sakila / Jaidev Varma Pakalapati",
    team2: "Amir Shamim / Govind Madhav",
    scheduledTime: "2026-08-04 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 11",
    team1: "Lenkati Aravind / Sandeep Ganesh",
    team2: "Kandlakolla Kishore / Prem M",
    scheduledTime: "2026-08-04 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 12",
    team1: "Naveen Kumar Musham / Danda Revanth Chowdary",
    team2: "Pavan Kalyan Reddy Cheerala / Pranay Teja Tanguturi",
    scheduledTime: "2026-08-04 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 13",
    team1: "Ganta Ram Prasad / Twinkle Satwik Marrapu",
    team2: "Kadali Dheeraj / Katta Mahesh",
    scheduledTime: "2026-08-04 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 14",
    team1: "Ganavardhan Dangeti / Venkata Subrahmanyam Animalla",
    team2: "Prashanth Ragam / Kumar",
    scheduledTime: "2026-08-04 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 15",
    team1: "M Mohan Raju / Suneel Babu Vagolu",
    team2: "Kalyankar Venkata Raghavendra / Devi Palakonda",
    scheduledTime: "2026-08-05 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round 1",
    matchId: "Match 16",
    team1: "Ankit Thakur / Ayus Kumar Prusty",
    team2: "Pavan Varma / Gorla Reddy Hiteshkumar Reddy",
    scheduledTime: "2026-08-04 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },

  // Round 2 / Round of 16 (Matches 17-24)
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 17",
    team1: "Match 1 Winner",
    team2: "Match 2 Winner",
    scheduledTime: "2026-08-05 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 18",
    team1: "Match 3 Winner",
    team2: "Match 4 Winner",
    scheduledTime: "2026-08-05 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Subbu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 19",
    team1: "Match 5 Winner",
    team2: "Match 6 Winner",
    scheduledTime: "2026-08-05 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Manoj / Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 20",
    team1: "Match 7 Winner",
    team2: "Match 8 Winner",
    scheduledTime: "2026-08-05 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 21",
    team1: "Match 9 Winner",
    team2: "Match 10 Winner",
    scheduledTime: "2026-08-05 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 22",
    team1: "Match 11 Winner",
    team2: "Match 12 Winner",
    scheduledTime: "2026-08-05 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Subbu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 23",
    team1: "Match 13 Winner",
    team2: "Match 14 Winner",
    scheduledTime: "2026-08-05 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Round of 16",
    matchId: "Match 24",
    team1: "Match 15 Winner",
    team2: "Match 16 Winner",
    scheduledTime: "2026-08-05 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Manoj / Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },

  // Round 3 / Quarter-Finals (Matches 25-28)
  {
    sport: "badminton",
    round: "Men's Doubles - Quarter-Finals",
    matchId: "Match 25",
    team1: "Match 17 Winner",
    team2: "Match 18 Winner",
    scheduledTime: "2026-08-06 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin & Raghu",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Quarter-Finals",
    matchId: "Match 26",
    team1: "Match 19 Winner",
    team2: "Match 20 Winner",
    scheduledTime: "2026-08-06 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Rahul & Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Quarter-Finals",
    matchId: "Match 27",
    team1: "Match 21 Winner",
    team2: "Match 22 Winner",
    scheduledTime: "2026-08-06 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya & Revanth",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Quarter-Finals",
    matchId: "Match 28",
    team1: "Match 23 Winner",
    team2: "Match 24 Winner",
    scheduledTime: "2026-08-06 15:30",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin & Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },

  // Round 4 / Semi-Finals (Matches 29-30)
  {
    sport: "badminton",
    round: "Men's Doubles - Semi-Finals",
    matchId: "Match 29",
    team1: "Match 25 Winner",
    team2: "Match 26 Winner",
    scheduledTime: "2026-08-07 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin,Revanth & Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },
  {
    sport: "badminton",
    round: "Men's Doubles - Semi-Finals",
    matchId: "Match 30",
    team1: "Match 27 Winner",
    team2: "Match 28 Winner",
    scheduledTime: "2026-08-07 15:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Aditya,Revanth & Rahul",
    status: "upcoming",
    score1: "",
    score2: "",
    winner: "",
    scoreDetail: ""
  },

  // Round 5 / Final (Match 31)
  {
    sport: "badminton",
    round: "Men's Doubles - Final",
    matchId: "Match 31",
    team1: "Match 29 Winner",
    team2: "Match 30 Winner",
    scheduledTime: "2026-08-07 16:00",
    venue: "Machaxi Sikki Sumeeth Sports Centre, SSSC",
    coordinator: "Jerin, Revanth & Rahul",
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

    // Remove existing Men's Doubles matches
    const delRes = await coll.deleteMany({ sport: 'badminton', round: { $regex: /^Men's Doubles/i } });
    console.log(`Deleted ${delRes.deletedCount} old Men's Doubles matches.`);

    // Insert new Men's Doubles fixtures
    const insRes = await coll.insertMany(matches);
    console.log(`Inserted ${insRes.insertedCount} new Men's Doubles fixtures.`);

  } catch (err) {
    console.error("Error loading fixtures:", err);
  } finally {
    await client.close();
  }
}

run();
