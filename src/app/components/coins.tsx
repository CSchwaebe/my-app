//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useBalance, useContractWrite, useContractRead } from 'wagmi';
import nft_contract from '../contract_artifacts/MyNFTContract.json'
import erc_contract from '../contract_artifacts/MyERC20Token.json'
import { ethers } from 'ethers';

export default function Coins() {
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data: balance_data, isError, isLoading } = useBalance({
        address: address,
        token: process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS,
        watch: true,
    })

    const { data: contract_data, isSuccess, write } = useContractWrite({
        address: process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS,
        abi: erc_contract.abi,
        functionName: 'buyTokens',
    })

    let { data: data_allowance, isError: isError_allowance, isLoading: isLoading_allowance, status: status_allowance } = useContractRead({
        address: process.env.NEXT_PUBLIC_ERC_CONTRACT_ADDRESS,
        abi: erc_contract.abi,
        functionName: 'allowance',
        //totalSupply
        args: [address, process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS]
    })

    /*****************************************************************
    * HELPER FUNCTIONS *
    *****************************************************************/

    function buyCoins(amount: any) {
        write({ value: ethers.parseEther(amount.toString()) })
        console.log(amount)
    }

    /*****************************************************************
    * COMPONENTS *
    *****************************************************************/


    /*****************************************************************
    * MAIN RENDER *
    ******************************************************************/
    if (isDisconnected) return (
        <div className="w-1/1 block">
            <div>Connect Wallet</div>
        </div>
    )

    if (isLoading) return <p>Loading...</p>

    return (
        <div className="w-1/1">   
            <div className='bg-purple-700 mt-0'>
                <div className='w-1/1 m-0 bg-white-100 overflow-hidden grid grid-rows-7'>
                    <h2 className="row-span-1 bg-purple-700 p-2 text-center text-white-100 text-sm antialiased tracking-wide font-bold">Balance</h2>
                    <h3 className="row-span-1 border-purple-700 w-1/1 text-center text-purple-700 p-2 text-sm">{balance_data?.formatted.substring(0, 7)}</h3>

                    <h2 className="row-span-1 bg-purple-700 p-2 text-center text-white-100 text-sm antialiased tracking-wide font-bold">Buy More</h2>
                    <button onClick={() => buyCoins(0.0025)} className="row-span-1 border-purple-700 w-1/1 text-center text-purple-700 p-2 text-sm hover:bg-green-400">100</button>
                    <button onClick={() => buyCoins(0.005)} className="row-span-1 border-purple-700 w-1/1 text-center text-purple-700 p-2 text-sm hover:bg-green-400">200</button>
                    <button onClick={() => buyCoins(0.0125)} className="row-span-1 border-purple-700 w-1/1 text-center text-purple-700 p-2 text-sm hover:bg-green-400">500</button>
                    <button onClick={() => buyCoins(0.025)} className="row-span-1 border-purple-700 w-1/1 text-center text-purple-700 p-2 text-sm hover:bg-green-400">1000</button>
                </div>

                


            </div>

        </div>
    )
}

