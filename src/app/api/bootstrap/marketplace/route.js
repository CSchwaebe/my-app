import clientPromise from "../../../lib/mongodb";
import { NextResponse } from 'next/server'

export async function GET(req) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('players');

        const results = await collection.find({}).toArray();

        return NextResponse.json(results);

    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}


