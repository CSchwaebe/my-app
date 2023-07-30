'use client';

// Imports
// ========================================================
import React from 'react';

// Page
// ========================================================
export default function loading() {
    // State / Props


    // Render
    return (
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




    );
};

