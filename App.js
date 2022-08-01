import './App.css';
import DisplayCards from './DisplayCards';
import { useEffect, useState } from 'react';
import PlayAgain from './PlayAgain';

function App() 
{
  const Card = function(value, location) 
  {
      this.value = value;
      this.visability = 'closed';
      this.location = location;

      this.setLocation = function(location)
      {
        this.location = location;
      };

      this.flipCard = function()
      {
        if(this.visability === 'open')
        {
          this.visability = 'closed';
        }
        else
        {
          this.visability = 'open';
        }
      };

      this.removeCard = function()
      {
        if(this.visability === 'open')
        {
          this.visability = 'invisable';
        }
      };
  };

  const betterMap = (arr) =>
  {
    const output = [];
    for (let i = 0; i < 16; i++) 
    {
      output.push(new Card(arr[i], i));    
    }  
    return output;
  };

  const [cards, setCards] = useState(betterMap(utils.randomArr()));
  const [faceUpCards, setFaceUpCards] = useState([]);
  console.log(cards[3].visability);

  useEffect(() =>
  {
    console.log("rerendered");
  }
  )

  const flipCard = (location) =>
  {
    if(cards[location].visability === 'closed' && faceUpCards.length < 2)
    {
      let newCards = cards.map((card) => card);
      newCards[location].flipCard();
      const newFaceUpCards = faceUpCards.concat(newCards[location].value);
      //console.log(newFaceUpCards);
      setFaceUpCards(newFaceUpCards);
      setCards(newCards);

      if(newFaceUpCards.length === 2)
      {
        if(newFaceUpCards[0] !== newFaceUpCards[1])
        {
          //console.log("unmatch");
          const timerId = setTimeout(() => 
          {
            setFaceUpCards([]);
            const closedCards = utils.closeAllCards(cards);
            //console.log(closedCards);
            setCards(closedCards);
          }, 1000);
          return () => clearTimeout(timerId);
        }
        else
        {
          const timerId = setTimeout(() => 
          {
            //console.log("match");
            newCards = newCards.map((card) => card);
            for (let i = 0; i < newCards.length; i++) 
            {
              newCards[i].removeCard();
              newCards[i].setLocation(i);
            }
            setFaceUpCards([]);
            setCards(newCards);
          }, 1000);
        }
      }
    }
  }

  const playAgain = () =>
  {
    setCards(betterMap(utils.randomArr()));
    setFaceUpCards([]);
  }

  const howManyOpened = (cards) =>
  {
    let counter = 0;
    for (let i = 0; i < cards.length; i++) 
    {
      if(cards[i].visability !== 'invisable')
      {
        counter++;
      }  
    }
    return counter;
  }

  return(
    <div>
      <DisplayCards onClick={flipCard} cards={cards}/>
      {howManyOpened(cards) === 0 ? (<PlayAgain onClick={playAgain}></PlayAgain>) : <></>}
    </div>
  )
}

let utils = 
{
  randomArr: () =>
  {
    const arr = [];
    for (let i = 1; i < 9; i++) 
    {
      arr.push(i);
      arr.push(i);
    }
    const output = [];
    while(arr.length > 0)
    {
      let arrPosition = Math.floor(Math.random() * arr.length);
      output.push(arr.splice(arrPosition, 1)[0]);
    }
    return output;
  },

  closeAllCards: (cardsArr) =>
  {
    return cardsArr.map((card) => 
    {
      if(card.visability === 'open')
      {
        const flippedCard = card;
        flippedCard.flipCard();
        return flippedCard;
      }
      return card;
    }
    );
  }
} 

export default App;