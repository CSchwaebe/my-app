import { get } from "http";
import clientPromise from "../../lib/mongodb";
import { NextResponse } from 'next/server';


const cloudinary_base_url = 'https://res.cloudinary.com/bigkatoriginal/image/upload/v1689093133/';

const bootstrap_url = 'https://fantasy.premierleague.com/api/bootstrap-static/'

function cloudinaryConfig() {
    // Require the cloudinary library
    const cloudinary = require('cloudinary').v2;
    // Return "https" URLs by setting secure: true
    cloudinary.config({
        secure: true
    });
    // Log the configuration
    console.log(cloudinary.config());
    return cloudinary;
}

function getTeamName(teamNumber: any) {
    switch (teamNumber) {
        case 1:
            return "Arsenal";
        case 2:
            return "Aston Villa";
        case 3:
            return "Bournemouth";
        case 4:
            return "Brentford";
        case 5:
            return "Brighton & Hove Albion";
        case 6:
            return "Burnley";
        case 7:
            return "Chelsea";
        case 8:
            return "Crystal Palace";
        case 9:
            return "Everton";
        case 10:
            return "Fulham";
        case 11:
            return "Liverpool";
        case 12:
            return "Luton Town";
        case 13:
            return "Manchester City";
        case 14:
            return "Manchester United";
        case 15:
            return "Newcastle United";
        case 16:
            return "Nottingham Forest";
        case 17:
            return "Sheffield United";
        case 18:
            return "Tottenham Hotspur";
        case 19:
            return "West Ham United";
        case 20:
            return "Wolverhampton Wanderers";
        default:
            return "Invalid team number";
    }
}

function getTeamAbreviation(teamNumber: any) {
    switch (teamNumber) {
        case 1:
            return "ARS";
        case 2:
            return "AVL";
        case 3:
            return "BOU";
        case 4:
            return "BRE";
        case 5:
            return "BHA";
        case 6:
            return "BUR";
        case 7:
            return "CHE";
        case 8:
            return "CRY";
        case 9:
            return "EVE";
        case 10:
            return "FUL";
        case 11:
            return "LIV";
        case 12:
            return "LUT";
        case 13:
            return "MCI";
        case 14:
            return "MUN";
        case 15:
            return "NEW";
        case 16:
            return "NFO";
        case 17:
            return "SHU";
        case 18:
            return "TOT";
        case 19:
            return "WHU";
        case 20:
            return "WOL";
        default:
            return "Invalid team number";
    }
}

function getPosition(position: any) {
    switch (position) {
        case 1:
            position = "GK";
            break;
        case 2:
            position = "DEF";
            break;
        case 3:
            position = "MID";
            break;
        case 4:
            position = "FWD";
            break;
        default:
            position = "N/A";
    }
    return position;
}

function getShirtURL(teamCode: any, position: any) {
    let url = '';
    switch (position) {
        case 1:
            //position = "GK";
            return "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_" + teamCode + "_1-66.webp";
            break;
        default:
            return "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_" + teamCode + "-66.webp"
    }
}

function getPublicID(imagePath: any) {
    const slash_idx = imagePath.lastIndexOf("/");
    const period_idx = imagePath.lastIndexOf(".");

    let public_id = "";
    if (period_idx == -1) {
        console.log("NO PERIOD!!!!!!")
        public_id = imagePath.substring(slash_idx + 1);
    } else {
        public_id = imagePath.substring(slash_idx + 1, period_idx);
    }
    return public_id;
}

async function getBootstrapData() {
    const response = await fetch(bootstrap_url);
    const data = await response.json();
    return data;
}

function formatData(data: any) {
    //Players data
    const players = data['elements'];
    //console.log(players);
    //We take the player data and just pull out the 
    //fields we want and put it in a new list
    const minimized_player_list = []

    for (let i = 0; i < players.length; i++) {

        minimized_player_list[i] = {
            first_name: players[i]["first_name"],
            last_name: players[i]["second_name"],
            display_name: players[i]["web_name"],
            code: players[i]["code"],
            event_points: players[i]["event_points"],
            team: players[i]["team"],
            team_code: players[i]["team_code"],
            team_name: getTeamName(players[i]["team"]),
            team_abbreviation: getTeamAbreviation(players[i]["team"]),
            now_cost: players[i]["now_cost"],
            position: getPosition(players[i]["element_type"]),
            image_url: 'https://resources.premierleague.com/premierleague/photos/players/250x250/p' + players[i]["code"].toString() + '.png',
            shirt_url: getShirtURL(players[i]["team_code"], players[i]["element_type"]),
        }
    }

    return minimized_player_list;
}

/*
async function initializeDB(data: any) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');
    collection.insertMany(data);
    console.log(collection);
}
*/

async function updateDB(data: any) {
    console.log("Updating DB");
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');

    data.forEach(async (player: any) => {
        const result = await collection.updateOne(
            { code: player.code },
            { $set: player },
        );
    });

    const updated = await collection.find({}).toArray();
    return updated;
}

async function uploadPlayerImage(cloudinary: any, imagePath: string) {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        public_id: getPublicID(imagePath),
        unique_filename: false,
        overwrite: true,
        format: "webp",
        width: 500, 
        height: 500, 
        crop: "scale",
        invalidate: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        //console.log(result.public_id);
        return options.public_id;
    } catch (error) {
        
        console.log("\nError uploading image");
        //console.log(imagePath)
        //console.error(error);
        
        
        const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png", options);

        console.log(options.public_id)

        return options.public_id;
    }
}


async function uploadShirtImage(cloudinary: any, imagePath: string) {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        public_id: getPublicID(imagePath),
        unique_filename: false,
        overwrite: true,
        format: "webp",
        /*
        width: 66, 
        height: 87, 
        crop: "scale",
        */
        invalidate: true
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        //console.log(result.public_id);
        return options.public_id;
    } catch (error) {
        
        console.log("\nError uploading Shirt..retrying");
        //console.log(imagePath)
        //console.error(error)
        return null
    }
}

async function updatePlayerImages(data: any) {
    const cloudinary = cloudinaryConfig();

    data.forEach(async (player: any) => {
        uploadPlayerImage(cloudinary, player.image_url);
        const public_id = getPublicID(player.image_url);
        player.image_url = cloudinary_base_url + public_id;
    });

    return data;
}

async function updateShirtImages(data: any) {
    const cloudinary = cloudinaryConfig();
    let already_uploaded: any[] = [];

    data.forEach(async (player: any) => {
        let public_id = getPublicID(player.shirt_url);
        if (already_uploaded.includes(player.shirt_url)) {
            player.shirt_url = cloudinary_base_url + public_id;
        } else {
            already_uploaded.push(player.shirt_url);
            let flag = null;
            while (flag == null) {
                flag = await uploadShirtImage(cloudinary, player.shirt_url);
            }
            //uploadShirtImage(cloudinary, player.shirt_url);
            player.shirt_url = cloudinary_base_url + public_id;
        }
    });

    return data;
}

export async function GET(req: Request, res: Response) {
    try {
        const mongoClient = await clientPromise;
        let data = await getBootstrapData();
        data = formatData(data);
        data = await updatePlayerImages(data);
        data = await updateShirtImages(data);
        data = await updateDB(data);

        return NextResponse.json(data);
    } catch (e) {
        console.log("GET ERROR")
        console.log(e);
        return NextResponse.json(e);
    }
}
