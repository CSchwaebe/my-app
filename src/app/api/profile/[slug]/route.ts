import { NextResponse, NextRequest } from 'next/server'
import { Alchemy, Network } from "alchemy-sdk";
import clientPromise from "../../../lib/mongodb";


const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ARB_GOERLI,
};

const alchemy = new Alchemy(config);

function getSlug(url: String) {
    const idx = url.lastIndexOf("/");
    const slug = url.substring(idx + 1);
    return slug;
}

async function getPlayersFromDB(codes: any[]) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');
    const all_players = await collection.find({}).toArray();
    // We get all players from the database
    // We create a map so that our lookup for each player the user owns
    // is O(1)
    const player_map = all_players.reduce(function(map: any, obj) {
        map[obj.code] = obj;
        return map;
    }, {});

    // The codes are the keys, the player data is the values
    console.log(codes)

    let ret: any[] = []
    codes.forEach((code: any) => {
        ret.push(player_map[code])
    })
    return ret;
}

async function getTeamFromDB(wallet_address: any) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const team_collection = db.collection('teams');
    let team = await team_collection.findOne(
        { address: wallet_address, gameweek: await getGameweek() },
    )
    if (team == null) {
        const temp_field_player = {
            display_name: "Empty",
            code: 0,
            shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp",
            now_cost: 0,
        }
        const empty_team = Array(15).fill(temp_field_player);
        console.log("Empty team")
        return empty_team;
    } else {
        console.log("Found team")
        console.log(team.team)
        return team.team;
    }
}

export async function GET(req: NextRequest) {
    try {
        // We extract the address from the URL
        let address = getSlug(req.nextUrl.pathname);
        console.log(address)

        // We get the nfts owned by that address
        let response = await alchemy.nft.getNftsForOwner(address, {
            contractAddresses: [process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!],
        });

        let results = response.ownedNfts;

        //If they own more than 100 nfts, we need to paginate
        while (response.pageKey) {
            console.log("Paginating")
            response = await alchemy.nft.getNftsForOwner(address, {
                contractAddresses: [process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!],
                pageKey: response.pageKey,
            });
            results = results.concat(response.ownedNfts);
            console.log(results.length)
        }

        // Now we have all the nfts in alchemy's format
        console.log("Done fetching from alchemy")
        console.log(results);

        // We get the URL from each nft and extract the player code
        let codes: any[] = [];
        results.forEach((nft: any) => {
            console.log(nft)
            let url = nft.tokenUri.raw
            let code = getSlug(url)
            codes.push(code)
        });

        // We get the player data from the database
        let players = await getPlayersFromDB(codes);

        //We need to return the team data as well
        let team = await getTeamFromDB(address);
       
        const ret_obj = {
            "players": players,
            "team": team
        }
        return NextResponse.json(ret_obj);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }
}


function hasDuplicates(team: any) {
    let codes: any[] = []
    for (let i = 0; i < team.length; i++) {
        if (team[i].code === 0) {
            continue;
        }
        if (codes.includes(team[i].code)) {
            return true;
        } else {
            codes.push(team[i].code)
        }
    }
    return false;
}

function hasEmpty(team: any) {
    for (let i = 0; i < team.length; i++) {
        if (team[i].code === 0) {
            return true;
        }
    }
    return false;
}

function exceedsTeamLimit(team: any) {
    for (let i = 0; i < team.length; i++) {
        //allow empty players
        if (team[i].code === 0) {
            continue;
        }
        let count = 1;
        for (let j = i + 1; j < team.length; j++) {
            if (team[j].team_name === team[i].team_name) {
                count++;
                console.log(j)
                console.log(team[i].team_name + " Count: " + count)

            }
            if (count > 3) {
                console.log(team[i].team_name)
                return true;
            }
        }
    }
    return false;
}

function getTotalCost(team: any) {
    let total = 0
    for (let i = 0; i < team.length; i++) {
        total += team[i].now_cost
    }
    return total
}

function isValid(team: any) {
    /*
    if (hasEmpty(team)) {
        return false
    }
    */
    if (hasDuplicates(team)) {
        return false
    }
    if (exceedsTeamLimit(team)) {
        return false
    }
    if (getTotalCost(team) > 1000) {
        return false
    }
    return true;
}

async function getGameweek() {
    console.log("Getting gameweek")
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('gameweek');
    const gw_object = await collection.findOne({});
    return gw_object!.gameweek;
}

export async function POST(req: NextRequest) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('teams');

        const team = await req.json();
        const gw = await getGameweek();
        console.log("POST")
        console.log(team)
        let result = null
        if (isValid(team)) {
            result = await collection.updateOne(
                { address: team.wallet_address, gameweek: gw },
                {
                    $set: {
                        team: team.team,
                        gameweek: gw,
                        score: 0,
                    },
                },
                { upsert: true }
            );
        }

        if (result == null) {
            return NextResponse.json("Invalid team");
        }

        // So we need to keep track of teams by gameweek too

        return NextResponse.json(result);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }
}

    
    
/*
    alchemy.nft.getNftsForOwner(address!, {
        contractAddresses: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!],
    }).then((response) => {
        console.log(response.ownedNfts);
        setNfts(response.ownedNfts);
    });

    */


