'use client';

// Imports
// ========================================================
import React from 'react';
//import bg from '../assets/mesh-943.png'
import bg from '../assets/bg1.webp'


// Provider
// ========================================================
const Container = ({ children } : { children: React.ReactNode }) => {
    return <div className="w-1/1 min-h-screen bg-black" style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100%',
        width: '100%',
        height: '100%',
        
      }}>
            {children}            
        </div>
};

// Exports
// ========================================================
export default Container;
