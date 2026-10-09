"use client"
import { useState } from "react"
import { getSocket } from "@/lib/socket.config"
import React,{useEffect,useMemo} from "react"
import {Button} from "@/components/ui/button"
import {v4 as uuidV4} from "uuid"
import ChatSidebar from "./ChatSidebar"
import ChatUserDialog from "./ChatUserDialog"
import ChatNav from "./ChatNav"
import Chats from "./Chats"
import { set } from "zod"
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types";
export default function ChatBase({group,users,oldMessages}:{group:ChatGroupType,users:Array<GroupChatUserType> | [],oldMessages:Array<MessageType> | []}){

   const [open,setOpen]=useState(true);
   const [chatUser,setChatUser]=useState<GroupChatUserType>()

   useEffect(()=>{
    const data=localStorage.getItem(group.id);
    if(data){
        const pData=JSON.parse(data)
        setChatUser(pData)
    }
   },[group.id])

    return (
       <div className="flex">
        <ChatSidebar users={users}/>
        <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group}/> :
        <ChatNav chatGroup={group} users={users}/>
        }
        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages}/>
        </div>
       </div>
    )
}