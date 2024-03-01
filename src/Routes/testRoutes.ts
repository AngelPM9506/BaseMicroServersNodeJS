import { Router } from "express";

/**Ruta de prueba para la la configuracion de rutas */
const testRoutes: Router = Router();

testRoutes.get("/", (req, res) => {
  return res.status(200).json({ status: "success", message: "Ruta de prueba" });
}); // Ruta de prueba url: /v1/test

export default testRoutes;