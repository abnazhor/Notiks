const fs = require("fs");

//Obtiene la configuración de la aplicación y la devuelve.
//Esta configuración está compuesta del puerto en el que funciona la aplicación.
exports.loadConfig = () => {
    let datos = JSON.parse(fs.readFileSync("./config/config.json"));
    return datos;    
}

exports.getMysqlConfig = () => {
    let conf = fs.readFileSync("config/db.json");
    conf = JSON.parse(conf);
    return conf;
}