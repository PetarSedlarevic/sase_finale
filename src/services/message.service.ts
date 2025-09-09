import type { MessageModel } from "@/models/message.model"
import { MainService } from "./main.service"

export class MessageService {
    static async getMessage() {
        return await MainService.useAxios<MessageModel[]>('/message')
    }

    static async getMessageById(id: number){
        return await MainService.useAxios<MessageModel>(`/message/${id}`)
    }
}