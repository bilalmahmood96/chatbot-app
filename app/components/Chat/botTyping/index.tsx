import Image from "next/image";

export default function BotTyping(){
    return(
        <div>
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 order-2 items-start">
                        <Image 
                            src="/images/typing.gif" 
                            alt="..."
                            height={22}
                            width={22} 
                            className='w-10'
                        />   
                        
                        
                    </div>
                    <Image 
                        height={28} width={28}
                        alt='bot' 
                        src='/images/robot-2.png'
                        className= 'order-1'
                    />
                </div>
            </div>
    )
}