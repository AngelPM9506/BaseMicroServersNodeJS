if (process.env.NODE_ENV !== "production") {
  require("module-alias/register");
}

import RouterApp from "@Routes/index";
import { ConstrucServer } from "@Types/ServerTypes/index.types";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { Express, Request, Response } from "express";
import { Server as HTMLServer, createServer } from "http";
import morgan, { TokenCallbackFn } from "morgan";

/**Obtenr las variables de entorno para el servidor */
const { ALLOW_ORIGIN } = process.env;
/**Construccion de la clas e servidor */
export default class ServerApp {
  private port: number; // puesto de la aplicacion
  private app: Express; // aplicacion de express
  private HTMLServer: HTMLServer; // servidor de archivos estaticos
  private opCors: CorsOptions; // opciones de cors
  private morganFunction: Function; // funcion de morgan
  private morgan = morgan; // middleware de morgan

  private confMiddlewares(): void {
    /**Configuracion de los cors */
    this.app.use(cors(this.opCors));
    /**configuracion de la encode de urls */
    this.app.use(
      urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
    );
    /**configurasion de json */
    this.app.use(json({ limit: "50mb" }));
    /**Configuracion de ls cookies */
    this.app.use(cookieParser());
    /**Configuracion de morgan */
    this.morgan.token("remote-addr", this.morganFunction as TokenCallbackFn);
    const motganFormat =
      '[micro-service-email] -> ":remote-addr:url -> :method  status::status |[Date :date[web]] |[:response-time ms]"';
    this.app.use(morgan(motganFormat));
  }

  private handleErrors(req: Request, res: Response) {
    res
      .status(404)
      .json({ ok: false, status: "error", message: "Recurso no encontrado" });
  }

  private confRoutes() {
    this.app.use("/v1", RouterApp);
    /**En caso de obtener un error */
    this.app.use(this.handleErrors);
  }

  constructor({ port, opCors, allowOrigin }: ConstrucServer) {
    this.port = port || 3000;
    this.opCors = opCors || {
      origin: allowOrigin || ALLOW_ORIGIN || "*", //Origen de la peticion
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Metodos permitidos
      allowedHeaders: [
        //Cabeceras permitidas
        "Authorization",
        "X-API-KEY",
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Access-Control-Allow-Request-Method",
      ], //Cabeceras permitidas
      credentials: true, //Permite el envio de cookies
    };
    this.app = express();
    this.HTMLServer = createServer(this.app);
    this.morganFunction = (req: Request) => {
      const forwarded = req.headers["x-forwarded-for"];
      let remoteAddress;
      if (forwarded && Array.isArray(forwarded)) {
        remoteAddress = forwarded.join(",");
      } else if (typeof forwarded === "string") {
        remoteAddress = forwarded;
      } else {
        remoteAddress = req.socket.remoteAddress;
      }
      const url = req.headers.origin;
      return `${remoteAddress} - ${url}`;
    };

    /**Configuraciones del servidor */
    this.confMiddlewares();
    this.confRoutes();
  }

  /**Iniciar el servidor */
  public startServer({
    host,
    callback,
  }: {
    host?: string;
    callback?: Function;
  }): void {
    this.HTMLServer.listen(this.port, () => {
      callback && callback();
      console.log(
        `Servidor corriendo en ${
          host ? `en ${host}:${this.port}` : `en el puerto ${this.port}`
        }`
      );
    });
  }
  /**Obtenr rl servidor para pruebas */
  public getServer(): Express {
    return this.app;
  }
}
