import { createLogger, transports, format, Logger } from "winston";

function traceLine(skip: number = 0) {
  const e: any = new Error();
  const frame: string = e.stack.split("\n")[3 + skip];
  const lineNumber = frame.split(":").reverse()[1];

  let functionName = frame.split(" ").at(-1) ?? "";
  let index = functionName.indexOf("/") + 1;
  index = functionName.indexOf("/", index) + 1;
  index = functionName.indexOf("/", index) + 1;

  let lastIndex = functionName.indexOf(":", index);
  if (lastIndex <= 0) lastIndex = functionName.length;

  functionName = functionName.substring(index, lastIndex);

  return functionName + ":" + lineNumber;
}

let logger: Logger | null = null;

namespace log {
  export const init = () => {
    logger = createLogger({
      transports: [new transports.Console()],
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf(({ timestamp, level, message, line, args }) => {
          message = [message, ...args]
            .map((m) => {
              if (typeof m == "string") return m;
              return JSON.stringify(m, null, 2);
            })
            .join(" ");
          return `[${level} ${timestamp} ${line}] ${message}`;
        })
      ),
    });
  };
  export const info = (message: string, ...args: any[]) => {
    logger?.info(message, { line: traceLine(), args });
  };
  export const error = (message: string, ...args: any[]) => {
    logger?.error(message, { line: traceLine(), args });
  };
}

export default log;
