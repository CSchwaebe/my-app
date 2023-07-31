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

export default function Marketplace() {
    const [players, setPlayers] = useState([])
    const [isFetching, setFetching] = useState(true)
    const [searchField, setSearchField] = useState("");
    const filteredPlayers = players.filter(
        (player: any) => {
            return (
                player
                    .first_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                player
                    .last_name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                player
                    .team_name
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

    function playerCard(player: any) {

        return (
            <div className="card w-64 glass m-4">
                <div className="group">
                    <figure className="pt-4 px-4"><AdvancedImage className="" cldImg={cld.image('p' + player.code)} plugins={[placeholder({ mode: 'blur' })]} />
                    </figure>
                    <div className="relative -mt-12 invisible group-hover:visible">
                        <button className="h-12 w-full py-2 px-4 bg-teal-400 hover:bg-teal-300 text-purple-700 font-bold"
                            onClick={() =>
                                write_mintNFT({
                                    args: [player.code],
                                    onError(error: any) {
                                        console.log("HELLO")
                                        console.log('Error', error)
                                    },
                                })/*mintPlayer(player.code)*/}>Mint</button>
                    </div>

                </div>

                <div className="group text-base-100">
                    <div className='flex text-green-400 antialiased font-black p-4'>
                        <h2 className="flex-3 text-left text-white-100">{player.display_name}</h2>
                        <h2 className="flex-1 text-right">{player.now_cost + " FPC"}</h2>
                    </div>

                </div>
            </div>
        )
    }

    // Returns each individual card in the search list

    function playerCard_old(player: any) {

        return (
            <div className="shadow-md w-64 box-border m-2 p-0 rounded-3xl bg-purple-700 flex-initial border-4 border-purple-700 hover:cursor-pointer hover:border-green-400 overflow-hidden" key={player._id}>
                <div className="w-1/1 bg-white-100 group">
                    <AdvancedImage className="p-2 pb-0" cldImg={cld.image('p' + player.code)} plugins={[placeholder({ mode: 'blur' })]} />
                    <div className="relative -mt-12 invisible group-hover:visible">
                        <button className="h-12 w-full py-2 px-4 bg-teal-400 hover:bg-teal-300 text-purple-700 font-bold"
                            onClick={() =>
                                write_mintNFT({
                                    args: [player.code],
                                    onError(error: any) {
                                        console.log("HELLO")
                                        console.log('Error', error)
                                    },
                                })/*mintPlayer(player.code)*/}>Mint</button>
                    </div>
                </div>

                <div className='flex bg-purple-700 text-green-400 antialiased font-black p-4'>
                    <h2 className="flex-3 text-left">{player.display_name}</h2>
                    <h2 className="flex-1 text-right">{player.now_cost}</h2>
                </div>
            </div>
        );
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

