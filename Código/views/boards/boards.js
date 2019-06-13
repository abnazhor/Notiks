current_page = 0;

document.addEventListener("DOMContentLoaded", () => {
    loadBoardFunctionality();
    document.getElementById("cancelbutton").addEventListener("click", (evt) => {
        evt.preventDefault();
        displayBoard(2);
    });

    document.getElementById("previous").addEventListener("click", () => pagination("previous", true));
    document.getElementById("next").addEventListener("click", () => pagination("next", true));

    loadBoards();
});

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
                title: title,
                bg: "bg_default"
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status == 200) {
                displayBoard(0);
                loadBoards();
            } else {}
        });
}

function loadBoards() {
    let board_container = document.getElementById("boards");

    fetch("/api/boards")
        .then(response => response.json())
        .then(response => {
            board_container.innerHTML = "";
            for (let i = 0; i < response.length && i < 10; i++) {
                let board = document.createElement("div");
                let title = document.createElement("h2");
                board.id = response[i].board_id;
                board.classList.add("board");
                title.innerHTML = response[i].title;
                board.appendChild(title);
                board_container.appendChild(board);
            }

            current_page = 0;

            if (current_page === 0) {
                document.getElementById("previous").style.opacity = "0";
                document.getElementById("previous").disabled = "true";
                document.getElementById("previous").style.cursor = "initial";
            }

            document.getElementById("next").style.opacity = "1";
            document.getElementById("next").disabled = "";
            document.getElementById("next").style.cursor = "pointer";

            sessionStorage.setItem("boards", JSON.stringify(response));
            loadBoardFunctionality();

            if (boards.length >= 10 && document.getElementById("navigator").style.display === "none") {
                document.getElementById("navigator");
            }
        });
}

function pagination(opc, beautify) {
    let boards = JSON.parse(sessionStorage.getItem("boards"));
    let board_container = document.getElementById("boards");
    //let timeSet = 0;

    if (beautify) {
        //beautifyTransition("hide");
        //setTimeout(() => beautifyTransition("show"), 350);
        timeSet = 150;
    }
    setTimeout(() => {
        board_container.innerHTML = "";
        if (opc === "next") {
            if (current_page >= 0) {
                current_page++;
                let calc = current_page * 10;
                try {
                    for (let i = calc; i < calc + 10; i++) {
                        let board = document.createElement("div");
                        let title = document.createElement("h2");
                        board.id = boards[i].board_id;
                        board.classList.add("board");
                        title.innerHTML = boards[i].title;
                        board.appendChild(title);
                        board_container.appendChild(board);
                    }
                } catch (error) {
                    document.getElementById("next").style.opacity = "0";
                    document.getElementById("next").disabled = "true";
                    document.getElementById("next").style.cursor = "initial";
                }

                if (calc + 10 === boards.length) {
                    document.getElementById("next").style.opacity = "0";
                    document.getElementById("next").disabled = "true";
                    document.getElementById("next").style.cursor = "initial";
                }

                document.getElementById("previous").style.opacity = "1";
                document.getElementById("previous").disabled = "";
                document.getElementById("previous").style.cursor = "pointer";
            }
        } else if (opc === "previous") {
            if (current_page > 0) {
                console.log("UWU");
                current_page--;
                let calc = current_page * 10;
                try {
                    for (let i = calc; i < calc + 10; i++) {
                        let board = document.createElement("div");
                        let title = document.createElement("h2");
                        board.id = boards[i].board_id;
                        board.classList.add("board");
                        title.innerHTML = boards[i].title;
                        board.appendChild(title);
                        board_container.appendChild(board);
                    }
                } catch (error) {

                }

                if (current_page === 0) {
                    document.getElementById("previous").style.opacity = "0";
                    document.getElementById("previous").disabled = "true";
                    document.getElementById("previous").style.cursor = "initial";
                }

                document.getElementById("next").style.opacity = "1";
                document.getElementById("next").disabled = "";
                document.getElementById("next").style.cursor = "pointer";
            }
        }

        loadBoardFunctionality();
    }, timeSet);
}

/*
function beautifyTransition(opc) {
    let boards = document.getElementById("boards");
    if (opc === "hide") {
        boards.style.opacity = "0";
    } else if (opc === "show") {
        boards.style.opacity = "1";
    }
} */

function loadBoardFunctionality() {
    let boards = document.getElementsByClassName("board");
    for (let i = 0; i < boards.length; i++) {
        boards[i].addEventListener("click", evt => {
            goToBoard(evt);
        });
    }
}

function goToBoard(evt) {
    let code = evt.target.id;
    window.location.href = "/board/" + code;
}