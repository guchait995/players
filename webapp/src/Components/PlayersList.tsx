import React, { useState, useEffect } from "react";
import Axios from "axios";
import Player from "./Player";
import IPlayer from "../Models/Player";
import { playerServices } from "../services";
import Loading from "./Loading";
export default function PlayersList() {
  const [players, setPlayers] = useState<IPlayer[] | null>(null);
  useEffect(() => {
    fetchAll();
  }, []);
  async function fetchAll() {
    const playerList = await playerServices.getAllPlayers({
      order_by: { name: "score", order: "desc" },
      limit: 3
    });
    setPlayers(playerList);
  }
  return players ? (
    <div className="card">
      <div className="is-size-4">Players List</div>
      <hr />
      <div className="columns">
        <div className="column is-3 is-size-5">Name</div>
        <div className="column is-4 is-size-5">Email</div>
        <div className="column is-2 is-size-5">Score</div>
        <div className="column is-1">{""}</div>
        <div className="column is-1">{""}</div>
        <div className="column is-1">{""}</div>
      </div>
      <div>
        {players.map((player, index) => {
          return <Player player={player} key={index} />;
        })}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
