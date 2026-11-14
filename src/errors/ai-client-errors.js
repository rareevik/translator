export class AiTranslationError extends Error{
    constructor(message){
        super(message);
        this.name = "AiTranslationError"
    }
}