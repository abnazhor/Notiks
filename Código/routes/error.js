module.exports = function(app) {

    // Solo posee una ruta, que es la que utilizará para mostrar una pantalla de error a todas las peticiones que 
    // se salgan de lo que son las rutas habituales.
    app.use((req, res, next) => {
        res.status(404).send(
            "Esta página no existe."
        )
    });
}