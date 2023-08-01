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
            <div className="card w-full glass bg-none">
                {/* Title */}
                <div className="rounded overflow-hidden shadow-xl">
                    <h1 className="text-center text-3xl font-bold  text-white-100 p-4">Faq</h1>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 grid-rows-3">

                {/* Row 1 */}
                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 ml-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">Ok I'm still confused, how do I use this?</h3>
                    <p className="text-justify text-base font-bold  text-white-100 p-4">
                        {"1. Connect your wallet in thr top right. We're on arbitrum so make sure you have some ETH on arbitrum (~0.03 ETH). If you need help getting your ETH to Arbitrum go to"} <a className="underline decoration-solid" target="_blank" href="https://stargate.finance/transfer">Stargate</a><br></br>  
                        {"2."}                       
                    </p>
                </div>


                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 mr-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>

                {/* Row 2 */}
                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 ml-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>


                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 mr-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>

                {/* Row 3 */}
                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 ml-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>


                <div className="glass bg-none col-span-1 row-span-1 p-4 m-4 mr-0 rounded">
                    <h3 className="text-center text-2xl font-bold  text-white-100 p-4">What is Fantasy Prem?</h3>
                    <p className="text-center text-xl font-bold  text-white-100 p-4">Fantasy Prem is a fantasy football game built on the Ethereum blockchain. It is a game of skill, not chance, and is based on the real-life performance of Premier League players.</p>
                </div>

            </div>

        </div>
    )


}

