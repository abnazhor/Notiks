module.exports = function(app) {

    // Debido a que las notas se utilizan dentro de los propios tableros, no existe ninguna vista que sirva, por lo que
    // solo se hacen uso de rutas de la api en este caso.

    // Borra una nota. En cualquiera de los dos casos devuelve una respuesta en JSON y se procesa por parte del cliente
    // para poder borrar también del lado del cliente la nota.
    
    app.delete("/api/note/:id", (req, res) => {

    });

    // Crea una nota. En este caso devuelve los datos finales de la nota en formato JSON para ser procesada por el cliente.
    // Además debe de obtener los datos pasados por POST para poder crear la nota en la base de datos. Realiza validación.
    app.post("/api/note", (req, res) => {
        res.send("No hay código");
    });

    // Modifica una nota ya existente. Devuelve JSON en caso de error y no devuelve nada en caso de que la modificación
    // haya sido satisfactoria.
    app.post("/api/note/:id", (req, res) => {
        res.send("El código introducido es: " + req.params.id);
    });
}