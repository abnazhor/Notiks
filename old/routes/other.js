module.exports = function (app) {

    // Verifica que el usuario no tiene sesión iniciada. En caso de tenerla, mueve al usuario a la página de inicio.
    // Además de verificar que la sesión se encuentra cerrada, debe de verificar que existe una variable que confirme
    // que el usuario ha aceptado el cierre de la cuenta. Esta página verifica que ciertamente la contraseña introducida
    // es la correcta para el usuario.
    app.post("/goodbye", (req, res) => {
        res.send("Goodbye!");
    });


    app.get("/testpoint", (req, res) => {
        let text = "TEST";
        let encrypted = boardKey.encrypt(text, "hex", "utf8");
        console.log(encrypted);
        let decrypted = boardKey.decrypt(encrypted);
        console.log(decrypted);
        res.send(encrypted);
    })

}