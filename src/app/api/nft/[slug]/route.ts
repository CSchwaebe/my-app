import { NextResponse, NextRequest } from 'next/server'
import { connectToDatabase, getPlayerByCode } from '../../db';

export async function GET(req: NextRequest) {
    try {
        const path = req.nextUrl.pathname;
        const idx = path.lastIndexOf("/");
        const code = path.substring(idx + 1);

        console.log(code)
        const db = await connectToDatabase();
        const results = await getPlayerByCode(db, code);
        
        return NextResponse.json(results);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}