

/**Middle wara para probar la configuracion de los middlewares */
export const testMiddleware = (req: any, res: any, next: any) => {
  console.log("Middleware de prueba");
  next();
};