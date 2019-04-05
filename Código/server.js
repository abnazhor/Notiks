const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const ejs = require("ejs");
const session = require("express-session");

const app = express();

//Carga de los archivos de configuración
const config = require("./config/config"); //Carga la configuración desde archivo.

//Configuración de los archivos estáticos de la aplicación.
app.use("/data", express.static(__dirname + "/data")); //Directorio de imágenes.
app.use("/views", express.static(__dirname + "/views")); //Directorio de vistas.

//Configuración general
//Obtiene el puerto en el que se va a ejecutar la aplicación y lo añade a una
//constante para evitar posibles modificaciones en el futuro.
const port = process.env.PORT || config.cargarConfig().port;

app.set("view engine", "ejs"); //Cambia el motor de plantillas a EJS.
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
    secret : "notiks",
    resave : false,
    saveUninitialized : true,
    cookie : {
        secure : false,
        maxAge : 6000000000
    }
}));

//Conexión con la base de datos de MySQL.
let con = mysql.createConnection(
    config.cargarConfigBBDD()
)

con.connect((error) => {
    try {

    } catch (err) {
        console.log("An error has occured in database connection process. Check database config.");
    }
});

//Importa todas las rutas de los archivos.
require("./routes/index.js")(app);

//Escucha de los puertos desde donde se accederá a la aplicación.
app.listen(port, () => console.log("Listening on port " + port + "."));