import { ChatBotExceptions } from "@/app/enums/chatbot.exception";
import { SenderType } from "@/app/enums/sender.type";
import { IChat } from "@/app/models/chat.interface";

export function getChatContent(messageList: IChat[]){
  const chatContent = []
  for(const message of messageList){
    const fileData =  message.fileUri !== '' ? {
      "fileData": {
        "fileUri":  message.fileUri,
        "mimeType": 'application/pdf'
      } 
    } : null

    const textPart = {
      'text': `${message.message}`
    }

    const content = {
      "role": message.senderType === SenderType.User ? "user" : 'model',
      "parts": [
        fileData,
        textPart 
      ]
    }
    chatContent.push(content)
  }
 return chatContent[chatContent.length - 1]
}

export function extractResponse(response: any){
  if(typeof response?.data?.data === 'number'){
    const message = errorMessage(response.data.data)
    return message
  }
  const candidates = response.data.candidates
  const botResponse = candidates?.[0]?.content?.parts?.[0]?.text ?? ChatBotExceptions.DEFAULT_ERROR
  return botResponse
}


function errorMessage(statusCode: number){
  let errorMessage = ''
  switch(statusCode){
    case 429:
      errorMessage = ChatBotExceptions.RESOURCE_EXHAUSTED
    break;
    case 403:
      errorMessage = ChatBotExceptions.PERMISSION_DENIED
    break;
    case 503:
      errorMessage = ChatBotExceptions.UNAVAILABLE
    break;
    default:
      errorMessage = ChatBotExceptions.DEFAULT_ERROR
  }

  return errorMessage
  

}


    
