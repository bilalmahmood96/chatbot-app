import { SenderType } from "@/app/enums/sender.type";
import { IChat } from "@/app/models/chat.interface";
import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export default function InputBox(props: {sendMessage: (message: IChat)=> void}){
    const { sendMessage } = props
    
    function handleKeyDown(event: any){
        if (event.key === 'Enter') {
            sendMessage({senderType: SenderType.User, message: event?.target?.value ?? ''})
        }
    }

    return(
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
            <input 
                type="text" 
                placeholder="Say something..." 
                onKeyDown={handleKeyDown}
                autoComplete="off" autoFocus={true}
                className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2" 
            />
            <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                <button 
                    type="button" 
                    className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none" 
                    >
                    <i className="mdi mdi-arrow-right text-xl leading-none"></i>
                </button>
            </div>
        </div>
    </div>
    )
}