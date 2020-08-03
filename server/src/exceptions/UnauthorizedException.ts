class UnauthorizedExeption extends Error {
  public status: number;
  public message: string;
  public type: string;

  constructor(message?: string) {
    super('Unauthorized');
    this.status = 401;
    this.message = message || 'Unauthorized';
    this.type = 'Unauthorized';
  }
}

export default UnauthorizedExeption;
