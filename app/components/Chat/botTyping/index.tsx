import Image from "next/image";

export default function BotTyping(){
    return(
        <div>
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 order-2 items-start">
                        <Image 
                            src="/images/chatbot-typing.gif" 
                            alt="..."
                            height={26}
                            width={38} 
                            className='w-16'
                        />   
                        
                        
                    </div>
                    <Image 
                        height={28} width={28}
                        alt='bot' 
                        src='/images/robot.webp'
                        className= 'order-1'
                    />
                </div>
            </div>
    )
}