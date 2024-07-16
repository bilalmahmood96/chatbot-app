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
  const candidates = response.data.candidates
  const botPart = candidates[0]?.content.parts[0].text
  return botPart
}


    
