import { EnvVariableError } from "../errors/config-errors.js";

const config = {
  cli: {
    AI_PROVIDER_API_KEY: () => getEnvVar("AI_PROVIDER_API_KEY"),
    AI_PROVIDER_MODEL: () => getEnvVar("AI_PROVIDER_MODEL"),
    DEBUG: () => getOptionalEnvVar("DEBUG"),
  },
  api: {
    dev: {
      AI_PROVIDER_API_KEY: () => getEnvVar("AI_PROVIDER_API_KEY"),
      AI_PROVIDER_MODEL: () => getEnvVar("AI_PROVIDER_MODEL"),
      PORT: () => getEnvVar("PORT"),
    },
  },
};

function getEnvVar(key) {
  if (!key) throw new Error("key is required");
  const envVar = process.env[key];
  if (!envVar)
    throw new EnvVariableError("Enviroment variable not found", key);
  return envVar;
}

function getOptionalEnvVar(key) {
  if (!key) throw new Error("key is required");
  const envVar = process.env[key];
  if (!envVar)
    return undefined;
  return envVar;
}

export function resolveConfig(accessedFrom, env) {
  tryLoadEnvFile()

  const selectedConfig = env
    ? config[accessedFrom]?.[env]
    : config[accessedFrom];

  if (!selectedConfig)
    throw new Error(`Configuration not found: ${accessedFrom}/${env ?? ""}`);

  return Object.fromEntries(
    Object.entries(selectedConfig).map(([key, getter]) => [key, getter()]),
  );
}

function tryLoadEnvFile(){
  try {
    process.loadEnvFile();
  } catch (e) {
    console.warn('Env file not found, variables loaded from main enviroment:' + e.message)
  }
}