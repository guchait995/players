import React, { useState, useEffect } from "react";
import IPlayer from "../Models/Player";
import { updatePlayer, deletePlayer } from "../services/player.services";

export default function Player(props) {
  const player: IPlayer = props.player;
  const { data,id } = player;
  const [playerDetails, setPlayerDetails] = useState(data);
  const [editable, setEditable] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  useEffect(() => {
    if (!data.name.length && !data.email.length) {
      setEditable(true);
    }
  }, []);
  const increaseScore = () => {
    let score: number = parseInt(data.score.toString()) + 1;
    player.data.score = score;
    setPlayerDetails({ ...player.data });
    // updatePlayer(player);
    // setEditable(true);
    setScoreUpdated(true);
  };
  const decreaseScore = () => {
    let score: number = parseInt(data.score.toString()) - 1;
    player.data.score = score;
    setPlayerDetails({ ...player.data });
    // updatePlayer(player);
    // setEditable(true);
    setScoreUpdated(true);
  };
  const savePlayer = async () => {
    if (editable || scoreUpdated) {
      let res = await updatePlayer(player);
      console.log(res);
      setEditable(false);
      setScoreUpdated(false);
      props.fetchAll();
    }
  };
  const deletePlayerDetails = async() => {
    let res:any=await deletePlayer(id);
        props.fetchAll();
    
    // props.filterPlayerList(id);
  };
  return (
    <div className="columns">
      {editable ? (
        <input
          className="input mr-1 ml-1"
          type="text"
          placeholder="Name"
          value={playerDetails.name}
          onChange={e => {
            player.data.name = e.currentTarget.value;
            setPlayerDetails({ ...player.data });
          }}
        />
      ) : (
        <div className="column is-3">{playerDetails.name}</div>
      )}
      {editable ? (
        <input
          className="input mr-1 ml-1"
          type="text"
          placeholder="Email"
          value={playerDetails.email}
          onChange={e => {
            player.data.email = e.currentTarget.value;
            setPlayerDetails({ ...player.data });
          }}
        />
      ) : (
        <div className="column is-3">{playerDetails.email}</div>
      )}
      <div className="column is-2">{playerDetails.score}</div>
      <div className="column is-1">
        <div className="button is-primary is-size-6" onClick={increaseScore}>
          +
        </div>
      </div>
      <div className="column is-1">
        <div className="button is-primary  is-size-6" onClick={decreaseScore}>
          -
        </div>
      </div>
      <div className="column is-1">
        <div
          className={
            editable || scoreUpdated ? "button is-warning" : "button is-info"
          }
          onClick={
            editable || scoreUpdated ? savePlayer : () => setEditable(true)
          }
        >
          {editable || scoreUpdated ? "Save" : "Edit"}
        </div>
      </div>
      <div className="column is-1 ">
        <div className="button is-danger" onClick={deletePlayerDetails}>
          Delete
        </div>
      </div>
    </div>
  );
}
