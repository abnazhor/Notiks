document.addEventListener("DOMContentLoaded", () => {
    loadBoardFunctionality();
    document.getElementById("cancelbutton").addEventListener("click", (evt) => {
        evt.preventDefault();
        displayBoard(2)
    });
});

function goToBoard(evt) {
    let code = evt.target.id;
    window.location.href = "/board/" + code;
}

// Abre el diálogo para la creación de un tablero nuevo.
function displayBoard(opc) {
    let board_dialog = document.getElementById("board_dialog");
    if (opc == 1) {
        board_dialog.style.display = "flex";
    } else {
        board_dialog.style.display = "none";
    }
}

function createBoard() {
    let title = document.getElementById("board_create").getElementsByTagName("input")[0].value;

    fetch("/api/board", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title: title
            })
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.status == 200) {
                displayBoard(0);
                loadBoards();
            } else {
                console.log("An error has occured");
            }
        });
}

function loadBoards() {
    let board_container = document.getElementById("boards");

    fetch("/api/boards")
        .then(response => response.json())
        .then(response => {
            board_container.innerHTML = "";
            for(let i = 0; i < response.length && i < 10; i++) {
                let board = document.createElement("div");
                let title = document.createElement("h2");
                board.id = response[i].board_id;
                board.classList.add("board");
                title.innerHTML = response[i].title;
                board.appendChild(title);
                board_container.appendChild(board);
            }
            loadBoardFunctionality();
        });
}

function loadBoardFunctionality() {
    let boards = document.getElementsByClassName("board");
    for (let i = 0; i < boards.length; i++) {
        boards[i].addEventListener("click", evt => {
            goToBoard(evt);
        });
    }
}