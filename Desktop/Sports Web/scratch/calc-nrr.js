// NRR Calculation for all completed Group Stage matches
// Rules:
//   - If a team is ALL OUT: use actual overs as denominator
//   - If a team is NOT all out: use full allotted overs (10) as denominator
//   NRR = (total runs scored / total overs faced) - (total runs conceded / total overs bowled)

// Match data:
// Match 1: Noob Players 94/10 (10.0) vs RTX Server Smashers 96/3 (8.2) => RTX wins
// Match 2: Team DC 72/6 (8.0) vs Weekend Warriors 94/5 (10.0) => abandoned (no result)
// Match 3: FMG Fighters 78/6 (10.0) vs Hunting Cheethas 80/3 (7.2) => Hunting Cheethas win
// Match 4: Noob Players 93/5 (10.0) vs Team DC 94/2 (8.2) => Team DC wins
// Match 5: FMG Fighters 67/7 (10.0) vs Hype Royals 72/2 (4.5) => Hype Royals wins
// Match 6: Jet Jaguars 119/6 (10.0) vs Hunting Cheethas 91/9 (9.3) => Jet Jaguars wins
//           Hunting Cheethas had 10 out but user says NOT all out.
//           Looking at data: 10 out, 1 not out. Actually user is saying they weren't all out,
//           so last batter (Monish) is not out. So 9 wickets fell.
//           Score should be 91/9 (9.3). Use 10.0 overs for NRR denominator.

function ovsToBalls(ovVal) {
    if (!ovVal) return 0;
    const str = String(ovVal);
    const parts = str.split('.');
    const overs = parseInt(parts[0]) || 0;
    const balls = parts[1] ? parseInt(parts[1]) : 0;
    return (overs * 6) + balls;
}

// For NRR, we use full overs if not all out
function nrrOvers(actualOvsStr, wickets, allottedOvers = 10) {
    const balls = ovsToBalls(actualOvsStr);
    const actualOv = balls / 6;
    // If all out (wickets >= 10 for a standard 11-player team, max 10 wickets), use actual overs
    // If not all out, use full allotted overs
    return wickets >= 10 ? actualOv : allottedOvers;
}

const matches = [
    // Match 1: Noob Players (t1) vs RTX Server Smashers (t2), RTX wins (t2 not all out: 3 wkts)
    { t1: 'Noob Players', t2: 'RTX Server Smashers', rs1: 94, w1: 10, ov1: '10.0', rs2: 96, w2: 3, ov2: '8.2', winner: 'RTX Server Smashers' },
    // Match 2: Team DC vs Weekend Warriors, abandoned (no result)
    // Skip for NRR
    // Match 3: FMG Fighters (t1) vs Hunting Cheethas (t2), Hunting Cheethas wins (t2 not all out: 3 wkts)
    { t1: 'FMG Fighters', t2: 'Hunting Cheethas', rs1: 78, w1: 6, ov1: '10.0', rs2: 80, w2: 3, ov2: '7.2', winner: 'Hunting Cheethas' },
    // Match 4: Noob Players (t1) vs Team DC (t2), Team DC wins (t2 not all out: 2 wkts)
    { t1: 'Noob Players', t2: 'Team DC', rs1: 93, w1: 5, ov1: '10.0', rs2: 94, w2: 2, ov2: '8.2', winner: 'Team DC' },
    // Match 5: FMG Fighters (t1) vs Hype Royals (t2), Hype Royals wins (t2 not all out: 2 wkts)
    { t1: 'FMG Fighters', t2: 'Hype Royals', rs1: 67, w1: 7, ov1: '10.0', rs2: 72, w2: 2, ov2: '4.5', winner: 'Hype Royals' },
    // Match 6: Jet Jaguars (t1) vs Hunting Cheethas (t2), Jet Jaguars wins
    // User says Hunting Cheethas were NOT all out → 9 wickets (last batter Monish not out)
    // Use 10.0 overs for NRR denominator for Hunting Cheethas
    { t1: 'Jet Jaguars', t2: 'Hunting Cheethas', rs1: 119, w1: 6, ov1: '10.0', rs2: 91, w2: 9, ov2: '9.3', winner: 'Jet Jaguars' },
];

const teams = {
    'Hype Royals': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'Jet Jaguars': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'Hunting Cheethas': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'FMG Fighters': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'Noob Players': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'RTX Server Smashers': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
    'Team DC': { runsScored: 0, runsConceded: 0, oversPlayed: 0, oversBowled: 0 },
};

for (const m of matches) {
    const ov1 = nrrOvers(m.ov1, m.w1);
    const ov2 = nrrOvers(m.ov2, m.w2);
    
    console.log(`\n${m.t1} vs ${m.t2}:`);
    console.log(`  ${m.t1}: ${m.rs1}/${m.w1} in ${m.ov1} → NRR overs: ${ov1}`);
    console.log(`  ${m.t2}: ${m.rs2}/${m.w2} in ${m.ov2} → NRR overs: ${ov2}`);

    teams[m.t1].runsScored += m.rs1;
    teams[m.t1].runsConceded += m.rs2;
    teams[m.t1].oversPlayed += ov1;
    teams[m.t1].oversBowled += ov2;

    teams[m.t2].runsScored += m.rs2;
    teams[m.t2].runsConceded += m.rs1;
    teams[m.t2].oversPlayed += ov2;
    teams[m.t2].oversBowled += ov1;
}

console.log('\n=== NRR Results ===');
for (const [name, s] of Object.entries(teams)) {
    if (s.oversPlayed === 0) continue;
    const nrr = (s.runsScored / s.oversPlayed) - (s.runsConceded / s.oversBowled);
    console.log(`${name}: ${nrr.toFixed(3)} (Scored: ${s.runsScored}/${s.oversPlayed.toFixed(3)}ov, Conceded: ${s.runsConceded}/${s.oversBowled.toFixed(3)}ov)`);
}
