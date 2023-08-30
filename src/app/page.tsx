// Imports
// ========================================================
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import Coins from "./components/coins";

const cld = new Cloudinary({
  cloud: {
    cloudName: "bigkatoriginal",
  },
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
          <div className="glass bg-none bg-black bg-opacity-50 p-6 rounded">
            <h1 className="text-5xl font-bold">Fantasy Premier League</h1>
            <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
              Step into the dynamic world of Fantasy Prem on Base, where your
              15-player squad is comprised of unique NFTs. Engage in
              exhilarating football management, strategize for weekly prizes,
              and revel in a unique blend of digital ownership and sporting
              excitement. Welcome to a next-level football experience.
            </p>
          </div>

          <img
            src="https://res.cloudinary.com/bigkatoriginal/image/upload/a_352/v1690566043/og_2-removebg-preview_2.webp"
            alt="Background Image"
            className="w-1/3 rounded-lg opacity-100"
          />
        </div>
      </div>

      <div className="hero pt-24">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://res.cloudinary.com/bigkatoriginal/image/upload/v1690506285/coff33blak_minimalistic_coin_logo_with_the_letters_FPC_5fb2f6a6-0711-4a7d-b75d-ea6bed41f456_2.webp"
            alt="Coin Image"
            className="w-1/3 rounded-lg"
          />
          <div className="glass bg-none bg-black bg-opacity-50 p-4 rounded">
            <h1 className="text-5xl font-bold text-white-100">
              Introducing FPC
            </h1>
            <ul className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg list-none">
              <li className="">
                <span className="italic text-white-300">Supply:</span> 1,000,000
                FPC
              </li>
              <li className="ml-8 list-disc">
                <span className="italic text-white-300">Distribution:</span>{" "}
                95% seeded as liquidity on BaseSwap, 5% for team. No presale.
              </li>

              <li className="">
                <span className="italic text-white-300">Transaction Tax:</span>{" "}
                {"A 6% tax on each transaction."}{" "}
                <span className="italic text-white-100">
                  {"*No tax on purchasing NFTs"}
                </span>
              </li>
              <li className="ml-8 list-disc">
                <span className="italic text-white-300">LP Tokens:</span> 3% is
                returned to FPC holders as LP tokens on BaseSwap.
              </li>

              <li className="ml-8 list-disc">
                <span className="italic text-white-300">Prize Pool: </span>{"2% is added to the weekly prize pool for that gameweek's winners."}
              </li>
              <li className="ml-8 list-disc">
                <span className="italic text-white-300">Development: </span> 1%
                is reserved for ongoing platform development.
              </li>

              <li>
                <span className="italic text-white-300">Player NFTs: </span>
                Use FPC to build your dream team
              </li>
              <li className="ml-8 list-disc">
                Mint player NFTs in the Marketplace with FPC
              </li>
              <li className="ml-8 list-disc">FPC is burned on use</li>
            </ul>

            <Coins />
          </div>
        </div>
      </div>

      <div className="hero pt-24 pb-16">
        <div className="hero-content text-justify">
          <div className="inline-block float-left glass bg-none bg-black bg-opacity-50 p-4 rounded ">
            <h1 className="text-5xl font-bold text-white-100 text-center">
              How does it work?
            </h1>
            <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
              Connect your wallet, buy FPC via the teal button, and immerse
              yourself in the game. Purchase players in the marketplace, then
              craft your weekly squad in the team tab. Balance your team size
              and value, with up to 15 players and a 1000 FPC limit. Opt for
              fewer high-value stars or more cost-effective players—the
              strategic thrill of Fantasy Premier League is yours to enjoy!
            </p>
          </div>

          <div className="inline-block float-right glass bg-none bg-black bg-opacity-50 p-4 rounded ">
            <h1 className="text-5xl font-bold text-white-100 text-center">
              {"What's next?"}
            </h1>
            <p className="text-white-200 p-0 my-6 antialiased tracking-wide text-lg">
              We will open LP claims within the first week and the first major upgrade will be a 
              revamped Marketplace with a new UI and more features like advanced player data and filtering. 
              We will also be updating the art of the player NFTs to be more unique and dynamic.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
