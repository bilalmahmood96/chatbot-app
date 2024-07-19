import { SenderType } from "../enums/sender.type";

export interface IChat {
    senderType: SenderType
    message: string
    file?: File
}