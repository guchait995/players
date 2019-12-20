
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors =require ('cors');
const corsHandler = cors({origin: true});
const PLAYER_ADDED=0;
const PLAYER_UPDATED=1;
const PLAYER_DELETED=2;

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

export const getPlayers = functions.https.onRequest(async (request:any, response:any) => {
   try{
      corsHandler(request, response, () => {});
      const {order_by}=request.body;
      const {limit}=request.body;
      const {name}=order_by;
      const {order}=order_by;
      console.log(name,order,limit)
      let playerRef=db.collection('players');
      if(order_by)playerRef=playerRef.orderBy(order_by.name,order_by.order);
      if(limit) playerRef=playerRef.limit(limit)
      playerRef.get().then((snapshot:any)=>{
         const players:any[]=[];
         snapshot.forEach((doc:any)=>{
            if(doc){
               const data=doc.data();
               const id=doc.id;
               players.push({id,data });
            }
            
         });
         console.log(players);
         response.send(players);
      });
      
   }catch(err){
      response.send(err);
   }
});

export const updateOrCreatePlayer = functions.https.onRequest(async (request:any, response:any) => {
  try{
   corsHandler(request, response, () => {});
   const id:any=request.body.id;
   const player:any=request.body.player;
   console.log('id: ',id);
   if(id)  {
   await db.collection('players').doc(id).update(player);
   response.send({'code':PLAYER_UPDATED,'message':'Updated Successfully'});
   }
   else{
   await db.collection('players').add(player);
   response.send({'code':PLAYER_ADDED,'message':'Added Successfully'});
   }
  }catch(err){
   console.log(err);
  }
   
});
export const deletePlayer = functions.https.onRequest(async (request:any, response:any) => {
   try{
      corsHandler(request, response, () => {});
      const id:any=request.body.id;
      await db.collection('players').doc(id).delete();
      response.send({'code':PLAYER_DELETED,'message':'Deleted Successfully'});
   }catch(err){
      console.log(err);
   }
   
});