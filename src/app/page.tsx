// Imports
// ========================================================
import React from 'react';
import { AdvancedImage, placeholder } from '@cloudinary/react';
import Image from 'next/image';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: 'bigkatoriginal'
  }
});

// Page
// ========================================================
export default function Home() {


  // https://res.cloudinary.com/bigkatoriginal/image/upload/v1690500548/coff33blak_dark_black_and_purple_repeating_texture_soccer_116378ad-7e53-407c-b2be-7e375bdbf176-transformed_1.png
  // Render
  return (
    <div>
      <div className="hero pt-32">
        <div className="hero-content flex-col lg:flex-row-reverse text-base-100">


          <div className="bg-opacity-80 bg-black p-4 rounded">
            <h1 className="text-5xl font-bold">Fantasy Premier League</h1>
            <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
              Step into the dynamic world of Fantasy Prem on Arbitrum, where your
              15-player squad is comprised of unique NFTs.
              Engage in exhilarating football management, strategize for weekly prizes, and
              revel in a unique blend of digital ownership and sporting excitement.
              Welcome to a next-level football experience.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>


          <img src="https://res.cloudinary.com/bigkatoriginal/image/upload/a_352/v1690566043/og_2-removebg-preview_2.webp" alt="Background Image"
            className="w-1/3 rounded-lg opacity-100" />


        </div>
      </div>

      <div className="hero pt-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://res.cloudinary.com/bigkatoriginal/image/upload/v1690506285/coff33blak_minimalistic_coin_logo_with_the_letters_FPC_5fb2f6a6-0711-4a7d-b75d-ea6bed41f456_2.webp"
            alt="Coin Image"
            className="w-1/3 rounded-lg" />
          <div className="bg-opacity-80 bg-black p-4 rounded">
            <h1 className="text-5xl font-bold text-white-100">Introducing FPC</h1>
            <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">


              Unveiling our in-game currency, Fantasy Premier Coin (FPC). This finite digital asset,
              with a capped supply of 10,000,000 FPC, is your key to acquiring unique player NFTs.
              90% of the supply is available to mint from our website at a rate of 0.000025 ETH per FPC (~$0.05),
              while the remaining 10% will be distributed as weekly prizes. Once used for purchasing player NFTs, they are permanently burned,
              reducing the supply of FPC and increasing the scarcity of your player NFTs.
            </p>

            <button className="btn btn-primary">Get Started</button>
          </div>



        </div>
      </div>

      <div className="hero pt-24 pb-16">
        <div className="hero-content flex-col lg:flex-row-reverse">

          <div className="grid grid-cols-5 text-justify">
            <div className="col-span-2 bg-opacity-80 bg-black p-4 rounded ">
              <h1 className="text-5xl font-bold text-white-100 text-center">How does it work?</h1>
              <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
                Connect your wallet, mint FPC via the purple button, and immerse yourself in the game. Purchase players in the marketplace, then craft your weekly squad in the team tab. Balance your team size and value, with up to 15 players and a 1000 FPC limit. Opt for fewer high-value stars or more cost-effective players—the strategic thrill of Fantasy Premier League is yours to enjoy!
              </p>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-2 bg-opacity-80 bg-black p-4 rounded ">

              <h1 className="text-5xl font-bold text-white-100 text-center">{"What's next?"}</h1>
              <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
                Get ready for adrenaline-pumping Leagues and Head-to-Head match-ups, where you directly
                take on friends and fellow managers in gripping showdowns.
                Wager ETH and seize the chance to win big!
                Plus, all platform-generated fees flow back to FPC holders,
                making every play not just a strategic move, but an opportunity to share
                in the success of Fantasy Prem!


              </p>
            </div>
          </div>




        </div>
      </div>


      <footer className="footer footer-center p-10 glass text-primary-content bg-none">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" 
                        x="0px" y="0px" viewBox="0 0 600 450"
                        width="90px" height="67.5px">
                        <path fill="#ffffff" d="M214,75.4c15.5,7.3,25.8,16.2,27.6,17.6c-0.7-4.1-3.9-23.5-5.9-35.4c8.9,6.2,30.4,21,37.2,25.8
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
          <p className="font-bold">
            Fantasy Prem XYZ <br />Bringing games to Arbitrum since 2023
          </p>
          
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com/fantasyprem_xyz"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
          </div>
        </div>
      </footer>






    </div>

  );
};