import clientPromise from "../../lib/mongodb";
import { NextResponse } from 'next/server'

async function getLeaderboardGameweek() {
    console.log("Getting gameweek")
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('gameweek');
    const gw_object = await collection.findOne({});
    return gw_object.leaderboard_gw;
}

function sortTeams(all_teams) {
    const teams =  all_teams.sort((a, b) => { 
        return b.score - a.score;
    })
    return teams;
}

export async function GET(req) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('teams');
        const gw = await getLeaderboardGameweek();

        const all_teams = await collection.find({
            gameweek: gw
        }).toArray();

        console.log(all_teams)

        const results = sortTeams(all_teams);

        let ret_obj = {
            "teams": results,
            gameweek: gw
        }

        return NextResponse.json(ret_obj);

    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}


