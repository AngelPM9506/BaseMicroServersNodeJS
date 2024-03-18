import expressListEndpoints from "express-list-endpoints";
import chalk from "chalk";
import ServerApp from "@Server/index";

// Chalk colors
export const chalkColors = {
  error: chalk.bold.red,
  warning: chalk.yellow,
  success: chalk.green,
  info: chalk.italic.bgBlack.blueBright,
  log: chalk.white,
  path: chalk.bold.underline.cyanBright,
  method: chalk.bold.yellowBright,
  middleware: chalk.bold.blueBright,
};

const showAllEndpoints = (App: ServerApp): void => {
  expressListEndpoints(App.getServer()).forEach((endPoint) =>
    console.log(
      `    Point: ${chalkColors.path(endPoint.path)} ${chalkColors.method(
        `{ ${endPoint.methods.join(", ")} }`
      )} - Middlewares: ${chalkColors.middleware(
        `{${endPoint.middlewares.join(", ")}}`
      )}`
    )
  );
  //console.dir(endPoints, { depth: 10 });
};

const defaultFunctions = (App: ServerApp) => {
  if (process.env.NODE_ENV === "development") {
    showAllEndpoints(App);
  }
};

export default defaultFunctions;
