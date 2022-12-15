import GetMessage from "./message";

namespace e {
  export class Error {
    message: string;
    code: number;

    constructor(errCode: number) {
      this.message = GetMessage(errCode);
      this.code = errCode;
    }
  }

  export const ErrorOrDefault = (err: any, defaultErrCode: number) => {
    if (err instanceof e.Error) {
      return err;
    }

    return new Error(defaultErrCode);
  };
}

export default e;
