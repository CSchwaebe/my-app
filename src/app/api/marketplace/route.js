import { NextResponse } from 'next/server'
import { connectToDatabase, getPlayers } from "../db";
export const revalidate = 86400;

export async function GET(req) {
    console.log("MARKETPLACE")
    try {
        const db = await connectToDatabase();
        const results = await getPlayers(db);
        return NextResponse.json(results);

    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }
}


