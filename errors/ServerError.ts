abstract class ServerError {
  public abstract name: string;

  public abstract statusCode: number;
}

export default ServerError;
