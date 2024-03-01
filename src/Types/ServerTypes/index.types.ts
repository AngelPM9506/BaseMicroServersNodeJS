import { CorsOptions } from "cors";

export interface ConstrucServer {
  port?: number; // puesto de la aplicacion
  opCors?: CorsOptions; // opciones de cors
  allowOrigin?: string; // origen de la peticion
}
