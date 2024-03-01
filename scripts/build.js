/**Script para construir la aplicacion y trabaje con js sin la necesidad de las librerias de desarrollo
 * y copiando los archivos que no se trsnspilan a la carpeta build siguiendo la misma ruta de src/ a build/src/
 */

const { exec } = require("child_process");
const copyfiles = require("copyfiles");

// Ejecutar el comando de construccion
exec("tsc", (error, stdout, stderr) => {
  // Si hay un error, mostrarlo y terminar, si no, seguir con el proceso
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  // Si hay un error en la salida estandar, mostrarlo y terminar, si no, seguir con el proceso
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  // Mostrar la salida estandar del proceso si no hay errores
  console.log(`Construccion exitosa: ${stdout}`);

  /**copiamos todos los archivos que no de typescript de ./src a ./build/src para que funcione de forma adecuada todo el codigo en js*/
  copyfiles(["src/**/*.!(ts)", "build/src"], { up: 1 }, (error) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log("Archivos copiados con exito");
  });
});
