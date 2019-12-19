import IPlayer from "../Models/Player";
import Axios from "axios";

const updatePlayer = async (player: IPlayer) => {
  await Axios.post(
    "https://us-central1-testapp-5b163.cloudfunctions.net/updatePlayer",
    { id: player.id, player: player.data }
  );
};
const getAllPlayers = async options => {
  let data = await Axios.post(
    "https://us-central1-testapp-5b163.cloudfunctions.net/getPlayers",
    options
  );
  const playerList: IPlayer[] = data.data;
  return playerList;
};
export { updatePlayer, getAllPlayers };
