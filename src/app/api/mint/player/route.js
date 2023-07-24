import clientPromise from "../../../lib/mongodb";
import { NextResponse, NextRequest } from 'next/server'


const API_URL = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

//const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
//const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)

//const nft_contract = require("../../../artifacts/contracts/MyNFTContract.json")
const nft_contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const erc20_contractAddress = process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS;

//const nftContract = new web3.eth.Contract(nft_contract.abi, nft_contractAddress)






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

async function initial_mint_single_player(player) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('nfts');


    const id = await getNextID();

    player["_id"] = id;
    await collection.insertOne({
        _id: id,
        uri: process.env.BASE_URL + "api/nft/" + player.code.toString(),
    })

}



/*****************************************************************
* HELPER FUNCTIONS * 
******************************************************************/
async function getPlayerData(player_code) {
    const mongoClient = await clientPromise;
    const db = mongoClient.db('fpl');
    const collection = db.collection('players');
    let player_data = await collection.findOne(
        { code: player_code }
    )
    return player_data;
}

/*
async function generateTx(address, uri) {
    let nonce = await web3.eth.getTransactionCount(address, 'latest'); //get latest nonce
    let gasPrice = await web3.eth.getGasPrice() * 1.25;
    //console.log(gasPrice);
    let tx = {
        'from': address,
        'to': nft_contractAddress,
        'nonce': nonce,
        'gas': 50000000,
        'gasPrice': gasPrice,
        'data': nftContract.methods.mintNFT(address, uri).encodeABI()
    }
    /*
    console.log("Getting gas price")
    let gas = await web3.eth.getGasPrice();
    console.log(gas);
    
    return tx;
}
*/

/*****************************************************************
* ENDPOINTS * 
******************************************************************/

export async function POST(req) {
    try {
        console.log("Mint Player POST")
        const player_code = await req.json();
       
        console.log(player_code)
        let player = await getPlayerData(player_code)

        if (player != null) {
            console.log(player)
            
            return NextResponse.json(player);
        } else {
            return NextResponse.json(
                { message: "Invalid Player"}, 
                { status: 400 }
            );
        }

        // So we need to keep track of teams by gameweek too


    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }
}

export async function GET(req) {
    try {
        const mongoClient = await clientPromise;
        const db = mongoClient.db('fpl');
        const collection = db.collection('players');

        const all_players = await collection.find({}).toArray();

        all_players.forEach(async (player) => {
            await initial_mint_single_player(player);
        });

        return NextResponse.json({ "status": 400 });
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }

}