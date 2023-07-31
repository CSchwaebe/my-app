import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}
let db = null;

export async function connectToDatabase() {
  if (!db) {
    console.log("NEW CONNECTION")
    const mongoClient = new MongoClient(uri, options);
    await mongoClient.connect();
    db = mongoClient.db('fpl');
  }
  return db;
}

export async function getActiveGameweek(db) {
    console.log("Getting gameweek")
    const collection = db.collection('gameweek');
    const gw_object = await collection.findOne({});
    return gw_object.leaderboard_gw;
}

export async function getTeamsByGameweek(db, gw) {
    const collection = db.collection('teams');
    const all_teams = await collection.find({
        gameweek: gw
    }).toArray();
    return all_teams;
}

export async function getPlayers(db) {
    const collection = db.collection('players');
    const results = await collection.find({}).toArray();
    return results;
}

export async function getPlayerByCode(db, code) {
    const collection = db.collection('players');
    const results = await collection.findOne({ code: parseInt(code) });
    return results;
}

export async function getTeamByAddress(db, wallet_address) {
    const team_collection = db.collection('teams');

    // Get the team from the database
    let team = await team_collection.findOne(
        { address: wallet_address, gameweek: await getActiveGameweek(db) },
    )

    // If the team doesn't exist, return an empty team
    if (team == null) {
        const temp_field_player = {
            display_name: "Empty",
            code: 0,
            shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp",
            now_cost: 0,
        }
        const empty_team = Array(15).fill(temp_field_player);
        console.log("Empty team")
        return empty_team;
    } else {
        console.log("Found team")
        //console.log(team.team)
        return team.team;
    }
}


export async function getPlayersByCodes(db, codes) {
    const collection = db.collection('players');
    const all_players = await collection.find({}).toArray();
    // We get all players from the database
    // We create a map so that our lookup for each player the user owns
    // is O(1)
    const player_map = all_players.reduce(function (map, obj) {
        map[obj.code] = obj;
        return map;
    }, {});

    // The codes are the keys, the player data is the values
    // console.log(codes)

    let ret = []
    codes.forEach((code) => {
        ret.push(player_map[code])
    })
    return ret;
}


export async function updateTeam(db, team) {
    const collection = db.collection('teams');
    const gw = await getActiveGameweek();

    result = await collection.updateOne(
        { address: team.wallet_address, gameweek: gw },
        {
            $set: {
                team: team.team,
                gameweek: gw,
                score: 0,
            },
        },
        { upsert: true }
    );

}