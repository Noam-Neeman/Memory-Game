import React from 'react';
import Card from './Card';

function DisplayCards(props)
{
    return(
        <div className='board'>
            {props.cards.map((card) =>  (
            <Card
            key={card.location} 
            onClick={props.onClick} 
            visability={card.visability}
            value={card.value}
            location={card.location}/>
            ))}
        </div>
    );
}

export default DisplayCards;