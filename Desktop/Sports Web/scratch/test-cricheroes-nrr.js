const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kanewilliamsonfanclub1903_db_user:rLRY7NHCDwMXlfdF@cluster0.etqbtcc.mongodb.net/?appName=Cluster0&tls=true";

function ovsToBalls(ovVal) {
    if (!ovVal) return 0;
    const str = String(ovVal);
    const parts = str.split('.');
    const overs = parseInt(parts[0]) || 0;
    const balls = parts[1] ? parseInt(parts[1]) : 0;
    return (overs * 6) + balls;
}

async function run() {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('sportsfest');

    // First ensure Match 6 has score2: 91/10 (9.3) and cricket_t2_wickets: 10
    await db.collection('matches').updateOne(
        { sport: 'cricket', matchId: 'Match 6' },
        { $set: { score2: "91/10 (9.3)", cricket_t2_wickets: 10 } }
    );

    const sportMatches = await db.collection('matches').find({ sport: 'cricket' }).toArray();

    const groupATeams = ['Hype Royals', 'Jet Jaguars', 'Hunting Cheethas', 'FMG Fighters'];
    const groupBTeams = ['Team DC', 'RTX Server Smashers', 'Weekend Warriors', 'Noob Players'];

    const teamStats = {};
    [...groupATeams, ...groupBTeams].forEach(team => {
        teamStats[team] = {
            name: team,
            played: 0,
            won: 0,
            lost: 0,
            noResult: 0,
            points: 0,
            runsScored: 0,
            runsConceded: 0,
            oversPlayed: 0,
            oversBowled: 0
        };
    });

    sportMatches.forEach(match => {
        if (match.status === 'completed' && (match.round === 'Group Stage' || match.round === 'Semi-Finals')) {
            const t1 = match.team1;
            const t2 = match.team2;
            if (!teamStats[t1] || !teamStats[t2]) return;

            teamStats[t1].played += 1;
            teamStats[t2].played += 1;

            const isAbandoned = match.winner === 'no result' || match.winner === 'draw';

            if (isAbandoned) {
                teamStats[t1].noResult += 1;
                teamStats[t1].points += 1;
                teamStats[t2].noResult += 1;
                teamStats[t2].points += 1;
            } else {
                const rs1 = parseFloat(match.runs_t1) || parseFloat(match.cricket_t1_runs) || 0;
                const rs2 = parseFloat(match.runs_t2) || parseFloat(match.cricket_t2_runs) || 0;

                const w1 = parseInt(match.cricket_t1_wickets) || 0;
                const w2 = parseInt(match.cricket_t2_wickets) || 0;

                const actualB1 = ovsToBalls(match.cricket_t1_overs || match.overs_t1 || (rs1 > 0 ? 10 : 0));
                const actualB2 = ovsToBalls(match.cricket_t2_overs || match.overs_t2 || (rs2 > 0 ? 10 : 0));

                // If team is ALL OUT (w >= 10), overs faced/bowled = 10.0
                // If NOT ALL OUT (w < 10), overs faced/bowled = actual overs
                const ov1 = w1 >= 10 ? 10 : (actualB1 / 6);
                const ov2 = w2 >= 10 ? 10 : (actualB2 / 6);

                teamStats[t1].runsScored += rs1;
                teamStats[t1].runsConceded += rs2;
                teamStats[t1].oversPlayed += ov1;
                teamStats[t1].oversBowled += ov2;

                teamStats[t2].runsScored += rs2;
                teamStats[t2].runsConceded += rs1;
                teamStats[t2].oversPlayed += ov2;
                teamStats[t2].oversBowled += ov1;

                const isT1Winner = (match.winner === t1 || match.winner === 't1' || match.winner === 'team1');
                const isT2Winner = (match.winner === t2 || match.winner === 't2' || match.winner === 'team2');

                if (isT1Winner) {
                    teamStats[t1].won += 1;
                    teamStats[t1].points += 2;
                    teamStats[t2].lost += 1;
                } else if (isT2Winner) {
                    teamStats[t2].won += 1;
                    teamStats[t2].points += 2;
                    teamStats[t1].lost += 1;
                }
            }
        }
    });

    const getNRR = s => {
        if (s.oversPlayed === 0 || s.oversBowled === 0) return 0;
        return (s.runsScored / s.oversPlayed) - (s.runsConceded / s.oversBowled);
    };

    console.log("\n=== GROUP A (League Matches) ===");
    console.log("Team | M | W | L | NR | Pt | NRR");
    groupATeams.forEach(t => {
        const s = teamStats[t];
        const nrr = getNRR(s);
        const nrrStr = (nrr >= 0 ? '+' : '') + nrr.toFixed(3);
        console.log(`${s.name} | ${s.played} | ${s.won} | ${s.lost} | ${s.noResult} | ${s.points} | ${nrrStr}`);
    });

    console.log("\n=== GROUP B (League Matches) ===");
    console.log("Team | M | W | L | NR | Pt | NRR");
    groupBTeams.forEach(t => {
        const s = teamStats[t];
        const nrr = getNRR(s);
        const nrrStr = (nrr >= 0 ? '+' : '') + nrr.toFixed(3);
        console.log(`${s.name} | ${s.played} | ${s.won} | ${s.lost} | ${s.noResult} | ${s.points} | ${nrrStr}`);
    });

    await client.close();
}

run().catch(console.error);
