import { NextResponse } from 'next/server'
import { connectToDatabase, getActiveGameweek, getTeamsByGameweek } from "../db";
export const dynamic = 'force-dynamic';

function sortTeams(all_teams) {
    const teams = all_teams.sort((a, b) => {
        return b.score - a.score;
    })
    return teams;
}

export async function GET(req) {
    console.log("Getting leaderboard")
    try {
        const db = await connectToDatabase();
        const gw = await getActiveGameweek(db);
        const all_teams = await getTeamsByGameweek(db, gw)

        const sorted = sortTeams(all_teams);

        let ret_obj = {
            "teams": sorted,
            gameweek: gw
        }

        console.log(ret_obj);
        const response = NextResponse.json(ret_obj);

        return response;
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}


