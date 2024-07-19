
import { SenderType } from "@/app/enums/sender.type";
import { IChat } from "@/app/models/chat.interface";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Attachment from "../attachment";
import { MAX_FILE_SIZE } from "@/app/enums/file.size";


type InputBoxPropsType ={
    sendMessage: (message: IChat)=> void
    selectedFile: File | undefined
    setSelectedFile: Dispatch<SetStateAction<File | undefined>>
    
}

export default function InputBox(props: InputBoxPropsType){
    const { sendMessage, setSelectedFile, selectedFile } = props
    const [userInput, setUserInput] = useState<string>('')
    const [isFileSizeExceed, setIsFileSizeExceed] = useState<boolean>(false)
    const elementRef = useRef<HTMLInputElement>(null);
    
    async function handleKeyDown(event: any){
        if (event.key === 'Enter' && userInput.length > 0) {
            sendMessage({
                senderType: SenderType.User, 
                message: userInput, 
                file: selectedFile
            })
            resetState()
        }
    }

    function onFileButtonClick() {
        if(elementRef.current)
            elementRef?.current.click();
    };

    async function onChangeFile(event:  ChangeEvent<HTMLInputElement>) {
        event.stopPropagation();
        event.preventDefault();
        if(event?.target?.files){
            const file = event?.target?.files[0] as File ?? undefined;
            const maxAllowedSize = MAX_FILE_SIZE * 1024 * 1024;
            if (event?.target?.files[0].size > maxAllowedSize) {
                setIsFileSizeExceed(true)
                return
            }
            setSelectedFile(file);
        }
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            if(isFileSizeExceed){
                setIsFileSizeExceed(false)
            }
          }, 3000);
      
          return () => clearTimeout(timer);

        
    },[isFileSizeExceed])

    function resetState(){
        setUserInput('')
        setSelectedFile(undefined)
    }

    return(
        <div>
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
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-[8.4rem] lg:pr-[12rem] bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2" 
                    />
                    <div className="absolute right-2 items-center inset-y-0 self-center sm:flex">
                        {selectedFile && <Attachment file={selectedFile} deleteAttachment= {()=> setSelectedFile(undefined)}/>}
                        <button
                            onClick={() => onFileButtonClick()}
                            className={'inline-flex mr-2 items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white  focus:outline-none bg-yellow-400 hover:bg-yellow-500'}
                        >
                            <Image src='/images/file.png' height={24} width={24} alt="file upload"/>
                        </button>
                        <button
                            onClick={async ()=> {
                                sendMessage({
                                    senderType: SenderType.User, 
                                    message: userInput,
                                    file: selectedFile
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
                    accept=".pdf,.png" 
                    onChange={(event) => onChangeFile(event)}
                    onClick={(event: any)=> { 
                        //@ts-ignore
                        event.target.value = null
                }}
                />
            </div>
            {isFileSizeExceed &&
                <div className="transition ease-in-out delay-150 translate-y-1 scale-110  duration-300 bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-xs flex items-center mx-auto max-w-lg">
                    <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                        <path fill="currentColor"
                            d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                        </path>
                    </svg>
                    <span className="text-red-800 "> File size cannot exceed {MAX_FILE_SIZE} MB.</span>
                </div>
            }
            
        </div>
        
    )
}