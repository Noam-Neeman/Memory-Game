import React from "react";

function PlayAgain(props)
{
    return(
        <button className="play-again" onClick={props.onClick}>Play Again</button>
    );
}

export default PlayAgain;