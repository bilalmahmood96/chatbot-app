'use client'

import { SenderType } from "@/app/enums/sender.type";
import Message from "./message";
import InputBox from "./inputBox";
import { useEffect, useRef, useState } from "react";
import { IChat } from "@/app/models/chat.interface";
import axios, { AxiosResponse } from "axios";
import BotTyping from "./botTyping";
import { extractResponse, getChatContent } from "@/app/services/chatbot";

export default function Chat(){
    const [chat, setChat] = useState<IChat[]>([])
    const [selectedFile, setSelectedFile] = useState<File>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        elementRef?.current?.scrollIntoView({ behavior: 'smooth' })
        const lastMessage = chat[chat.length - 1]
        if(lastMessage?.senderType === SenderType.User){
            fetchBotResponse().then(result => {
                const response = extractResponse(result)
                updateChatArray({senderType: SenderType.Bot, message: response})
            })
        }
            
    },[chat])

    useEffect(()=>{
        if(isLoading)
            elementRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, [isLoading])
    
    function updateChatArray(data: IChat){
        const updatedChat = [...chat, data]
        setChat(updatedChat)
    }

    async function fetchBotResponse(){
        setIsLoading(true)
        const generatedContent = getChatContent(chat)

        const response = await axios.post("/api/chatbot",{data: generatedContent})
            .catch((error)=>{
                console.log('error: ',error)
            })
            .finally(()=> setIsLoading(false));
        return response
    }

    async function uploadFile(file: File) : Promise<false | AxiosResponse<any, any>>{
        if(file !== undefined){
            const formData = new FormData();
            formData.append("file", file);
            const fileUpdateResponse = await axios.post("/api/storage", formData, {headers: { "Content-type": "multipart/form-data" }});
            return fileUpdateResponse
        }
        return false
        
    }
 
    return(
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen bg-white">
            <div 
                className="flex flex-col space-y-4 p-3 overflow-y-auto will-change-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <Message messageFrom={SenderType.Bot} message="Hello! How can I help you?"/>
                {chat.map((content,index) => {
                        return(
                            <Message 
                                messageFrom={content.senderType} 
                                message={content.message} 
                                key={index+content.senderType+content.message.slice(0,8)}
                                isFileAttached = {content.fileUri && content?.fileUri?.length > 0 ? true : false}
                            />
                        )
                    }
                         
                )}
                {isLoading && <BotTyping/>}
                <div ref={elementRef} />
            </div>

            <InputBox 
                sendMessage = {updateChatArray}
                setSelectedFile = {setSelectedFile}
                selectedFile = {selectedFile}
                uploadFile = {uploadFile}
            />
        </div>
    )
}