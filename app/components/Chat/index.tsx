'use client'

import { SenderType } from "@/app/enums/sender.type";
import Message from "./message";
import InputBox from "./inputBox";
import { useEffect, useState } from "react";
import { IChat } from "@/app/models/chat.interface";
import axios from "axios";
import { handler } from "@/app/services/chatbot";
import { error } from "console";

export default function Chat(){
    const [chat, setChat] = useState<IChat[]>([])
    const [userMessage, setuserMessage] = useState('')
    
    function updateChat(data: IChat){
        const updatedChat = [...chat, data]
        setChat(updatedChat)
    }
    async function fetchBotResponse(userMessage: string){
        const response = await axios.post("/api/chatbot",{data: userMessage});
        return response
    }

    function extractResponse(response: any){
        const candidates = response.data.candidates
        const botPart = candidates[0]?.content.parts[0].text
        return botPart
    }

    useEffect(()=>{
        const lastMessage = chat[chat.length - 1]
        if(lastMessage?.senderType === SenderType.User){
            fetchBotResponse(lastMessage.message).then(result => {
                const response = extractResponse(result)
                updateChat({senderType: SenderType.Bot, message: response})
            })
            
        }
            
    },[chat])
    
    return(
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-white">
            <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <Message messageFrom={SenderType.Bot} message="Hello"/>
                {chat.map((content,index) =>
                        <Message 
                            messageFrom={content.senderType} 
                            message={content.message} 
                            key={index+content.senderType+content.message.slice(0,8)}
                        />
                )}
            </div>
            <InputBox sendMessage={updateChat}/>
        </div>
        

    )



}