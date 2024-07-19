import { ChatBotExceptions } from "@/app/enums/chatbot.exception";
import { SenderType } from "@/app/enums/sender.type";
import { IChat } from "@/app/models/chat.interface";

const FiletoBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let fileResult = reader?.result?.toString().split(/^data:(.*,)?/, ) ?? [''];
    const mimeType = fileResult[1]?.split(';')[0]
    const encoded = fileResult[2]
    resolve({
      mimeType: mimeType,
        data: encoded
    });
  };
  reader.onerror = reject;
});



export async function getChatContent(messageList: IChat[]){
  const chatContent = []
  for(const message of messageList){

    const textPart = {
      'text': `${message.message}`
    }

    const document = message.file !== undefined ?  {
      inlineData: await FiletoBase64(message.file)
  } : null

    const content = {
      "role": message.senderType === SenderType.User ? "user" : 'model',
      "parts": [
        textPart,
        document 
      ]
    }
    content.parts = content.parts.filter(part => part !== null)
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
    case 413:
      errorMessage = ChatBotExceptions.ENTITY_TOO_LARGE
    break;
    default:
      errorMessage = ChatBotExceptions.DEFAULT_ERROR
  }

  return errorMessage
  

}


    
