export class ClientError extends Error {
  public readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export class ExtractionError extends Error {
  constructor(message: string) {
    super(message);
  }
}
