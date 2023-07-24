import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname;
        const idx = path.lastIndexOf("/");
        const code = path.substring(idx + 1);

        //console.log(code)

        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('players');

        const results = await collection.findOne({ code: parseInt(code) }) ;
        return NextResponse.json(results);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}