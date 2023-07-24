import { AnyARecord } from "dns";
import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from 'next/server'
const { ObjectId } = require('mongodb');

const NFTS_PER_PLAYER = 1;

async function getNextID() {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('counter');

    const doc = await collection.findOneAndUpdate(
        {},
        { $inc: { value: 1 } },
    );

    return doc.value?.value;
}

async function initial_mint_single_player(player: any) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('nfts');

    for (let i = 0; i < NFTS_PER_PLAYER; i++) {
        const id = await getNextID();
        //console.log(id)
        player["_id"] = id;
        await collection.insertOne({
            _id: id,
            uri: process.env.BASE_URL + "api/nft/" + player.code.toString(),
        })
    }
}


export async function GET(req: NextRequest) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('teams');

        const addr = await req.json();

        const result = await collection.findOne(
            { _id: addr },
        );

        console.log(result)

        // So we need to keep track of teams by gameweek too
        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}
