/**Script para confirmar que la base de datos este sincronizada con el esquematico de prisma y ejecutar todas las migraciones
 * necesarias para que la base de datos este actualizada con el esquematico de prisma en el entorno de produccion
 */
const { exec } = require("child_process");
// ejecutamos el comando de construccion de cliente de priema para asegurar que este actualizado
exec("npx prisma generate", (error, stdout, stderr) => {
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

  // Ejecutar el comando de construccion
  exec("npx prisma migrate deploy", (error, stdout, stderr) => {
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
    console.log(`Migraciones exitosas: ${stdout}`);
  });
});
