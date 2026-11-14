process.loadEnvFile();
import {EnvVariableError}from '../errors/config-errors.js';

const config = {
    cli:{
        AI_PROVIDER_API_KEY: () => getEnvVar('AI_PROVIDER_API_KEY'),
    },
    api:{
        dev:{
            AI_PROVIDER_API_KEY: () => getEnvVar('AI_PROVIDER_API_KEY'),
            PORT: () => getEnvVar('PORT'),
        }
    }
}

function getEnvVar(key){
    if(!key)throw new Error("key is required");
    const envVar = process.env[key];
    if(!envVar) throw new EnvVariableError("the enviroment variable not exist", key);
    return envVar;
}

function resolveConfig(accessedFrom, env){
    const selectedConfig = env 
        ? config[accessedFrom]?.[env]
        : config[accessedFrom];
    
    if(!selectedConfig) throw new Error(`Configuration not found: ${accessedFrom}/${env ?? ''}`);
    
    return Object.fromEntries(
        Object.entries(selectedConfig).map(([key, getter]) => [ key, getter()])
    );
}