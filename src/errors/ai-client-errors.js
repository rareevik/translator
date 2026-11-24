export class AiTranslationError extends Error {
  constructor(message, constructorName, { cause } = {}) {
    super(message, { cause });
    this.name = "AiTranslationError";
    this.constructorName = constructorName;
    if (
      this.constructorName === "APIConnectionError" ||
      this.constructorName === "InternalServerError" ||
      this.constructorName === "RateLimitError"
    ) {
      this.detail = "try again later";
    }

    if (
      this.constructorName === "AuthenticationError" ||
      this.constructorName === "PermissionDeniedError"
    ) {
      this.detail = "review configurated key";
    }

    if (
      this.constructorName === "BadRequestError" ||
      this.constructorName === "UnprocessableEntityError"
    ) {
      this.detail = "something is wrong in the request";
    }

  }
}
