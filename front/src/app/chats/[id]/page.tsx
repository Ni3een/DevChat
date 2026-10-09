import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { fetchChats } from "@/fetch/chatsFetch";
import { notFound } from "next/navigation";
import React from "react";

export default async function chat({ params }: { params: { id: string } }){
    if(params.id.length!=36){
        return notFound();
    }
    const group:ChatGroupType | null=await fetchChatGroup(params.id)
    if(group===null){
        return notFound();
    }
    const users:Array<GroupChatUserType> | []=await fetchChatGroupUsers(params.id)
    const chats:Array<MessageType> | []=await fetchChats(params.id)
    return(
        <div>
            <ChatBase users={users} group={group} oldMessages={chats} />
        </div>
    )
}
  