/**
 * Script para modificav _moduleAliases en package.json dependiendo si es desarrollo o producción
 * src/ para desarrollo
 * ./build/ para producción
 */

const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = require(packageJsonPath);

const isProduction = process.env.NODE_ENV === "production";

const moduleAliases = {
  "@Controllers": isProduction ? "./build/src/Controllers" : "src/Controllers",
  "@Middlewares": isProduction ? "./build/src/Middlewares" : "src/Middlewares",
  "@Routes": isProduction ? "./build/src/Routes" : "src/Routes",
  "@Services": isProduction ? "./build/src/Services" : "src/Services",
  "@Server": isProduction ? "./build/src/Server" : "src/Server",
  "@Types": isProduction ? "./build/src/Types" : "src/Types",
  "@Utils": isProduction ? "./build/src/Utils" : "src/Utils",
};

packageJson._moduleAliases = moduleAliases;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
