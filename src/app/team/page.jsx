'use client';
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi'

export default function Team() {
    const [players, setPlayers] = useState([])
    const [team, setTeam] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { address, isConnecting, isDisconnected } = useAccount()
    const temp_field_player = {
        display_name: "Empty",
        code: 0,
        shirt_url: "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689702973/blank_shirt.webp",
        now_cost: 0,
    }

    useEffect(() => {
        setLoading(true)
        fetch('/api/profile/' + address)
            //fetch('/api/bootstrap/team')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPlayers(data.players)
                setTeam(data.team)
                setLoading(false)
            })
    }, [])

    const [searchField, setSearchField] = useState("");

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'bigkatoriginal'
        }
    });

    // The results from the search
    const filteredPlayers = players.filter(
        player => {
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

    //Handles the change in the search field
    const handleChange = e => {
        setSearchField(e.target.value);
    };

    /*****************************************************************
     * HELPER FUNCTIONS *
     *****************************************************************/

    // Utility function to get the slug from the url
    function getSlug(url) {
        const idx = url.lastIndexOf("/");
        const slug = url.substring(idx + 1);
        return slug;
    }

    // Handles the click on the player cards in the search results
    function addToTeam(player) {
        console.log("add to team: " + player.code);
        switch (player.position) {
            case "GK":
                if (team[0].code === 0) {
                    team[0] = player;
                } else if (team[1].code === 0) {
                    team[1] = player;
                } else {
                    return false;
                }
                break;
            case "DEF":
                if (team[2].code === 0) {
                    team[2] = player;
                } else if (team[3].code === 0) {
                    team[3] = player;
                } else if (team[4].code === 0) {
                    team[4] = player;
                } else if (team[5].code === 0) {
                    team[5] = player;
                } else if (team[6].code === 0) {
                    team[6] = player;
                } else {
                    return false;
                }
                break;
            case "MID":
                if (team[7].code === 0) {
                    team[7] = player;
                } else if (team[8].code === 0) {
                    team[8] = player;
                } else if (team[9].code === 0) {
                    team[9] = player;
                } else if (team[10].code === 0) {
                    team[10] = player;
                } else if (team[11].code === 0) {
                    team[11] = player;
                } else {
                    return false;
                }
                break;
            case "FWD":
                if (team[12].code === 0) {
                    team[12] = player;
                } else if (team[13].code === 0) {
                    team[13] = player;
                } else if (team[14].code === 0) {
                    team[14] = player;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
        //console.log(team)
        let newTeam = [...team]
        setTeam(newTeam);
        return true;
    }

    function removeFromTeam(player, index) {
        console.log("remove from team: " + player.code);
        team[index] = temp_field_player;
        let newTeam = [...team]
        setTeam(newTeam);
        return true;
    }

    function getTotalCost() {
        let total = 0
        for (let i = 0; i < team.length; i++) {
            total += team[i].now_cost
        }
        return total
    }

    function getMoneyRemaining() {
        return 1000 - getTotalCost();
    }

    function checkForDuplicates() {
        let codes = []
        for (let i = 0; i < team.length; i++) {
            //Allow empty players
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

    function checkForEmpty() {
        for (let i = 0; i < team.length; i++) {
            if (team[i].code === 0) {
                return true;
            }
        }
        return false;
    }

    function checkTeamLimit() {
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

    async function saveTeam() {
        console.log("save team")
        console.log(team)

        /*
        if (checkForEmpty()) {
            alert("You have empty slots in your team. Please fill them before saving.")
            return
        }
        */
        if (checkForDuplicates()) {
            alert("You have duplicate players in your team. Please remove them before saving.")
            return
        }
        if (checkTeamLimit()) {
            alert("You have too many players from the same team. Please remove some players before saving.")
            return
        }
        if (getTotalCost() > 1000) {
            alert("Your team is too expensive. Please remove some players before saving.")
            return
        }


        let obj = {
            wallet_address: address,
            team: team,
        }

        try {
            await fetch('/api/profile/' + address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'charset': 'UTF-8',
                },
                body: JSON.stringify(obj),
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
    function searchCard(player) {
        //const cloudinary_base_url = "https://res.cloudinary.com/bigkatoriginal/image/upload/v1689018706/p"
        return (
            <button onClick={() => addToTeam(player)}>
                <div className="w-1/1  border-b-2 border-white-100 glass bg-none text-white-100 hover:cursor-pointer hover:bg-green-400 hover:text-white-700 overflow-hidden" key={player._id}>
                    <div className="inline-block float-left w-12">
                        <AdvancedImage className="p-2 pr-0 h-14 w-10" cldImg={cld.image(getSlug(player.shirt_url))} plugins={[placeholder({ mode: 'blur' })]} />
                    </div>

                    <div className='inline-block float-left p-2 antialiased font-black text-sm'>
                        <h2 className="text-left font-bold">{player.display_name}</h2>
                        <h2 className="text-left">
                            <span className="font-normal">{player.team_abbreviation} </span>
                            <span className="font-thin">{player.position}</span>
                        </h2>
                    </div>

                    <div className='inline-block float-right antialiased font-bold p-2 align-middle text-sm'>
                        <h2 className="text-right">{player.now_cost}</h2>
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

    function fieldCard(player, index) {
        return (
            <div className="">
                <button onClick={() => removeFromTeam(player, index)}>
                    <div className="grid place-content-center hover:bg-red-400">
                        <AdvancedImage className="p-2 h-20" cldImg={cld.image(getSlug(player.shirt_url))} plugins={[placeholder({ mode: 'blur' })]} />
                    </div>

                    <div className='border-purple-700 border-2'>
                        <div className='px-1 bg-purple-700 text-white-100 antialiased text-xs'>
                            <p className="text-center font-bold">{player.display_name}</p>
                        </div>
                        <div className='px-1 bg-white-100 text-purple-700 antialiased text-xs'>
                            <p className="text-center font-bold">{player.now_cost}</p>
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
                    <div className="col-span-1">{fieldCard(team[0], 0)}</div>
                    <div className="col-span-1">{fieldCard(team[1], 1)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-9 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team[2], 2)}</div>
                    <div className="col-span-1">{fieldCard(team[3], 3)}</div>
                    <div className="col-span-1">{fieldCard(team[4], 4)}</div>
                    <div className="col-span-1">{fieldCard(team[5], 5)}</div>
                    <div className="col-span-1">{fieldCard(team[6], 6)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-9 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team[7], 7)}</div>
                    <div className="col-span-1">{fieldCard(team[8], 8)}</div>
                    <div className="col-span-1">{fieldCard(team[9], 9)}</div>
                    <div className="col-span-1">{fieldCard(team[10], 10)}</div>
                    <div className="col-span-1">{fieldCard(team[11], 11)}</div>
                    <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-7 place-items-center">
                    <div className="col-span-2"></div>
                    <div className="col-span-1">{fieldCard(team[12], 12)}</div>
                    <div className="col-span-1">{fieldCard(team[13], 13)}</div>
                    <div className="col-span-1">{fieldCard(team[14], 14)}</div>
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
        <div className="w-1/1 block">
            <div>Connect Wallet</div>
        </div>
    )

    if (isLoading) return (
        <div className="w-1/1 h-1/1 block">
            <div className="h-32 w-full grid grid-cols-3"></div>
            <div className="h-64 w-full grid grid-cols-3">
                <div className="col-span-1"></div>
                <div className="col-span-1 flex">
                    <h3 className="flex-1 loading loading-ring loading-lg text-secondary text-center"></h3>
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>

    )

    if (address) return (
        <div className="w-1/1 block">

            { /* Header */}
            <div className="w-full grid grid-cols-4 py-4 pr-6 glass bg-none text-white-200">
                <div className='col-span-3'>
                <h2 className="text-center font-bold text-2xl antialiased">Your Team</h2>

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
                    className="glass bg-none rounded-none text-base-100 input input-bordered w-full bg-transparent input-accent" required/>

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

