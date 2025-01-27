/* React component that will be shown for the cover block */

import React from 'react';

export default function CoverBlockServer({title, subtitle}) {
    return(
        <div className='max-w-5xl py-20'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='text-xl'>{subtitle}</p>
        </div>
    );
}