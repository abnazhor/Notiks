document.addEventListener("DOMContentLoaded", () => {
    let boards = document.getElementsByClassName("board");
    for(let i = 0; i < boards.length; i++) {
        boards[i].addEventListener("click", (evt) => {
            goToBoard(evt);
        });
    }
});

function goToBoard(evt) {
    let code = evt.target.id;
    window.location.href = "/board/" + code;
}

// Abre el diálogo para la creación de un tablero nuevo.
function newBoard() {

}

function createBoard(title) {
    fetch("/api/board", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        credentials : "include",
        body : JSON.stringify({
            test : "hello"
        })
    })
}