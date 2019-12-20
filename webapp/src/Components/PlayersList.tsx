import React, { useState, useEffect } from "react";
import Axios from "axios";
import Player from "./Player";
import IPlayer from "../Models/Player";
import { playerServices } from "../services";
import Loading from "./Loading";
export default function PlayersList() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchAll();
  }, []);
  async function addPlayer() {
    let player: IPlayer = { id: null, data: { name: "", email: "", score: 0 } };
    setPlayers([...players, player]);
  }
  async function fetchAll() {
    setLoading(true);
    const playerList = await playerServices.getAllPlayers({
      order_by: { name: "score", order: "desc" }
    }
    );
    setPlayers(playerList);
    setLoading(false);
  }
  return !loading ? (
    <div className="card">
      <div>
        <div className="is-size-4 is-centered">Players List</div>
        <div
          className="button is-primary is-pulled-right mr-1"
          onClick={addPlayer}
        >
          Add Member
        </div>
      </div>
      <br />
      <hr />
      <div className="columns">
        <div className="column is-3 is-size-5">Name</div>
        <div className="column is-3 is-size-5">Email</div>
        <div className="column is-2 is-size-5">Score</div>
        <div className="column is-1">{""}</div>
        <div className="column is-1">{""}</div>
        <div className="column is-1">{""}</div>
        <div className="column is-1">{""}</div>
      </div>
      <div>
        {players.map((player, index) => {
          return (
            <Player
              player={player}
              key={index}
              fetchAll={fetchAll}
              filterPlayerList={id =>{
                console.log(id);
                setPlayers([...players].filter(p => p.id !== id))
              }
                
              }
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
