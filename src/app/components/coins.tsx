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
        <div className="block rounded-full px-4 py-2 mt-4 lg:inline-block lg:mt-0 text-white-100 bg-purple-700 hover:text-teal-400 mr-4">
            <button className="text-center text-sm">{"0 FPC"}</button>
        </div>
    )

    if (isLoading) return <p>Loading...</p>


    return (
        <div className="block pr-4 py-2 mt-4 lg:inline-block lg:mt-0 mr-4">
            
            <div className="block rounded-full px-4 py-2 mt-4 lg:inline-block lg:mt-0 text-purple-700 bg-teal-400 mr-4">
                <a href="https://baseswap.fi/swap?outputCurrency=0x33733600A1E70C788d5dAE86f0359698dd07404A" target="_blank" className="text-center text-sm">Buy FPC</a>
                {/* 
                                <button onClick={() => buyCoins(0.025)} className="text-center text-sm">{"Buy 1000 FPC"}</button>
                */}
            </div>
            <div className="block pr-4 py-2 mt-4 lg:inline-block lg:mt-0 text-purple-700">
                <p className="text-center text-sm text-red-400">{"Balance: " + balance_data?.formatted.substring(0, 7) + " FPC"}</p>

            </div>
        </div>

    )
}

