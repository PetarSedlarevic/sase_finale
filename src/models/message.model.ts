export interface MessageModel{
    messageId: number,
    userId: number,
    content: string,
    title: string,
    addedBy: number,
    createdAt: string,
    updatedAt: string | null
}