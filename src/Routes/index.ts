/**Ruteo general */

import { Router } from "express";
import testRoutes from "./testRoutes";

/**Rutas de toda la aplicacion
 * @base /v1
 */

const RouterApp: Router = Router();

RouterApp.use("/test", testRoutes); // Ruta de prueba url: /v1/test

export default RouterApp;
