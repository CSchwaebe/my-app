import { NextResponse, NextRequest } from 'next/server'
import { Alchemy, Network } from "alchemy-sdk";
import { connectToDatabase, getTeamByAddress, getPlayersByCodes, getActiveGameweek, updateTeam } from "../../db";
import { Team, Player } from "../../../lib/interfaces";

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(config);

async function getNFTsFromAlchemy(address: any) {
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
    //console.log(results);
    return results;
}

function getSlug(url: String) {
    const idx = url.lastIndexOf("/");
    const slug = url.substring(idx + 1);
    return slug;
}

function extractCodesFromAlchemy(nfts: any[]) {
    let codes: any[] = [];
    nfts.forEach((nft: any) => {
            //console.log(nft)
            let url = nft.tokenUri.raw
            let code = getSlug(url)
            codes.push(code)
    });
    return codes;
}




export async function GET(req: NextRequest) {
    try {
        // We extract the address from the URL
        let address = getSlug(req.nextUrl.pathname);
        console.log(address)

        // We get the nfts owned by that address
        let nfts_alchemy_format = await getNFTsFromAlchemy(address)

        // We get the URL from each nft and extract the player code
        let codes = extractCodesFromAlchemy(nfts_alchemy_format)

        //Connect to the database
        const db = await connectToDatabase();

        // We get the player data from the database
        let players = await getPlayersByCodes(db, codes);

        //We need to return the team data as well
        let team = await getTeamByAddress(db, address);
       
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


function hasDuplicates(team: Team) {
    let codes: number[] = []
    for (let i = 0; i < team.players.length; i++) {
        //Allow empty players
        if (team.players[i].app_data.code === 0) {
            continue;
        }
        if (codes.includes(team.players[i].app_data.code)) {
            return true;
        } else {
            codes.push(team.players[i].app_data.code)
        }
    }
    return false;
}

function hasEmpty(team: Team) {
    for (let i = 0; i < team.players.length; i++) {
        if (team.players[i].app_data.code === 0) {
            return true;
        }
    }
    return false;
}

function exceedsTeamLimit(team: Team) {
    for (let i = 0; i < team.players.length; i++) {
        //allow empty players
        if (team.players[i].app_data.code === 0) {
            continue;
        }
        let count = 1;
        for (let j = i + 1; j < team.players.length; j++) {
            if (team.players[j].app_data.team_name === team.players[i].app_data.team_name) {
                count++;
                console.log(j)
                console.log(team.players[i].app_data.team_name + " Count: " + count)

            }
            if (count > 3) {
                console.log(team.players[i].app_data.team_name)
                return true;
            }
        }
    }
    return false;
}

function getTotalCost(team: Team) {
    let total = 0
    for (let i = 0; i < team.players.length; i++) {
        total += team.players[i].app_data.now_cost
    }
    return total
}



function isValid(team: Team) {
    console.log(team)
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

export async function POST(req: NextRequest) {
    try {
        const team = await req.json();
        const db = await connectToDatabase();
        console.log("POST TEAM")
        //console.log(team)
        let result = null
        if (isValid(team)) {
            result = await updateTeam(db, team);
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


