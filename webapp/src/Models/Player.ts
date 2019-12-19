interface IPlayer {
  id: string | null;
  data: {
    name: string;
    email: string;
    score: number;
  };
}
export default IPlayer;
