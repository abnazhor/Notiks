document.addEventListener("DOMContentLoaded", () => {
    let boards = document.getElementsByClassName("board");
    for(let i = 0; i < boards.length; i++) {
        boards[i].addEventListener("click", (evt) => {
            prueba(evt);
        });
    }
});

function prueba(evt) {
    let code = evt.target.id;
    window.location.href = "/board/" + code;
}