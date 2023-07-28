// Imports
// ========================================================
import React from 'react';
import Header from './components/header';
import Container from './components/mainContainer';

// Page
// ========================================================
export default function Home() {
  // Render
  return (
    <div>
      <div className="hero pt-48">
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

          <img src="https://res.cloudinary.com/bigkatoriginal/image/upload/a_352/v1690566043/og_2-removebg-preview_2.webp"
            className="w-1/3 rounded-lg opacity-100" />


        </div>
      </div>

      <div className="hero pt-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://res.cloudinary.com/bigkatoriginal/image/upload/v1690506285/coff33blak_minimalistic_coin_logo_with_the_letters_FPC_5fb2f6a6-0711-4a7d-b75d-ea6bed41f456_2.webp"
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

      <div className="hero pt-24">
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

              <h1 className="text-5xl font-bold text-white-100 text-center">What's next?</h1>
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






    </div>

  );
};