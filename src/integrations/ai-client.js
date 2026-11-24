import OpenAI from "openai";
import { AiTranslationError } from "../errors/ai-client-errors.js";

export class AiClient {
  constructor(apiKey, model) {
    this.apiKey = apiKey;
    this.model = model;
    this.client = new OpenAI({ apiKey: this.apiKey });
  }
  async translateMessage(message, instructions) {
    const client = this.client;

    try {
      const response = await client.responses.create({
        model:this.model,
        reasoning: {
          effort: "low",
        },
        instructions: instructions,
        input: message,
      });
      return response.output_text;
    } catch (e) {
      throw new AiTranslationError(`Error in AI translation service`, e.constructor.name, {cause:e});
    }
  }
}
