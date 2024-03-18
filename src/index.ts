import dotenv from "dotenv";
import ServerApp from "./Server";
import defaultFunctions from "@Utils/defaultFunctions";
dotenv.config();

const { PORT, HOST, NODE_ENV } = process.env;
// console.log(PORT, HOST, NODE_ENV);

const server: ServerApp = new ServerApp({
  port: PORT ? parseInt(PORT.toString()) : 3000,
});

const startingServer = server.startServer({
  host: HOST,
  callback: () => defaultFunctions(server),
});

export default startingServer;
