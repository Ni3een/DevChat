import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import React from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default function UserAvatar({name, image}:{name:string, image?:string}) {
    return (
        <Avatar>
            <AvatarImage src={image} alt="User Avatar" />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
    )
}