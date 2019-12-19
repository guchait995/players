import React, {  useState, useEffect } from 'react'
import axios from 'axios'
import Player from '../Components/Player';

export default function Main(props) {
    const [players,setPlayers]=useState([]);
    useEffect(()=>{
        fetchAll();
    },[])
    async function fetchAll(){
      let data=await axios.post('https://us-central1-testapp-5b163.cloudfunctions.net/getPlayers',
      {"order_by":{"name":"score","order":"desc"},"limit":3});
      console.log(data.data);
        setPlayers(data.data);
    }
    return (
        <div>
            <h1>Players List</h1>
            <hr/>
            <div className="columns">
            {players.map((player,index)=>{
                return <Player player={player} key={index}/>   
            })}
            </div>
        </div>
    )
}
