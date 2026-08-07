const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error("CRITICAL: MONGODB_URI is not set in environment variables!");
}
const options = {};

let client;
let clientPromise;

if (uri && !clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

let indexesCreated = false;
async function getDatabase() {
    if (!clientPromise) {
        throw new Error("Database client not initialized. Check if MONGODB_URI is set.");
    }
    const con = await clientPromise;
    const db = con.db('sportsfest');
    if (!indexesCreated) {
        // Create TTL index on rate_limits collection so documents expire after 24 hours (86400 seconds)
        // This is safe to run multiple times as MongoDB ignores index creation if it already exists.
        db.collection('rate_limits').createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }).catch(err => {
            console.error("Failed to create TTL index on rate_limits:", err);
        });
        indexesCreated = true;
    }
    return db;
}

function safeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    // Hash both strings to SHA-256 to ensure they are the exact same length for timingSafeEqual
    const hashA = crypto.createHash('sha256').update(a).digest();
    const hashB = crypto.createHash('sha256').update(b).digest();
    return crypto.timingSafeEqual(hashA, hashB);
}

function sanitizeMatch(match) {
    if (!match || typeof match !== 'object') return null;

    const stringKeys = [
        'id', 'sport', 'round', 'team1', 'team2', 
        'score1', 'score2', 'scoreDetail', 'winner', 
        'status', 'scheduledTime', 'venue', 'coordinator',
        'matchId', 'cricket_innings', 'cricket_striker', 
        'cricket_non_striker', 'cricket_bowler', 'cricket_active_batting',
        'cricket_commentary', 'serving_team', 'throwball_points_target',
        'volleyball_current_set', 'badminton_current_set', 'throwball_current_set', 'streamUrl', 'cricket_toss_winner', 'cricket_toss_decision',
        'cricket_t1_overs', 'cricket_t2_overs', 'cricket_potm_override',
        'cricket_best_batter_override', 'cricket_best_bowler_override'
    ];

    const numericKeys = [
        'cricket_target', 'cricket_t1_runs', 'cricket_t1_wickets',
        'cricket_t2_runs', 'cricket_t2_wickets',
        'volleyball_sets_t1', 'volleyball_sets_t2', 
        'volleyball_points_t1', 'volleyball_points_t2',
        'badminton_sets_t1', 'badminton_sets_t2', 
        'badminton_points_t1', 'badminton_points_t2',
        'throwball_sets_t1', 'throwball_sets_t2', 
        'throwball_points_t1', 'throwball_points_t2',
        'set_1_t1', 'set_1_t2', 'set_2_t1', 'set_2_t2', 'set_3_t1', 'set_3_t2', 
        'set_4_t1', 'set_4_t2', 'set_5_t1', 'set_5_t2',
        'runs_t1', 'runs_t2', 'overs_t1', 'overs_t2'
    ];

    const arrayKeys = [
        'cricket_balls_t1', 'cricket_balls_t2', 'cricket_t1_playing11', 'cricket_t2_playing11',
        'cricket_over_bowlers_t1', 'cricket_over_bowlers_t2',
        'cricket_wagon_t1', 'cricket_wagon_t2'
    ];

    const cleanMatch = {};

    // 1. Process String Keys
    for (const key of stringKeys) {
        if (match[key] !== undefined) {
            let val = match[key];
            if (val === null || val === undefined) {
                cleanMatch[key] = '';
                continue;
            }
            // Coerce to string
            if (typeof val !== 'string') {
                val = String(val);
            }
            // HTML escape to prevent stored XSS
            val = val
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            cleanMatch[key] = val;
        }
    }

    // 2. Process Numeric Keys (coerce to numbers or strings representing numbers)
    for (const key of numericKeys) {
        if (match[key] !== undefined) {
            let val = match[key];
            if (val === null || val === undefined || val === '') {
                cleanMatch[key] = '';
                continue;
            }
            if (typeof val === 'number') {
                cleanMatch[key] = val;
            } else {
                let strVal = String(val).trim();
                // strip anything that is not digit, dot, or hyphen
                strVal = strVal.replace(/[^\d.-]/g, '');
                cleanMatch[key] = strVal;
            }
        }
    }

    // 3. Process Array Keys (like ball-by-ball logs)
    for (const key of arrayKeys) {
        if (match[key] !== undefined) {
            const val = match[key];
            if (Array.isArray(val)) {
                cleanMatch[key] = val.map(item => {
                    if (item === null || item === undefined) return '';
                    if (typeof item === 'number') return item;
                    let strItem = String(item).trim();
                    return strItem
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                });
            } else {
                cleanMatch[key] = [];
            }
        }
    }

    // 4. Process playerStats (nested structure)
    if (match.playerStats && typeof match.playerStats === 'object') {
        const cleanPlayerStats = { batting: [], bowling: [] };
        if (Array.isArray(match.playerStats.batting)) {
            cleanPlayerStats.batting = match.playerStats.batting.map(p => {
                if (!p || typeof p !== 'object') return null;
                return {
                    name: typeof p.name === 'string' ? p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '',
                    team: typeof p.team === 'string' ? p.team.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '',
                    runs: typeof p.runs === 'number' ? p.runs : (parseInt(p.runs) || 0),
                    balls: typeof p.balls === 'number' ? p.balls : (parseInt(p.balls) || 0),
                    fours: typeof p.fours === 'number' ? p.fours : (parseInt(p.fours) || 0),
                    sixes: typeof p.sixes === 'number' ? p.sixes : (parseInt(p.sixes) || 0),
                    out: p.out === true || p.out === 1 || p.out === 'true' || p.out === '1'
                };
            }).filter(p => p !== null);
        }
        if (Array.isArray(match.playerStats.bowling)) {
            cleanPlayerStats.bowling = match.playerStats.bowling.map(p => {
                if (!p || typeof p !== 'object') return null;
                return {
                    name: typeof p.name === 'string' ? p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '',
                    team: typeof p.team === 'string' ? p.team.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '',
                    wickets: typeof p.wickets === 'number' ? p.wickets : (parseInt(p.wickets) || 0),
                    runs: typeof p.runs === 'number' ? p.runs : (parseInt(p.runs) || 0),
                    overs: typeof p.overs === 'number' ? p.overs : (String(p.overs || '').replace(/[^\d.-]/g, '')),
                    nb: typeof p.nb === 'number' ? p.nb : (parseInt(p.nb) || 0),
                    wd: typeof p.wd === 'number' ? p.wd : (parseInt(p.wd) || 0),
                    maidens: typeof p.maidens === 'number' ? p.maidens : (parseInt(p.maidens) || 0)
                };
            }).filter(p => p !== null);
        }
        cleanMatch.playerStats = cleanPlayerStats;
    }

    // 5. Process cricket_extras_t1 and cricket_extras_t2
    const cleanExtras = (obj) => {
        if (!obj || typeof obj !== 'object') return { b: 0, lb: 0, w: 0, nb: 0 };
        return {
            b: typeof obj.b === 'number' ? obj.b : (parseInt(obj.b) || 0),
            lb: typeof obj.lb === 'number' ? obj.lb : (parseInt(obj.lb) || 0),
            w: typeof obj.w === 'number' ? obj.w : (parseInt(obj.w) || 0),
            nb: typeof obj.nb === 'number' ? obj.nb : (parseInt(obj.nb) || 0)
        };
    };
    if (match.cricket_extras_t1 !== undefined) {
        cleanMatch.cricket_extras_t1 = cleanExtras(match.cricket_extras_t1);
    }
    if (match.cricket_extras_t2 !== undefined) {
        cleanMatch.cricket_extras_t2 = cleanExtras(match.cricket_extras_t2);
    }

    // Validate that 'id' exists and matches the strict format to prevent NoSQL query operator injection
    if (cleanMatch.id !== undefined) {
        if (typeof cleanMatch.id !== 'string' || cleanMatch.id.trim() === '') {
            return null;
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(cleanMatch.id)) {
            return null;
        }
    }

    // Validate whitelists
    if (cleanMatch.sport !== undefined) {
        const allowedSports = ['chess', 'volleyball', 'throwball', 'badminton', 'cricket'];
        if (!allowedSports.includes(cleanMatch.sport)) {
            return null;
        }
    }

    if (cleanMatch.status !== undefined) {
        const allowedStatus = ['upcoming', 'live', 'completed'];
        if (!allowedStatus.includes(cleanMatch.status)) {
            return null;
        }
    }

    return cleanMatch;
}

module.exports = async (req, res) => {
    // Add CORS headers securely
    const origin = req.headers.origin;
    const host = req.headers.host || '';

    if (origin) {
        let isAllowed = false;
        try {
            const parsedOrigin = new URL(origin);
            const isLocal = parsedOrigin.hostname === 'localhost' || parsedOrigin.hostname === '127.0.0.1';
            const originHost = parsedOrigin.host;
            // Allow same host or local dev
            if (originHost === host || isLocal) {
                isAllowed = true;
            }
            // Allow the canonical Vercel production domain
            if (parsedOrigin.hostname.endsWith('.vercel.app')) {
                isAllowed = true;
            }
        } catch (e) {}

        if (isAllowed) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    } else {
        // No Origin header = same-origin request, always allow
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }


    try {
        const db = await getDatabase();
        const collection = db.collection('matches');

        if (req.method === 'GET') {
            // Prevent Vercel/CDN from caching match data — always serve fresh from MongoDB
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            const matches = await collection.find({}).toArray();
            return res.status(200).json(matches);
        }

        if (req.method === 'POST') {
            const { passcode, match, verifyOnly } = req.body;

            // Get client IP address for rate limiting
            const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

            // 1. Rate limiting check
            const rateLimit = await db.collection('rate_limits').findOne({ _id: ip });
            if (rateLimit && rateLimit.lockedUntil && new Date(rateLimit.lockedUntil) > new Date()) {
                const waitTimeMs = new Date(rateLimit.lockedUntil).getTime() - Date.now();
                const waitTimeMins = Math.ceil(waitTimeMs / (60 * 1000));
                return res.status(429).json({ 
                    error: `Too many failed login attempts. Locked out. Please try again in ${waitTimeMins} minute(s).` 
                });
            }

            // Simple security check for updates
            const correctPasscode = process.env.PASSCODE || 'cyient2026';
            const isPasscodeValid = safeCompare(passcode, correctPasscode);

            if (!isPasscodeValid) {
                // Increment failed attempts
                const failedAttempts = (rateLimit ? rateLimit.failedAttempts : 0) + 1;
                const update = {
                    $set: { failedAttempts },
                    $setOnInsert: { createdAt: new Date() }
                };
                if (failedAttempts >= 5) {
                    // Lock for 15 minutes
                    update.$set.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
                }
                await db.collection('rate_limits').updateOne({ _id: ip }, update, { upsert: true });

                return res.status(401).json({ 
                    error: `Unauthorized. Invalid passcode. ${failedAttempts >= 5 ? 'This IP has been locked out for 15 minutes.' : `Attempt ${failedAttempts}/5 before lockout.`}`
                });
            }

            // Successful authentication -> Clear rate limit record
            if (rateLimit) {
                await db.collection('rate_limits').deleteOne({ _id: ip });
            }

            if (verifyOnly) {
                return res.status(200).json({ success: true, message: 'Passcode verified successfully' });
            }

            const cleanMatch = sanitizeMatch(match);
            if (!cleanMatch) {
                return res.status(400).json({ error: 'Missing or invalid match details.' });
            }

            let id = cleanMatch.id;
            let result;

            if (id) {
                // If it's a mongo ObjectId string or simple string id
                let query = {};
                if (typeof id === 'string' && id.length === 24) {
                    try {
                        query = { _id: new ObjectId(id) };
                    } catch (e) {
                        query = { id: id };
                    }
                } else {
                    query = { id: id };
                }

                // Remove _id from update payload to avoid mongo modification error
                const updatePayload = { ...cleanMatch };
                delete updatePayload._id;

                result = await collection.updateOne(
                    { $or: [query, { id: id }] },
                    { $set: updatePayload },
                    { upsert: true }
                );
            } else {
                // Insert new match
                result = await collection.insertOne(cleanMatch);
            }

            // Auto-update finals for volleyball and cricket based on semifinal results
            if (cleanMatch.sport === 'volleyball' || cleanMatch.sport === 'cricket') {
                const targetSport = cleanMatch.sport;
                if (cleanMatch.matchId === 'Semi-Final 1') {
                    if (cleanMatch.winner) {
                        await collection.updateOne(
                            { sport: targetSport, matchId: 'Final' },
                            { $set: { team1: cleanMatch.winner } }
                        );
                    } else {
                        await collection.updateOne(
                            { sport: targetSport, matchId: 'Final' },
                            { $set: { team1: 'Winner Semi-Final 1' } }
                        );
                    }
                } else if (cleanMatch.matchId === 'Semi-Final 2') {
                    if (cleanMatch.winner) {
                        await collection.updateOne(
                            { sport: targetSport, matchId: 'Final' },
                            { $set: { team2: cleanMatch.winner } }
                        );
                    } else {
                        await collection.updateOne(
                            { sport: targetSport, matchId: 'Final' },
                            { $set: { team2: 'Winner Semi-Final 2' } }
                        );
                    }
                }
            }

            // Auto-update next rounds for badminton based on match winners
            if (cleanMatch.sport === 'badminton') {
                let roundPrefix = '';
                if (cleanMatch.round) {
                    const idx = cleanMatch.round.indexOf(' - ');
                    if (idx !== -1) {
                        roundPrefix = cleanMatch.round.substring(0, idx).trim();
                    } else {
                        const rLower = cleanMatch.round.toLowerCase();
                        if (rLower.includes('mixed')) roundPrefix = 'Mixed Doubles';
                        else if (rLower.includes('women')) roundPrefix = "Women's Doubles";
                        else if (rLower.includes('men')) roundPrefix = "Men's Doubles";
                    }
                }

                if (roundPrefix) {
                    let mapping = null;
                    if (roundPrefix === "Men's Doubles") {
                        const nextMatchMapMens = {
                            'Match 1': { target: 'Match 17', slot: 'team1' },
                            'Match 2': { target: 'Match 17', slot: 'team2' },
                            'Match 3': { target: 'Match 18', slot: 'team1' },
                            'Match 4': { target: 'Match 18', slot: 'team2' },
                            'Match 5': { target: 'Match 19', slot: 'team1' },
                            'Match 6': { target: 'Match 19', slot: 'team2' },
                            'Match 7': { target: 'Match 20', slot: 'team1' },
                            'Match 8': { target: 'Match 20', slot: 'team2' },
                            'Match 9': { target: 'Match 21', slot: 'team1' },
                            'Match 10': { target: 'Match 21', slot: 'team2' },
                            'Match 11': { target: 'Match 22', slot: 'team1' },
                            'Match 12': { target: 'Match 22', slot: 'team2' },
                            'Match 13': { target: 'Match 23', slot: 'team1' },
                            'Match 14': { target: 'Match 23', slot: 'team2' },
                            'Match 15': { target: 'Match 24', slot: 'team1' },
                            'Match 16': { target: 'Match 24', slot: 'team2' },
                            'Match 17': { target: 'Match 25', slot: 'team1' },
                            'Match 18': { target: 'Match 25', slot: 'team2' },
                            'Match 19': { target: 'Match 26', slot: 'team1' },
                            'Match 20': { target: 'Match 26', slot: 'team2' },
                            'Match 21': { target: 'Match 27', slot: 'team1' },
                            'Match 22': { target: 'Match 27', slot: 'team2' },
                            'Match 23': { target: 'Match 28', slot: 'team1' },
                            'Match 24': { target: 'Match 28', slot: 'team2' },
                            'Match 25': { target: 'Match 29', slot: 'team1' },
                            'Match 26': { target: 'Match 29', slot: 'team2' },
                            'Match 27': { target: 'Match 30', slot: 'team1' },
                            'Match 28': { target: 'Match 30', slot: 'team2' },
                            'Match 29': { target: 'Match 31', slot: 'team1' },
                            'Match 30': { target: 'Match 31', slot: 'team2' }
                        };
                        mapping = nextMatchMapMens[cleanMatch.matchId];
                    } else {
                        const nextMatchMap = {
                            'Match 1': { target: 'Match 8', slot: 'team1' },
                            'Match 2': { target: 'Match 8', slot: 'team2' },
                            'Match 3': { target: 'Match 9', slot: 'team1' },
                            'Match 4': { target: 'Match 9', slot: 'team2' },
                            'Match 5': { target: 'Match 10', slot: 'team1' },
                            'Match 6': { target: 'Match 10', slot: 'team2' },
                            'Match 7': { target: 'Match 13', slot: 'team2' },
                            'Match 8': { target: 'Match 12', slot: 'team1' },
                            'Match 9': { target: 'Match 12', slot: 'team2' },
                            'Match 10': { target: 'Match 13', slot: 'team1' },
                            'Match 12': { target: 'Match 15', slot: 'team1' },
                            'Match 13': { target: 'Match 15', slot: 'team2' }
                        };
                        mapping = nextMatchMap[cleanMatch.matchId];
                    }
                    if (mapping) {
                        const targetTeamName = cleanMatch.winner
                            ? cleanMatch.winner
                            : `${cleanMatch.matchId} Winner`;

                        const query = {
                            sport: 'badminton',
                            matchId: mapping.target,
                            round: { $regex: new RegExp('^' + roundPrefix, 'i') }
                        };

                        await collection.updateOne(query, { $set: { [mapping.slot]: targetTeamName } });
                    }
                }
            }

            return res.status(200).json({ success: true, result });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
};
