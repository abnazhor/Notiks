let fs = require("fs");

//Esta función realiza la importación de los archivos en los que se encuentran las distintas rutas
//de express para modularizar el proyecto y hacerlo más legible y modificable.
module.exports = function(app) {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file == "index.js") return; //Omitimos el índice ya que es este el que lee los ficheros.
        if (file == "error.js") return; //Omitimos los errores y los dejamos para el final.

        let name = file.substr(0, file.indexOf("."));
        require('./' + name)(app);
    });

    //Dejamos la ruta de error para el final ya que solo queremos acceder a ella
    //en caso de que no se encuentre ninguna otra ruta que coincida con la introducida por el usuario.
    require('./error.js')(app);
}