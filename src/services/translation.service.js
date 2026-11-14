export class TranslationService{
    constructor(aiClient, max_input = 5000){
        this.aiClient = aiClient;
        this.max_input = max_input
    }
    async translateMessage(message){
        if (!message) throw new Error("message is required");
        if (message.length > this.max_input) throw new Error(`message cannot exceed ${this.max_input} characters`);

        const translatedMessage = await this.aiClient.translateMessage(message);

        return translatedMessage;
    }
 }