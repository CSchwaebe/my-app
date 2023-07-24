//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from "wagmi";


export default function Marketplace() {
    const [teams, setTeams] = useState([])
    const [gameweek, setGameweek] = useState("0")
    const [isFetching, setFetching] = useState(true)

    const { address, isConnecting, isDisconnected } = useAccount()

    useEffect(() => {
        setFetching(true)
        fetch('/api/leaderboard')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTeams(data.teams)
                setGameweek(data.gameweek)
                setFetching(false)
            })
    }, [])

    const filtered = teams.slice(0, 20).map(team => teamCard(team));


    /*****************************************************************
    * HELPER FUNCTIONS *
    *****************************************************************/


    /*****************************************************************
    * The following functions are used to render components *
    *****************************************************************/

    // Returns each individual card in the search list
    function teamCard(team: any) {
        return (

            <div className="grid grid-cols-5 row-span-1 p-2 bg-white-100 text-purple-700 border-b-2">
                <div className="col-span-4 text-left pl-4">{team.address}</div>
                <div className="col-span-1 text-center">{team.score}</div>
            </div>
        )
    }



    /*****************************************************************
    * MAIN RENDER *
    ******************************************************************/
    if (isFetching) return <p>Loading...</p>

    if (isDisconnected) return (
        <div className="w-1/1 block">
            <div>Connect Wallet</div>
        </div>
    )

    return (
        <div className="p-8">
            <div className="rounded overflow-hidden shadow-xl">


                <h1 className="text-center text-3xl font-bold bg-purple-700 text-white-100 p-4">Gameweek {gameweek}</h1>
                <div className="grid grid-cols-5 row-span-1 p-2 bg-purple-700">
                    <div className="col-span-4 text-left text-white-100 font-bold text-xl pl-4">Address</div>
                    <div className="col-span-1 text-center text-white-100 font-bold text-xl">Score</div>
                </div>
                <div className="grid grid-rows-20 w-1/1 bg-white-100">
                    {filtered}
                </div>
            </div>

        </div>
    )
}

