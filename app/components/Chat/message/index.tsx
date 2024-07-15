import { SenderType } from "@/app/enums/sender.type"
import Image from "next/image"

export default function Message(props: {messageFrom: SenderType, message:string}){
    const {messageFrom, message} = props
    return(
        <div className={['flex items-end', messageFrom  === SenderType.Bot ? '' : 'justify-end'].join(' ')}>
            <div 
                className={[
                    'flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2', 
                    messageFrom  === SenderType.Bot ? 'order-2 items-start':'order-1 items-end'
                ].join(' ')}
            >
                <div>
                    <span 
                        className={[
                            'px-4 py-3 rounded-xl inline-block', 
                            messageFrom  === SenderType.Bot ? 'rounded-bl-none bg-gray-100 text-gray-600':'rounded-br-none bg-blue-500 text-white'
                        ].join(' ')}
                    >
                        {message}
                    </span>
                </div>
            </div>
            <Image 
                height={20} width={20}
                alt={messageFrom  === SenderType.Bot ? 'bot' : 'user'}
                src={ messageFrom  === SenderType.Bot ? '/images/robot.webp' : '/images/user.jpeg'} 
                className={[messageFrom === SenderType.Bot ? 'order-1':'order-2'].join(' ')}
            />
        </div>
    )
           
}