import code from "./code";

const msg = new Map([
  [code.SUCCESS, "success"],
  [code.ERROR, "internal server error"],

  [code.ERR_DATABASE_UNKNOWN, "database operation error"],
  [code.ERR_MERCHANT_NOT_FOUND, "merchant not found"],
]);

function GetMessage(c: number) {
  const m = msg.get(c);
  if (m) {
    return m;
  }
  return msg.get(code.ERROR)!;
}

export default GetMessage;
