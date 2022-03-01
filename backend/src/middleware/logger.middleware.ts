import fs from "fs";

const logsDir = "./logs";
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

function getTime() {
  let now = new Date();
  return now.toLocaleString();
}

function doLog(level: string, ...args: Array<any>) {
  const strs = args.map((arg: any) =>
    typeof arg === "string" ? arg : JSON.stringify(arg)
  );
  var line = strs.join(" | ");
  line = `${getTime()} - ${level} - ${line}\n`;
  fs.appendFileSync("./logs/backend.log", line);
  console.log(line);
}

export default {
  debug(...args: Array<any>) {
    if (process.env.NODE_ENV !== "production") doLog("DEBUG", ...args);
  },
  info(...args: Array<any>) {
    doLog("INFO", ...args);
  },
  warn(...args: Array<any>) {
    doLog("WARN", ...args);
  },
  error(...args: Array<any>) {
    doLog("ERROR", ...args);
  },
};
