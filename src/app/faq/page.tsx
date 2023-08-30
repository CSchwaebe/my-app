//@ts-nocheck
'use client';
import React from 'react'

export default function FAQ() {





    /*****************************************************************
    * HELPER FUNCTIONS *
    *****************************************************************/


    /*****************************************************************
    * The following functions are used to render components *
    *****************************************************************/






    /*****************************************************************
    * MAIN RENDER *
    ******************************************************************/
    return (
        <div className="p-8 w-full">
            {/* Title */}
            <div className="card rounded w-full glass bg-none">
                <div className="overflow-hidden shadow-xl">
                    <h1 className="text-center text-3xl font-bold text-white-100 p-4">FAQ</h1>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-4 mt-4 grid-cols-1 grid-rows-1">

                {/* Row 1 */}
                <div className="glass bg-none col-span-1 row-span-1 p-4 rounded antialiased">
                    <h3 className="text-center text-xl font-bold  text-white-100 p-4">{"Ok I'm still confused, how do I use this?"}</h3>
                    <p className="text-justify text-sm font-bold  text-white-100 p-4 tracking-normal">
                        {"1. Connect your wallet in the top right. We're on Base so make sure you have some ETH on Base. If you need help getting your ETH to Base go to"} <a className="underline decoration-solid" target="_blank" href="https://stargate.finance/transfer">Stargate</a><br></br><br></br>
                        {"2. Buy at least 1000 FPC using the teal button in the center of the header"} <br></br><br></br>
                        {"3. Navigate to the Marketplace tab and adjust your spending limit. We suggest setting it to 10,000 FPC. This step enables the NFT contract to utilize your FPC when minting players."} <br></br><br></br>
                        {"4. Mint players in the Marketplace. You can search by player or team name. (Filters and more player data coming soon.)"} <br></br><br></br>
                        {"5. Head to the Team tab to pick your team. Your owned players are displayed on the right, simply click on them to add to your team.  You can have up to three players per team and no duplicates. Make sure you name and save your team before exiting!"} <br></br><br></br>
                        {"6. Check the Leaderboard to see how you did last week."} <br></br><br></br>
                    </p>
                </div>
            </div>

            {/* Title */}
            <div className="card rounded w-full glass bg-none mt-4">
                <div className="overflow-hidden shadow-xl">
                    <h1 className="text-center text-3xl font-bold text-white-100 p-4">Scoring</h1>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-4 mt-4 grid-cols-2 grid-rows-1">

                {/* Row 2 */}
                <div className="glass bg-none col-span-1 row-span-1 p-2 rounded antialiased">
                    <h3 className="text-center text-xl font-bold  text-white-100 p-4">Points</h3>
                    <div className="overflow-x-auto font-bold text-justify text-white-100 p-4 tracking-normal">
                        <p className="text-sm font-bold antialiased">
                            {"Throughout the season, points will be awarded to your fantasy football players depending on their performance in the Premier League."} <br></br><br></br>
                            {"You can have up to 15 players on your team, but the total value of your team has to be 1000 FPC or less. So use more, cheaper players, or fewer high-value stars. The choice is yours."}
                        </p> <br></br>
                        <table className="table-xs">
                            {/* head */}
                            <thead className='w-full'>
                                <tr className='text-sm font-bold text-white-100 p-4 tracking-normal'>
                                    <th className=''>Points</th>
                                    <th className=''>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>For playing up to 60 minutes</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>For playing 60 minutes or more (excluding stoppage time)</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>6</th>
                                    <td>For each goal scored by a goalkeeper or defender</td>
                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <th>5</th>
                                    <td>For each goal scored by a midfielder</td>
                                </tr>
                                {/* row 5 */}
                                <tr>
                                    <th>4</th>
                                    <td>For each goal scored by a forward</td>
                                </tr>
                                {/* row 6 */}
                                <tr>
                                    <th>3</th>
                                    <td>For each goal assist</td>
                                </tr>
                                {/* row 7 */}
                                <tr>
                                    <th>4</th>
                                    <td>For a clean sheet by a goalkeeper or defender</td>
                                </tr>
                                {/* row 8 */}
                                <tr>
                                    <th>1</th>
                                    <td>For a clean sheet by a midfielder</td>
                                </tr>
                                {/* row 9 */}
                                <tr>
                                    <th>1</th>
                                    <td>For every 3 shot saves by a goalkeeper</td>
                                </tr>
                                {/* row 10 */}
                                <tr>
                                    <th>5</th>
                                    <td>For each penalty save</td>
                                </tr>
                                {/* row 11 */}
                                <tr>
                                    <th>-2</th>
                                    <td>For each penalty miss</td>
                                </tr>
                                {/* row 12 */}
                                <tr>
                                    <th>1-3</th>
                                    <td>Bonus points for the best players in a match</td>
                                </tr>
                                {/* row 13 */}
                                <tr>
                                    <th>-1</th>
                                    <td>For every 2 goals conceded by a goalkeeper or defender</td>
                                </tr>
                                {/* row 14 */}
                                <tr>
                                    <th>-1</th>
                                    <td>For each yellow card</td>
                                </tr>
                                {/* row 15 */}
                                <tr>
                                    <th>-3</th>
                                    <td>For each red card</td>
                                </tr>
                                {/* row 16 */}
                                <tr>
                                    <th>-2</th>
                                    <td>For each own goal</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass bg-none col-span-1 row-span-1 p-2 rounded antialiased">
                    <h3 className="text-center text-xl font-bold  text-white-100 p-4">Bonus Points System</h3>
                    <div className="overflow-x-auto font-bold text-justify text-white-100 p-4 tracking-normal">
                        <p className="text-sm font-bold antialiased">
                            {"The Bonus Points System (BPS) utilises a range of statistics to create a BPS score for every player. The three best performing players in each match will be awarded bonus points. 3 points will be awarded to the highest scoring player, 2 to the second best and 1 to the third."}
                        </p> <br></br>
                        <table className="table-xs">
                            {/* head */}
                            <thead className='w-full'>
                                <tr className='text-sm font-bold text-white-100 p-4 tracking-normal'>
                                    <th className=''>BPS</th>
                                    <th className=''>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>3</th>
                                    <td>Playing 1 to 60 minutes</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>6</th>
                                    <td>Playing over 60 minutes</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>12</th>
                                    <td>Goalkeepers and defenders scoring a goal</td>
                                </tr>
                                {/* row 4 */}
                                <tr>
                                    <th>18</th>
                                    <td>Midfielders scoring a goal</td>
                                </tr>
                                {/* row 5 */}
                                <tr>
                                    <th>24</th>
                                    <td>Forwards scoring a goal</td>
                                </tr>
                                {/* row 6 */}
                                <tr>
                                    <th>9</th>
                                    <td>Assists</td>
                                </tr>
                                {/* row 7 */}
                                <tr>
                                    <th>12</th>
                                    <td>Goalkeepers and defenders keeping a clean sheet</td>
                                </tr>
                                {/* row 8 */}
                                <tr>
                                    <th>15</th>
                                    <td>Saving a penalty</td>
                                </tr>
                                {/* row 9 */}
                                <tr>
                                    <th>2</th>
                                    <td>Save</td>
                                </tr>
                                {/* row 10 */}
                                <tr>
                                    <th>1</th>
                                    <td>Successful open play cross</td>
                                </tr>
                                {/* row 11 */}
                                <tr>
                                    <th>3</th>
                                    <td>Creating a big chance (a chance where the receiving player should score)</td>
                                </tr>
                                {/* row 12 */}
                                <tr>
                                    <th>1</th>
                                    <td>For every 2 clearances, blocks and interceptions (total)</td>
                                </tr>
                                {/* row 13 */}
                                <tr>
                                    <th>1</th>
                                    <td>For every 3 recoveries</td>
                                </tr>
                                {/* row 14 */}
                                <tr>
                                    <th>1</th>
                                    <td>Key pass</td>
                                </tr>
                                {/* row 15 */}
                                <tr>
                                    <th>2</th>
                                    <td>Successful tackle (net*)</td>
                                </tr>
                                {/* row 16 */}
                                <tr>
                                    <th>1</th>
                                    <td>Successful dribble</td>
                                </tr>
                                {/* row 17 */}
                                <tr>
                                    <th>3</th>
                                    <td>Scoring the goal that wins a match</td>
                                </tr>
                                {/* row 18 */}
                                <tr>
                                    <th>2</th>
                                    <td>70 to 79% pass completion (at least 30 passes attempted)</td>
                                </tr>
                                {/* row 19 */}
                                <tr>
                                    <th>4</th>
                                    <td>80 to 89% pass completion (at least 30 passes attempted)</td>
                                </tr>
                                {/* row 20 */}
                                <tr>
                                    <th>6</th>
                                    <td>90%+ pass completion (at least 30 passes attempted)</td>
                                </tr>
                                {/* row 21 */}
                                <tr>
                                    <th>-3</th>
                                    <td>Conceding a penalty</td>
                                </tr>
                                {/* row 22 */}
                                <tr>
                                    <th>-6</th>
                                    <td>Missing a penalty</td>
                                </tr>
                                {/* row 23 */}
                                <tr>
                                    <th>-3</th>
                                    <td>Yellow card</td>
                                </tr>
                                {/* row 24 */}
                                <tr>
                                    <th>-9</th>
                                    <td>Red card</td>
                                </tr>
                                {/* row 25 */}
                                <tr>
                                    <th>-6</th>
                                    <td>Own goal</td>
                                </tr>
                                {/* row 26 */}
                                <tr>
                                    <th>-3</th>
                                    <td>Missing a big chance</td>
                                </tr>
                                {/* row 27 */}
                                <tr>
                                    <th>-3</th>
                                    <td>Making an error which leads to a goal</td>
                                </tr>
                                {/* row 28 */}
                                <tr>
                                    <th>-1</th>
                                    <td>Making an error which leads to an attempt at goal</td>
                                </tr>
                                {/* row 29 */}
                                <tr>
                                    <th>-1</th>
                                    <td>Being tackled</td>
                                </tr>
                                {/* row 30 */}
                                <tr>
                                    <th>-1</th>
                                    <td>Conceding a foul</td>
                                </tr>
                                {/* row 31 */}
                                <tr>
                                    <th>-1</th>
                                    <td>Being caught offside</td>
                                </tr>
                                {/* row 32 */}
                                <tr>
                                    <th>-1</th>
                                    <td>Shot off target</td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* Grid 
            <div className="grid gap-4 mt-4 grid-cols-2 grid-rows-1">

                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 ml-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>

                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 mr-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>
            </div>

            */}



        </div>
    )


}

