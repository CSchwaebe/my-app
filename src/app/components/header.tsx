'use client';

// Imports
// ========================================================
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Coins from './coins';


// Page
// ========================================================
export default function Header() {
    // State / Props


    // Render
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white-100 pr-6 py-2">
            <a href="/">
                <div className="flex items-center flex-shrink-0 text-purple-700 mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1"
                        x="0px" y="0px" viewBox="0 0 600 450"
                        width="90px" height="67.5px">
                        <path fill="#38003c" d="M214,75.4c15.5,7.3,25.8,16.2,27.6,17.6c-0.7-4.1-3.9-23.5-5.9-35.4c8.9,6.2,30.4,21,37.2,25.8
	c2.7-8.7,12.8-37.2,12.8-37.2s17.8,28.6,20.6,33.4c3.9-3.7,24.9-27.4,30.4-33.4c1.1,13.5,2.1,33.1,2.5,35.9
	c1.1-1.4,9.4-12.8,22.8-23.5c-5.9,11.7-8.7,27.6-10.1,40.7c-13.5-3.9-27.6-5.9-42-5.9c-27.9,0-54.4,7.3-77.2,20.3
	C228.8,101,222.6,85.4,214,75.4z M428.3,320.7L415.9,307c-3.4,36.8-21.7,68.3-54.8,90.2l-5.3-19.9c-28.3,20.3-76.5,33.4-118.1,10.1
	c5.3-26.3,9.6-53,0-85c-23.1,35.4-43.4,49.6-43.4,49.6c-15.5-26.3-14.2-78.6-9.6-94.1l-25.8,8c0-17.6,12.8-54.8,31.1-75.8l-15.8-2.5
	c11-22.4,27.2-41.6,47.5-56.4c-6.2,10.1-6.2,33.4,11.4,42.3c-7.5-13-8.2-29.2-0.7-37.9c8-8.7,21-5.5,29.2,1.1
	c-2.5-7.3-10.1-16.4-20.6-17.1c20.6-10.7,44.5-16.4,69.2-16.4c4.8,0,9.4,0.5,13.7,0.7c7.3,2.7,17.8,13,22.8,19.6
	c0,0,0.5-7.5-3.9-16.4c27,6.6,40,17.6,45.2,22.8c1.1,11.7,4.6,18.5,9.4,29.7c-8.7-9.6-30.6-25.6-41.4-29.2c0,0-1.1,10.1-4.6,14.8
	c-21-15.1-31.1-19-31.1-19c-23.3,2.3-37.7,11.4-45.9,18.3l6.9,5.9c-13.7,4.1-22.8,16.2-22.8,16.2c0,0.5,12.3,2.1,12.3,2.1
	s-1.4,14.4,16.9,23.5c15.5,7.5,37.5-1.8,58.5,6.6c-13.7-15.8-23.1-23.1-23.1-23.1s-5.5-1.1-9.4-1.1c-4.8,0-12.1,1.1-19.6-2.1
	c-3.9-1.4-8.2-4.1-11.4-6.2c0,0,9.6-10.1,23.8-12.1c0,0,12.8,3.4,22.8,11c6.6-6.6,13.7-6.2,13.7-6.2s-6.9,6.6-4.8,14.2
	c10.1,8.9,21,21.7,21,21.7c11-6.2,35.2-4.8,40.2,1.1c-6.2-8.2-15.5-14.8-22.4-20.6c-0.7-3.2-8.7-13.7-9.6-14.8c0,0,7.3,2.5,13.7,8
	c1.8-2.7,5.5-5.5,10.1-6.6c4.8,4.1,5.9,10.3,5.5,11.4c-2.1,2.7-4.6,3.9-4.6,3.9L404,190l1.1-9.4
	C432.4,219.3,447.2,264.3,428.3,320.7z M377.1,237.3v-19.9c0,0-8.9-2.7-18.5-10.3c-19.2,2.7-42.3,22.2-42.3,22.2s8,14.8,16.4,31.1
	C347.8,262,370.2,243.3,377.1,237.3z M396.3,273.4c0,0-1.4-8.2-8.2-15.8l-14.8,0.5c0,0-20.3,17.1-32.4,17.6c0,0,6.9,12.8,10.3,19.2
	c6.9-1.4,18.5-6.9,23.5-12.3c0,0,3.2,10.3,2.5,22.4C383.9,300.6,393.3,290.1,396.3,273.4z M402.4,207.6
	c-7.5,6.2-13.7,10.1-13.7,10.1v19.9c5.5,5.9,10.7,11,14.8,19.9C411.1,244.2,409.3,224.3,402.4,207.6z"/>
                    </svg>
                    <span className="font-semibold text-xl tracking-tight">Fantasy Prem</span>
                </div>
            </a>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-purple-700 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="/marketplace" className="
                    block mt-4 lg:inline-block 
                    lg:mt-0 text-purple-700 hover:text-red-400 mr-4">
                        Marketplace
                    </a>
                    <a href="/team" className="block mt-4 lg:inline-block lg:mt-0 text-purple-700 hover:text-red-400 mr-4">
                        Team
                    </a>
                    <a href="/leaderboard" className="block mt-4 lg:inline-block lg:mt-0 text-purple-700 hover:text-red-400 mr-4">
                        Leaderboard
                    </a>
                    {/*
                    
                    <a href="/faq" className="block mt-4 lg:inline-block lg:mt-0 text-purple-700 hover:text-red-400 mr-4">
                        FAQ
                    </a>
    */}
                    <Coins />
                </div>
                <div>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
};