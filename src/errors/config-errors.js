export class EnvVariableError extends Error {
    constructor(message, key) {
        super(message);
        this.name = "EnvVariableError";
        this.key = key;
    }
}