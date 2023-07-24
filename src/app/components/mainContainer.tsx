'use client';

// Imports
// ========================================================
import React from 'react';
import bg from '../assets/mesh-943.png'
//import bg from '../assets/image-2h9w6mdc.png'


// Provider
// ========================================================
const Container = ({ children } : { children: React.ReactNode }) => {
    return <div className="w-1/1 min-h-screen bg-white-100" style={{
        backgroundImage: `url(${bg.src})`,
        width: '100%',
        height: '100%',
      }}>
            {children}            
        </div>
};

// Exports
// ========================================================
export default Container;
