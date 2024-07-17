import { SenderType } from "@/app/enums/sender.type"
import Image from "next/image"

type MessagePropsType = {
    messageFrom: SenderType
    message: string 
    isFileAttached?: boolean
}

function transformMessageText(messageContent: string){
    const removeMultipleAsteriskContent =  messageContent.split("** * **").join("<br/><br/>");
    const removeDoubleAsteriskContent = removeMultipleAsteriskContent.split("**").join("<br />");
    const removeAsteriskContent = removeDoubleAsteriskContent.split("*").join("<br />");
    return removeAsteriskContent
}

export default function Message(props: MessagePropsType){
    const {messageFrom, message, isFileAttached = false} = props
    return(
        <div className={['flex items-end', messageFrom  === SenderType.Bot ? '' : 'justify-end'].join(' ')}>
            <div 
                className={[
                    'flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 text-sm', 
                    messageFrom  === SenderType.Bot ? 'order-2 items-start':'order-1 items-end'
                ].join(' ')}
            >
                <div className="flex flex-col cursor-default">
                    <span 
                        className={[
                            'px-4 py-3 rounded-xl inline-block ', 
                            messageFrom  === SenderType.Bot ? 'rounded-bl-none bg-gray-100 text-gray-600':'rounded-br-none bg-blue-500 text-white'
                        ].join(' ')}
                        dangerouslySetInnerHTML={{__html: transformMessageText(message)}}
                    />
                    
                    {isFileAttached && 
                        <span className="max-w-max text-gray-500 text-[0.60rem] ml-auto mt-1">
                            File Attached
                        </span>
                    }
                </div>
                
            </div>
            <Image 
                height={28} width={28}
                alt={messageFrom  === SenderType.Bot ? 'bot' : 'user'}
                src={ messageFrom  === SenderType.Bot ? '/images/robot.webp' : '/images/user.png'} 
                className={[messageFrom === SenderType.Bot ? 'order-1':'order-2'].join(' ')}
            />
        </div>
    )
           
}