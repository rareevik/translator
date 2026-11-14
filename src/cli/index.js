import { resolveConfig } from "../config/enviroment.js";
import { AiClient } from "../integrations/ai-client.js";
import { TranslationService } from "../services/translation.service.js";

const config = resolveConfig("cli");

const aiClient = new AiClient(config.AI_PROVIDER_API_KEY, config.AI_PROVIDER_MODEL);
const translationService = new TranslationService(aiClient);

function resolveMessage(argv){
    if (argv.length > 3) {
        const messageParts = argv.slice(2);
        return messageParts.join(" ");
    }else{
        return argv[2].trim();
    };

};

async function main(){
    const message = resolveMessage(process.argv);
    try {
        const result = await translationService.translateMessage(message);
        console.log("\n", result, "\n");
    } catch (e) {
        console.error(e);
    }
};

main();
