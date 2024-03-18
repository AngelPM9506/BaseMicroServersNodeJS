/**
 * Script para hacer un push de la base de datos de prisma en el entorno de desarrollo
 * cons el comando de prismma npx prisma db push
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
  console.log(`Generacion de cliente de prisma exitosa: ${stdout}`);
});
// Ejecutar el comando de construccion
exec("npx prisma db push", (error, stdout, stderr) => {
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
