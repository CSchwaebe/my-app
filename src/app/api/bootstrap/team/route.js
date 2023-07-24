import clientPromise from "../../../lib/mongodb";
import { NextResponse } from 'next/server'
var ObjectId = require('mongodb').ObjectId; 

export async function GET(req) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('players');

        const results = await collection.find({}).toArray();

        //return NextResponse.json(results);

        const team_collection = db.collection('teams');
        
        let team = await team_collection.findOne(
            { _id: "0x539DcBb3810D344a7F3fEc13c9F8F345d65cE047" }
        )

        if (team == null) {
            const temp_field_player = {
                display_name: "Empty",
                code: 0,
                shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp",
                now_cost: 0,
            }
            const empty_team = Array(15).fill(temp_field_player);
            const obj = {
                "players": results,
                "team": empty_team
            }
            console.log("Empty team")
            return NextResponse.json(obj);
        } else {
            const obj = {
                "players": results,
                "team": team.team
            }
            console.log("Found team")
            return NextResponse.json(obj);
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}


