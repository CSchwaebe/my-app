'use client';
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'
import ConnectWalletPopup from '../components/connectWalletPopup';
import Loading from '../components/loading';
import { AppData, Player, Attribute, Team } from '../lib/interfaces'

export default function Team() {
    const [players, setPlayers] = useState<Player[]>([])
    const [team, setTeam] = useState<Team>({
        address: "",
        team_name: "",
        gameweek: "0",
        score: 0,
        players: [],
    })
    const [team_name, set_team_name] = useState<string>("")
    const [isLoading, setLoading] = useState(true)
    const { address, isConnecting, isDisconnected } = useAccount()
    
    const temp_field_player = {
        description: "",
        external_url: "",
        image: "",
        name: "",
        attributes: [],
        app_data: {
            first_name: null,
            last_name: null,
            display_name: "Empty",
            code: 0,
            event_points: null,
            team: null,
            team_code: null,
            team_name: null,
            team_abbreviation: null,
            now_cost: null,
            position: null,
            image_url: null,
            shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp"
        }
    }

    useEffect(() => {
        if (address == undefined) return
        setLoading(true)
        fetch('/api/profile/' + address)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPlayers(data.players)
                setTeam(data.team)
                set_team_name(data.team.team_name)
                setLoading(false)
            })
    }, [address])

    const [searchField, setSearchField] = useState("");

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'bigkatoriginal'
        }
    });

    // The results from the search
    const filteredPlayers = players?.filter(
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

    //Handles the change in the search field
    const handleChange = (e: any) => {
        setSearchField(e.target.value);
    };

    const handleTeamNameChange = (e: any) => {
        set_team_name(e.target.value);
    };

    /*****************************************************************
     * HELPER FUNCTIONS *
     *****************************************************************/

    // Utility function to get the slug from the url
    function getSlug(url: string) {
        const idx = url.lastIndexOf("/");
        const slug = url.substring(idx + 1);
        return slug;
    }

    // Handles the click on the player cards in the search results
    function addToTeam(player: Player) {
        console.log("add to team: " + player.app_data.code);
        switch (player.app_data.position) {
            case "GK":
                if (team.players[0].app_data.code === 0) {
                    team.players[0] = player;
                } else if (team.players[1].app_data.code === 0) {
                    team.players[1] = player;
                } else {
                    return false;
                }
                break;
            case "DEF":
                if (team.players[2].app_data.code === 0) {
                    team.players[2] = player;
                } else if (team.players[3].app_data.code === 0) {
                    team.players[3] = player;
                } else if (team.players[4].app_data.code === 0) {
                    team.players[4] = player;
                } else if (team.players[5].app_data.code === 0) {
                    team.players[5] = player;
                } else if (team.players[6].app_data.code === 0) {
                    team.players[6] = player;
                } else {
                    return false;
                }
                break;
            case "MID":
                if (team.players[7].app_data.code === 0) {
                    team.players[7] = player;
                } else if (team.players[8].app_data.code === 0) {
                    team.players[8] = player;
                } else if (team.players[9].app_data.code === 0) {
                    team.players[9] = player;
                } else if (team.players[10].app_data.code === 0) {
                    team.players[10] = player;
                } else if (team.players[11].app_data.code === 0) {
                    team.players[11] = player;
                } else {
                    return false;
                }
                break;
            case "FWD":
                if (team.players[12].app_data.code === 0) {
                    team.players[12] = player;
                } else if (team.players[13].app_data.code === 0) {
                    team.players[13] = player;
                } else if (team.players[14].app_data.code === 0) {
                    team.players[14] = player;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
        console.log(team)
        let newPlayers = [...team.players]
        team.players = newPlayers;
        let newTeam = {...team};
        setTeam(newTeam);
        return true;
    }

    function removeFromTeam(player: Player, index: number) {
        console.log("remove from team: " + player.app_data.code);
        team.players[index] = temp_field_player;
        let newPlayers = [...team.players]
        team.players = newPlayers;
        let newTeam = {...team};
        setTeam(newTeam);
        //let newTeam = [...team]
        //setTeam(newTeam);
        return true;
    }

    function getTotalCost() {
        let total = 0
        for (let i = 0; i < team.players.length; i++) {
            total += team.players[i].app_data.now_cost
        }
        return total
    }

    function getMoneyRemaining() {
        return 1000 - getTotalCost();
    }

    function hasDuplicates() {
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

    function hasEmpty() {
        for (let i = 0; i < team.players.length; i++) {
            if (team.players[i].app_data.code === 0) {
                return true;
            }
        }
        return false;
    }

    function exceedsTeamLimit() {
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

    async function saveTeam() {
        console.log("save team")
        team.team_name = team_name;
        console.log(team)

        /*
        if (checkForEmpty()) {
            alert("You have empty slots in your team. Please fill them before saving.")
            return
        }
        */
        if (hasDuplicates()) {
            alert("You have duplicate players in your team. Please remove them before saving.")
            return
        }
        if (exceedsTeamLimit()) {
            alert("You have too many players from the same team. Please remove some players before saving.")
            return
        }
        if (getTotalCost() > 1000) {
            alert("Your team is too expensive. Please remove some players before saving.")
            return
        }

        try {
            await fetch('/api/profile/' + address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8',
                },
                body: JSON.stringify(team),
            })
            alert("Team saved successfully!")
        } catch (err) {
            console.log(err)
            alert("Error saving team")
        }


    }


    /*****************************************************************
     * The following functions are used to render components *
     *****************************************************************/

    // Returns each individual card in the search list
    function searchCard(player: Player) {
        //const cloudinary_base_url = "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689018706/p"
        return (
            <button onClick={() => addToTeam(player)}>
                <div className="w-1/1  border-b-2 border-white-100 glass bg-none text-white-100 hover:cursor-pointer hover:bg-green-400 hover:text-white-700 overflow-hidden" key={player.app_data.code}>
                    <div className="inline-block float-left w-12">
                        <AdvancedImage className="p-2 pr-0 h-14 w-10" cldImg={cld.image(getSlug(player.app_data.shirt_url))} plugins={[placeholder({ mode: 'blur' })]} />
                    </div>

                    <div className='inline-block float-left p-2 antialiased font-black text-sm'>
                        <h2 className="text-left font-bold">{player.app_data.display_name}</h2>
                        <h2 className="text-left">
                            <span className="font-normal">{player.app_data.team_abbreviation} </span>
                            <span className="font-thin">{player.app_data.position}</span>
                        </h2>
                    </div>

                    <div className='inline-block float-right antialiased font-bold p-2 align-middle text-sm'>
                        <h2 className="text-right">{player.app_data.now_cost}</h2>
                    </div>
                </div>
            </button>
        );
    }

    // Returns the first 25 players matching the search criteria
    function searchList() {
        const filtered = filteredPlayers.slice(0, 25).map(player => searchCard(player));
        return (
            <div className="overflow-scroll grid grid-cols-1 border-t-0 border-white-100 box-border" style={{ "maxHeight": 'calc(90vh - 56px)' }}>
                {filtered}
            </div>
        );
    }

    function fieldCard(player: Player, index: number) {
        return (
            <div className="">
                <button onClick={() => removeFromTeam(player, index)}>
                    <div className="grid place-content-center hover:bg-red-400">
                        <AdvancedImage className="p-2 h-20" cldImg={cld.image(getSlug(player.app_data.shirt_url))} plugins={[placeholder({ mode: 'blur' })]} />
                    </div>

                    <div className='border-purple-700 border-2'>
                        <div className='px-1 bg-purple-700 text-white-100 antialiased text-xs'>
                            <p className="text-center font-bold">{player.app_data.display_name}</p>
                        </div>
                        <div className='px-1 bg-white-100 text-purple-700 antialiased text-xs'>
                            <p className="text-center font-bold">{player.app_data.now_cost}</p>
                        </div>
                    </div>
                </button>

            </div>
        );
    }

    //Return the field with the players
    function field() {
        return (
            <div className="absolute top-0 left-0 w-full h-full grid grid-rows-5">
                <div className="grid grid-cols-6 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team.players[0], 0)}</div>
                    <div className="col-span-1">{fieldCard(team.players[1], 1)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-9 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team.players[2], 2)}</div>
                    <div className="col-span-1">{fieldCard(team.players[3], 3)}</div>
                    <div className="col-span-1">{fieldCard(team.players[4], 4)}</div>
                    <div className="col-span-1">{fieldCard(team.players[5], 5)}</div>
                    <div className="col-span-1">{fieldCard(team.players[6], 6)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-9 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team.players[7], 7)}</div>
                    <div className="col-span-1">{fieldCard(team.players[8], 8)}</div>
                    <div className="col-span-1">{fieldCard(team.players[9], 9)}</div>
                    <div className="col-span-1">{fieldCard(team.players[10], 10)}</div>
                    <div className="col-span-1">{fieldCard(team.players[11], 11)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-7 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team.players[12], 12)}</div>
                    <div className="col-span-1">{fieldCard(team.players[13], 13)}</div>
                    <div className="col-span-1">{fieldCard(team.players[14], 14)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-6 place-items-center">
                    <div className="col-span-1"></div>
                    <div className="col-span-2">
                        <div className="bg-white-100 text-purple-700 rounded px-8 py-2 
                        antialiased font-bold tracking-wide">Money Remaining: {getMoneyRemaining()} </div>
                    </div>
                    <div className="col-span-2">
                        <button className="bg-green-400 text-purple-700 rounded px-8 py-2 
                        antialiased font-bold tracking-wide" onClick={() => saveTeam()}>Save Team</button>
                    </div>

                    <div className="col-span-1"></div>
                </div>
            </div>
        )
    }

    /*****************************************************************
     * MAIN RENDER *
     *****************************************************************/
    if (isDisconnected) return (
        <ConnectWalletPopup />
    )

    if (isLoading) return (
        <Loading />
    )

    if (address) return (
        <div className="w-1/1 block">

            { /* Header */}
            <div className="w-full grid grid-cols-4 py-4 pr-6 glass bg-none text-white-200">
                <div className='col-span-3'>
                    <input type="text" onChange={handleTeamNameChange} placeholder={team_name} value={team_name} className="input input-ghost w-full text-center font-bold text-2xl antialiased" />
                </div>
                <div className='col-span-1'>
                    <h2 className="text-center font-bold text-2xl antialiased">Your Players</h2>
                </div>
            </div>
            <div className="w-full h-full grid grid-cols-4 pt-6 pr-6">

                { /* Pitch */}
                <div className='h-full col-span-3'>
                    <div className='relative w-full' style={{ height: '90vh' }}>
                        <AdvancedImage className="absolute top-0 left-0 w-full" style={{ height: '90vh' }}
                            cldImg={cld.image("pitch.svg")} plugins={[placeholder({ mode: 'blur' })]} />
                        {field()}
                    </div>
                </div>

                { /* Search Bar and results list */}
                <div className="col-span-1 shadow-base overflow-hidden">

                    <input type="search" onChange={handleChange} placeholder="Search"
                        className="glass bg-none rounded-none text-base-100 input input-bordered w-full bg-transparent input-accent" required />

                    {searchList()}
                </div>
            </div>
        </div>
    )

    return (
        <p>UH OH</p>
    )

    /*
    return (
        <Monolith players={players} team={team} wallet_address={address}></Monolith>
    );
    */


}

