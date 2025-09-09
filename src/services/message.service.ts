import type { MessageModel } from "@/models/message.model"
import { MainService } from "./main.service"

export class MessageService {
    static async getMessage() {
        return await MainService.useAxios<MessageModel[]>('/messages')
    }

    static async getMessageById(id: number){
        return await MainService.useAxios<MessageModel>(`/messages/${id}`)
    }
}