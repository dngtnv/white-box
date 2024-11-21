export default class logger {
  public static info = (args: unknown) => {
    console.log("\x1b[36m%s\x1b[0m", `${new Date().toLocaleString()} [INFO]`, typeof args === "string" ? args : args);
  };
  public static warn = (args: unknown) => {
    console.log("\x1b[33m%s\x1b[0m", `${new Date().toLocaleString()} [WARN]`, typeof args === "string" ? args : args);
  };
  public static error = (args: unknown) => {
    console.log("\x1b[31m%s\x1b[0m", `${new Date().toLocaleString()} [ERROR]`, typeof args === "string" ? args : args);
  };
}
