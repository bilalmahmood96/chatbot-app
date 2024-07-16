import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type AttachmentPropsType = {
    deleteAttachment: Function
    file: File
}

export default function Attachment(props: AttachmentPropsType){
    const {file, deleteAttachment} = props
    return(
        <abbr title={file?.name}>
            <div
            className="inline-flex relative items-center mr-6 justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white  focus:outline-none"
            >
                <span 
                    onClick={()=> deleteAttachment()}
                    className="cursor-pointer bg-black absolute top-[-4px] right-[-10px] text-white text-xs rounded-full h-4 min-w-4 py-2 inline-flex items-center justify-center"
                >
                    x
                </span>
                <Image src='/images/attachment.svg' height={26} width={26} alt="file-attached"/>
            </div>
        </abbr>
        
    )
}