
import {Server,Socket} from "socket.io"
import { produceMessage } from "./helper.js"
interface CustomSocket extends Socket{
    room?:string
}
export function  setupSocket(io:Server){
    io.use((socket:CustomSocket,next)=>{
        const room=socket.handshake.auth.room || socket.handshake.headers.room
        if(!room){
            return next(new Error("Invalid rooom"))
        }
        socket.room=room;
        next();
    })
    io.on("connection",(socket:CustomSocket)=>{ 
        socket.join(socket.room!);
        socket.on("message",async (data)=>{
            console.log("Server side message",data);
          //  socket.broadcast.emit("message",data);
          await produceMessage(process.env.KAFKA_TOPIC!,data);
          socket.to(socket.room!).emit("message",data);
        })
        socket.on("disconnect",()=>{
            console.log("A User is Disconnected",socket.id)
        })
    })
}
  




