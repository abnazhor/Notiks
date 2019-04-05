const fs = require("fs");

//Obtiene la configuración de la aplicación y la devuelve.
//Esta configuración está compuesta del puerto en el que funciona la aplicación.
exports.cargarConfig = () => {
    let datos = JSON.parse(fs.readFileSync("./config/config.json"));
    return datos;    
}

exports.cargarConfigBBDD = () => {
    let datos = JSON.parse(fs.readFileSync("./config/db.json"));
    return datos;
}