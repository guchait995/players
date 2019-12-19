import React from 'react'

export default function Player(props) {
    const{player}=props;
    const id=player.id;
    
    const {data}=player;
    console.log(player);
    console.log(data);
    return (
        <div>
             <div className="column is-2">{data.name}</div>
             <div className="column is-2">{data.email}</div>
             <div className="column is-2">{data.score}</div>
             <div className="column is-2">{'>'}</div>
             <div className="column is-2">{'<'}</div>
             <div className="column is-2">{'Edit'}</div> 
        </div>
    )
}
