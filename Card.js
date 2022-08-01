import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function Card(props)
{
    if(props.visability === 'open')
    {
        return(
            <div className='card-outline'>
                <button className='open-card' onClick={() => props.onClick(props.location)}>
                    {props.value}
                </button>
            </div>
        );
    }
    if(props.visability === 'closed')
    {
        return(
            <div className='card-outline'>
                <button className='closed-card' onClick={() => props.onClick(props.location)}>
                </button>
            </div>
        );
    }
    return(
        <div className='card-outline'>
            <button className='invisable-card'>
            </button>
        </div>
    );

    
}

export default Card;