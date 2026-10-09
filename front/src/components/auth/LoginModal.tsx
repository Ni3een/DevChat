"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LoginModal() {
  const handleLogin=()=>{
    signIn("google",{
      callbackUrl:"/dashboard",
      riderect:true
    })
  }
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Getting Started
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Welcome to DevChat
          </DialogTitle>

          <DialogDescription>
            DevChat is a platform that allows you to create and share chat
            links for seamless conversations. Please sign in to continue.
          </DialogDescription>
        </DialogHeader>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogin}
        >
          <Image
            src="/images/google.png"
            className="mr-4"
            width={25}
            height={25}
            alt="google_logo"
          />
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}