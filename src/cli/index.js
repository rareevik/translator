import { resolveConfig } from "../config/enviroment.js";
import { AiTranslationError } from "../errors/ai-client-errors.js";
import { EnvVariableError } from "../errors/config-errors.js";
import { ValidationError } from "../errors/validation-errors.js";
import { AiClient } from "../integrations/ai-client.js";
import { TranslationService } from "../services/translation.service.js";

function resolveMessage(argv){
    let message;

    if(!argv[2] || !argv[2].trim()){
        throw new ValidationError('Send a message to have it translated');
    }

    if (argv.length > 3) {
        const messageParts = argv.slice(2);
        message = messageParts.join(" ");
    }else{
        message = argv[2];
    }

    return message;
};

async function main(){
    let config;
    try {
        config = resolveConfig("cli");
        const aiClient = new AiClient(config.AI_PROVIDER_API_KEY, config.AI_PROVIDER_MODEL);
        const translationService = new TranslationService(aiClient);

        const message = resolveMessage(process.argv);

        const result = await translationService.translateMessage(message);
        console.log("\n", result, "\n");
    } catch (e) {
        if(e instanceof ValidationError){
            console.error(e.message);
        }else if(e instanceof AiTranslationError){
            console.error(`${e.message}, ${e.detail || e.cause?.message || 'unknown'}`);
        }else if(e instanceof EnvVariableError){
            console.error(`${e.message}: [${e.key}]`);
        }
        else{
            console.error('Unexpected error:' + e.message);
        }
        const canDebug = config?.DEBUG === 'true' ? true:false;
        if (canDebug && e.stack) {
            console.error(e.stack);
        }
        process.exitCode = 1;
    }
};

main();
