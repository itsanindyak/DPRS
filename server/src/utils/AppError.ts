export default class AppError extends Error {
  public statusCode: number;
  public data: unknown;
  public success: boolean;
  public message: string;

  constructor(message: string, statusCode: number, data: unknown = null) {
    super(message);

    this.name = "AppError";
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;

    // Maintains proper stack trace (only in V8 engines like Node.js)
    Error.captureStackTrace(this, this.constructor);

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
