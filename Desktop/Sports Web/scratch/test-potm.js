const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

function checkT1BattedFirst(m) {
    if (m.cricket_toss_winner && m.cricket_toss_decision) {
        const tossWin = m.cricket_toss_winner;
        const tossDec = (m.cricket_toss_decision || '').toLowerCase();
        if (tossWin === 't1') {
            return tossDec === 'bat' || tossDec === 'batting';
        } else {
            return tossDec === 'bowl' || tossDec === 'bowling' || tossDec === 'field' || tossDec === 'fielding';
        }
    } else {
        const innings = m.cricket_innings || '1st';
        const activeBat = m.cricket_active_batting || 't1';
        if (innings === '2nd') {
            return activeBat === 't2';
        }
        return true;
    }
}

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');
    const matches = await db.collection('matches').find({ sport: 'cricket', matchId: { $in: ['Match 5', 'Match 6'] } }).toArray();

    for (const m of matches) {
        const t1BattedFirst = checkT1BattedFirst(m);
        const firstInnTeam = t1BattedFirst ? m.team1 : m.team2;
        const secondInnTeam = t1BattedFirst ? m.team2 : m.team1;
        console.log(`\n=== ${m.matchId}: ${m.team1} vs ${m.team2} ===`);
        console.log(`1st Innings: ${firstInnTeam}`);
        console.log(`2nd Innings: ${secondInnTeam}`);
    }

    await client.close();
}

run().catch(console.error);
