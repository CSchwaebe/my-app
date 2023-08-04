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
    const results = await collection.findOne({ "app_data.code": parseInt(code) });
    return results;
}

export async function getTeamByAddress(db, wallet_address) {
    const team_collection = db.collection('teams');
    const gw = await getActiveGameweek(db)

    // Get the team from the database
    let team = await team_collection.findOne(
        { address: wallet_address, gameweek: gw },
    )

    // If the team doesn't exist, return an empty team
    if (team == null) {
        const temp_field_player = {
            description: "",
            external_url: "",
            image: "",
            name: "",
            attributes: [],
            app_data: {
                first_name: null,
                last_name: null,
                display_name: "Empty",
                code: 0,
                event_points: null,
                team: null,
                team_code: null,
                team_name: null,
                team_abbreviation: null,
                now_cost: null,
                position: null,
                image_url: null,
                shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp"
            }
        }
    
        const empty_team = Array(15).fill(temp_field_player);
        const team_obj = {
            address: wallet_address,
            team_name: wallet_address,
            score: 0,
            gameweek: gw,
            players: empty_team

        }
        console.log("Empty team")
        return team_obj;
    } else {
        console.log("Found team")
        //console.log(team.team)
        return team;
    }
}


export async function getPlayersByCodes(db, codes) {
    const collection = db.collection('players');
    const all_players = await collection.find({}).toArray();
    // We get all players from the database
    // We create a map so that our lookup for each player the user owns
    // is O(1)
    const player_map = all_players.reduce(function (map, obj) {
        map[obj.app_data.code] = obj;
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
    const gw = await getActiveGameweek(db);
    console.log("Updating team")
    console.log(team)
    
    const result = await collection.updateOne(
        { address: team.address, gameweek: gw },
        {
            $set: team,
        },
        { upsert: true }
    );

    return result;

}