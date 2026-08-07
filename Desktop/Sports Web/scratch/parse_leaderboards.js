const fs = require('fs');
const path = require('path');

// CSV Paths provided by the user
const paths = {
    mvp: '/Users/revanthchowdary/Downloads/2129925_mvp_leaderboard (8).csv',
    fielding: '/Users/revanthchowdary/Downloads/2129925_fielding_leaderboard (8).csv',
    bowling: '/Users/revanthchowdary/Downloads/2129925_bowling_leaderboard (8).csv',
    batting: '/Users/revanthchowdary/Downloads/2129925_batting_leaderboard (8).csv'
};

// Unified CSV parser helper (no external dependencies required)
function parseCSV(filepath) {
    if (!fs.existsSync(filepath)) {
        throw new Error(`File not found: ${filepath}`);
    }
    const content = fs.readFileSync(filepath, 'utf8');
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentCell += '"';
                i++; // Skip escaped quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') {
                i++; // Skip CRLF line endings
            }
            currentRow.push(currentCell.trim());
            if (currentRow.length > 0 && (currentRow.length > 1 || currentRow[0] !== '')) {
                rows.push(currentRow);
            }
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    if (currentCell !== '' || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }
    return rows;
}

// Convert rows into objects based on header keys
function csvToObjects(rows) {
    if (rows.length === 0) return [];
    const headers = rows[0];
    const objects = [];
    for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        if (row.length === 0 || (row.length === 1 && row[0] === '')) continue;
        const obj = {};
        headers.forEach((header, colIndex) => {
            obj[header] = row[colIndex] || '';
        });
        objects.push(obj);
    }
    return objects;
}

function run() {
    console.log("Starting cricket leaderboards parsing...");
    const result = {
        batting: [],
        bowling: [],
        fielding: [],
        mvp: []
    };

    // ── BATTING LEADERBOARD ──
    try {
        const rawBatting = csvToObjects(parseCSV(paths.batting));
        result.batting = rawBatting.map(b => ({
            playerId: b.player_id,
            name: b.name,
            teamId: b.team_id,
            teamName: b.team_name,
            matches: parseInt(b.total_match) || 0,
            innings: parseInt(b.innings) || 0,
            runs: parseInt(b.total_runs) || 0,
            highestScore: parseInt(b.highest_run) || 0,
            average: b.average === 'NaN' || b.average === '-' || b.average === '' ? null : parseFloat(b.average),
            notOut: parseInt(b.not_out) || 0,
            strikeRate: parseFloat(b.strike_rate) || 0,
            balls: parseInt(b.ball_faced) || 0,
            battingHand: b.batting_hand,
            fours: parseInt(b['4s']) || 0,
            sixes: parseInt(b['6s']) || 0,
            fifties: parseInt(b['50s']) || 0,
            hundreds: parseInt(b['100s']) || 0
        }));
        console.log(`Parsed ${result.batting.length} batting records.`);
    } catch (e) {
        console.error("Error parsing batting leaderboard:", e.message);
    }

    // ── BOWLING LEADERBOARD ──
    try {
        const rawBowling = csvToObjects(parseCSV(paths.bowling));
        result.bowling = rawBowling.map(b => ({
            playerId: b.player_id,
            name: b.name,
            teamId: b.team_id,
            teamName: b.team_name,
            matches: parseInt(b.total_match) || 0,
            innings: parseInt(b.innings) || 0,
            wickets: parseInt(b.total_wickets) || 0,
            balls: parseInt(b.balls) || 0,
            highestWicket: parseInt(b.highest_wicket) || 0,
            economy: parseFloat(b.economy) || 0,
            strikeRate: b.SR === 'NaN' || b.SR === '-' || b.SR === '' ? null : parseFloat(b.SR),
            maidens: parseInt(b.maidens) || 0,
            average: b.avg === 'NaN' || b.avg === '-' || b.avg === '' ? null : parseFloat(b.avg),
            runs: parseInt(b.runs) || 0,
            bowlingStyle: b.bowling_style,
            overs: parseFloat(b.overs) || 0,
            dotBalls: parseInt(b.dot_balls) || 0
        }));
        console.log(`Parsed ${result.bowling.length} bowling records.`);
    } catch (e) {
        console.error("Error parsing bowling leaderboard:", e.message);
    }

    // ── FIELDING LEADERBOARD ──
    try {
        const rawFielding = csvToObjects(parseCSV(paths.fielding));
        result.fielding = rawFielding.map(f => ({
            playerId: f.player_id,
            name: f.name,
            teamId: f.team_id,
            teamName: f.team_name,
            matches: parseInt(f.total_match) || 0,
            catches: parseInt(f.catches) || 0,
            caughtBehind: parseInt(f.caught_behind) || 0,
            runOuts: parseInt(f.run_outs) || 0,
            assistRunOuts: parseInt(f.assist_run_outs) || 0,
            stumpings: parseInt(f.stumpings) || 0,
            caughtAndBowl: parseInt(f.caught_and_bowl) || 0,
            totalCatches: parseInt(f.total_catches) || 0,
            totalDismissals: parseInt(f.total_dismissal) || 0
        }));
        console.log(`Parsed ${result.fielding.length} fielding records.`);
    } catch (e) {
        console.error("Error parsing fielding leaderboard:", e.message);
    }

    // ── MVP LEADERBOARD ──
    try {
        const rawMvp = csvToObjects(parseCSV(paths.mvp));
        result.mvp = rawMvp.map(m => ({
            name: m['Player Name'],
            teamName: m['Team Name'],
            role: m['Player Role'],
            bowlingStyle: m['Bowling Style'],
            battingHand: m['Batting Hand'],
            matches: parseInt(m['Matches']) || 0,
            battingPoints: parseFloat(m['Batting']) || 0,
            bowlingPoints: parseFloat(m['Bowling']) || 0,
            fieldingPoints: parseFloat(m['Fielding']) || 0,
            totalPoints: parseFloat(m['Total']) || 0
        }));
        console.log(`Parsed ${result.mvp.length} MVP records.`);
    } catch (e) {
        console.error("Error parsing MVP leaderboard:", e.message);
    }

    // Save outputs
    const outputDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'cricket_leaderboards.json');
    if (fs.existsSync(outputPath)) {
        try {
            const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
            if (existing.partnerships) {
                result.partnerships = existing.partnerships;
            }
        } catch (e) {}
    }
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Successfully wrote combined leaderboards to: ${outputPath}`);
}

run();
