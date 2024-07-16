import { SenderType } from "@/app/enums/sender.type";
import { IChat } from "@/app/models/chat.interface";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Attachment from "../attachment";

type InputBoxPropsType ={
    sendMessage: (message: IChat)=> void
    selectedFile: File | undefined
    setSelectedFile: Dispatch<SetStateAction<File | undefined>>
    uploadFile: (file: File) => Promise<boolean | AxiosResponse<any, any>>
}

export default function InputBox(props: InputBoxPropsType){
    const { sendMessage, setSelectedFile, selectedFile, uploadFile } = props
    const [userInput, setUserInput] = useState<string>('')
    const elementRef = useRef<HTMLInputElement>(null);
    
    async function handleKeyDown(event: any){
        if (event.key === 'Enter' && userInput.length > 0) {
            const isFileUploaded = await uploadFile(selectedFile as File)
            sendMessage({
                senderType: SenderType.User, 
                message: userInput, 
                fileUri: isFileUploaded ? `${getFileUri(selectedFile?.name ?? '') }` : '' 
            })
            resetState()
        }
    }

    function onFileButtonClick() {
        if(elementRef.current)
            elementRef?.current.click();
    };

    function onChangeFile(event:  ChangeEvent<HTMLInputElement>) {
        event.stopPropagation();
        event.preventDefault();
        if(event?.target?.files){
            const file = event?.target?.files[0] as File ?? undefined;
            setSelectedFile(file);
        } 
    }

    function resetState(){
        setUserInput('')
        setSelectedFile(undefined)
    }

    function getFileUri(fileName: string){
       return `gs://synsugar-chatbot-storage/${fileName.replaceAll(' ','-').toLowerCase()}`
    }

    return(
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
            <input 
                type="text" 
                placeholder="Say something..." 
                onChange={(event) => setUserInput(event?.target?.value ?? '')}
                onKeyDown={handleKeyDown}
                autoComplete="off" 
                autoFocus={true}
                value={userInput}
                className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2" 
            />
            <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                {selectedFile && <Attachment file={selectedFile} deleteAttachment= {()=> setSelectedFile(undefined)}/>}
                <button
                    onClick={() => onFileButtonClick()}
                    className={'inline-flex mr-2 items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white  focus:outline-none bg-yellow-400 hover:bg-yellow-500'}
                >
                    <Image src='/images/file.png' height={24} width={24} alt="file upload"/>
                </button>
                <button
                    onClick={async ()=> {
                        const isFileUploaded = await uploadFile(selectedFile as File)
                        sendMessage({
                            senderType: SenderType.User, 
                            message: userInput, 
                            fileUri: isFileUploaded ? `${getFileUri(selectedFile?.name ?? '') }` : '' 
                        })
                        resetState()
                    }}
                    disabled= {userInput.length === 0}
                    className={[userInput.length === 0 ? 'bg-gray-400 cursor-not-allowed': 'bg-blue-500 hover:bg-blue-60 cursor-pointer', 'inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white  focus:outline-none'].join(' ')}
                    >
                    <Image src='/images/right-arrow.png' height={26} width={26} alt="left-arrow"/>
                </button>
            </div>
        </div>
        <input 
            type='file' 
            id='file' 
            ref={elementRef} 
            className="hidden" 
            accept=".pdf" 
            onChange={(event) => onChangeFile(event)}
        />
    </div>
    )
}