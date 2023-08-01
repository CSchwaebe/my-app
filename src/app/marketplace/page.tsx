//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from "wagmi";
import nft_contract from '../contract_artifacts/MyNFTContract.json'
import erc_contract from '../contract_artifacts/MyERC20Token.json'
import { ethers } from 'ethers';
import ConnectWalletPopup from '../components/connectWalletPopup';
import Loading from '../components/loading';

import {AppData, Player, Attribute} from '../lib/interfaces'

export default function Marketplace() {
    const [players, setPlayers] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [searchField, setSearchField] = useState("");
    const filteredPlayers = players.filter(
        (player: Player) => {
            return (
                player
                    .app_data.first_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                player
                    .app_data.last_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                player
                    .app_data.team_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'bigkatoriginal'
        }
    });
    const handleChange = (e: any) => {
        setSearchField(e.target.value);
    };

    const { address, isConnecting, isDisconnected } = useAccount()


    const { write: approve_write } = useContractWrite({
        address: process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS,
        abi: erc_contract.abi,
        functionName: "approve",
        args: [process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, 10000000000000000000000],
    })


    let { data: data_allowance, isError: isError_allowance, isLoading: isLoading_allowance, status: status_allowance } = useContractRead({
        address: process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS,
        abi: erc_contract.abi,
        functionName: 'allowance',
        //totalSupply
        args: [address, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS]
    })

    const { data: data_mint, isLoading: isLoading_mint, isSuccess: isSuccess_mint, write: write_mintNFT } = useContractWrite({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
        abi: nft_contract.abi,
        functionName: 'mintNFT',
        onSuccess(data) {
            console.log('Success', data)
            alert("Mint Successful")
        },
        onError(error: any) {
            console.log('Error', error)
            alert("Mint Failed :(")
        },
    })

    useEffect(() => {
        setFetching(true)
        fetch('/api/marketplace')
            .then((res) => res.json())
            .then((data) => {
                setPlayers(data)
                setFetching(false)
            })
    }, [])

    /*****************************************************************
    * HELPER FUNCTIONS *
    *****************************************************************/


    /*****************************************************************
    * The following functions are used to render components *
    *****************************************************************/

    function playerCard(player: Player) {

        return (

            <div className="card w-64 glass m-4">
                <div className="group">
                    <figure className="pt-4 px-4"><AdvancedImage className="" cldImg={cld.image('p' + player.app_data.code)} plugins={[placeholder({ mode: 'blur' })]} />
                    </figure>
                    <div className="relative -mt-12 invisible group-hover:visible">
                        <button className="h-12 w-full py-2 px-4 bg-teal-400 hover:bg-teal-300 text-purple-700 font-bold"
                            onClick={() =>
                                write_mintNFT({
                                    args: [player.app_data.code],
                                })/*mintPlayer(player.code)*/}>Mint</button>
                    </div>


                </div>

                <div className='pt-0 px-2'>
                    <div className='inline-block float-left p-2 antialiased text-base-100'>
                        <h2 className="text-left text-base font-black">{player.app_data.display_name}</h2>
                        <h2 className="text-left text-sm">
                            <span className="font-medium">{player.app_data.team_abbreviation} </span>
                            <span className="font-extralight">{player.app_data.position}</span>
                        </h2>
                    </div>

                    <div className='inline-block float-right p-2 antialiased font-bold text-green-400'>
                        <h2 className="text-right text-base">{player.app_data.now_cost + " FPC"}</h2>
                    </div>

                    
                </div>


            </div>
        )
    }

    // Returns the first X players matching the search criteria
    function searchList() {
        const filtered = filteredPlayers.slice(0, 20).map(player => playerCard(player));
        return (
            <div className="flex flex-row flex-wrap justify-center p-6">
                {filtered}
            </div>
        );
    }

    /*****************************************************************
    * MAIN RENDER *
    ******************************************************************/
    if (isFetching) return (
        <Loading />
    )

    if (isDisconnected) return (
        <ConnectWalletPopup />
    )

    if (!isLoading_allowance && Number(ethers.formatEther(data_allowance)) < 250) return (
        <div className="w-1/1 p-6 pt-12">
            <div className='text-white-100 w-full text-center font-bold antialiased text-3xl'>

                <h1 className='tracking-wide'>Increase Your Spending Limit to Access the Marketplace</h1>

            </div>
            <div className='grid grid-cols-2 mt-12'>
                <div className="flex justify-center">
                    <div className="flex-initial">
                        <div className='col-span-1 m-4 bg-white-100 w-64 shadow-xl rounded-xl overflow-hidden'>
                            <h2 className="bg-purple-700 p-4 text-center text-white-100 text-xl antialiased tracking-wide font-bold">Your Limit</h2>
                            <h3 className="text-center text-purple-700 p-4 text-xl">{Number(ethers.formatEther(data_allowance))}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex-initial">
                        <div className='col-span-1 m-4 bg-white-100 w-64 shadow-xl rounded-xl overflow-hidden'>
                            <h2 className="bg-purple-700 p-4 text-center text-white-100 text-xl antialiased tracking-wide font-bold">Increase</h2>
                            <button onClick={() => approve_write()} className="w-full text-center text-purple-700 p-4 text-xl hover:bg-green-400">Click Here</button>

                        </div>
                    </div>

                </div>


            </div>

        </div>
    )

    if (!players) return <p>No profile data</p>

    return (
        <div>
            { /* Header */}
            <div className="w-full grid grid-cols-4 pr-6 glass bg-none text-white-200">
                <div className='col-span-4 py-4'>
                    <h2 className="text-center font-bold text-2xl tracking-wide antialiased">Marketplace</h2>

                </div>

            </div>

            <div className="w-full grid grid-cols-8 pt-8">
                <div className="col-span-1"></div>
                <div className="col-span-6">
                    <input type="search" onChange={handleChange} placeholder="Search"
                        className="glass bg-none rounded-none text-base-100 input input-bordered w-full bg-transparent input-accent" required />
                </div>
                <div className="col-span-1"></div>
            </div>
            <div className="w-full">
                {searchList()}
            </div>
        </div>
    )
}

