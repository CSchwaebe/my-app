//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from "wagmi";
import ConnectWalletPopup from '../components/connectWalletPopup';
import Loading from '../components/loading';

export default function Marketplace() {
    const [teams, setTeams] = useState([])
    const [gameweek, setGameweek] = useState("0")
    const [isFetching, setFetching] = useState(true)

    const { address, isConnecting, isDisconnected } = useAccount()

    useEffect(() => {
        setFetching(true)
        fetch('/api/leaderboard', { next: { revalidate: 10 } })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTeams(data.teams)
                setGameweek(data.gameweek)
                setFetching(false)
            })
    }, [])

    const filtered = getTop20(teams)//teams.slice(0, 20).map(team => teamCard(team));

    const yourTeam = getYourTeam(teams)//teams.filter(team => team.address == address).map(team => yourCard(team));

    /*****************************************************************
    * HELPER FUNCTIONS *
    *****************************************************************/

    function getTop20(teams) {
        let top20 = teams.slice(0, 20);
        for (let i = 0; i < top20.length; i++) {
            top20[i].rank = i + 1;
        }
        return top20.map(team => teamCard(team));
    }

    function getYourTeam(teams) {
        let yourTeam = teams.filter(team => team.address == address)
        if (yourTeam.length == 0) {
            return <div></div>
        }
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].address == address) {
                yourTeam = teams[i];
                yourTeam.rank = i + 1;
            }
        }

        console.log(yourTeam)
        return yourCard(yourTeam);
       
    }

    /*****************************************************************
    * The following functions are used to render components *
    *****************************************************************/


    function yourCard(team: any) {

        return (
            <div className="grid grid-cols-10 row-span-1 p-2 bg-green-400 bg-opacity-70 text-purple-700 border-b border-opacity-50">
                <div className="col-span-1 text-left pl-4">{team.rank}</div>
                <div className="col-span-7 text-left pl-4">{team.address}</div>
                <div className="col-span-2 text-center">{team.score}</div>
            </div>
        )



    }
    // Returns each individual card in the search list
    function teamCard(team: any) {
        return (
            <div className="grid grid-cols-10 row-span-1 p-2 bg-white-100 bg-opacity-50 text-purple-700 border-b border-opacity-50">
                <div className="col-span-1 text-left pl-4">{team.rank}</div>
                <div className="col-span-7 text-left pl-4">{team.address}</div>
                <div className="col-span-2 text-center">{team.score}</div>
            </div>
        )
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

    if (true) return (
        <div className="p-8 w-full">
            <div className="card w-full glass bg-none">

                {/* Title */}
                <div className="rounded overflow-hidden shadow-xl">
                    <h1 className="text-center text-3xl font-bold  text-white-100 p-4">Gameweek {gameweek}</h1>

                    {/* Heading */}
                    <div className="grid grid-cols-10 row-span-1 p-2">
                        <div className="col-span-1 text-left text-white-100 font-bold text-xl pl-4">Rank</div>
                        <div className="col-span-7 text-left text-white-100 font-bold text-xl pl-4">Address</div>
                        <div className="col-span-2 text-center text-white-100 font-bold text-xl">Score</div>
                    </div>

                    {/* Rows */}
                    <div className="grid grid-rows-20 w-1/1">
                        {yourTeam}
                    </div>
                    <div className="grid grid-rows-20 w-1/1">
                        {filtered}
                    </div>
                    
                </div>


            </div>

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
                <div className="grid grid-rows-20 w-1/1 bg-white-100">
                    {yourTeam}
                </div>
            </div>

        </div>
    )
}

