categories_data = [];

document.addEventListener("DOMContentLoaded", () => {
    let notes = document.getElementsByClassName("note");
    loadContextMenuEvt();
});

function loadContextMenuEvt() {
    document.body.addEventListener("contextmenu", evt => {
        evt.preventDefault();
    });
    document.getElementById("desktop").addEventListener("contextmenu", evt => {
        showContextMenu();
    });
    document.getElementById("desktop").addEventListener("click", evt => {
        if (evt.button == 0) {
            clearContextMenu();
        }
    });

    setEditEvent();
}

function showContextMenu() {
    clearContextMenu();
    let mouse = window.event;
    let contextMenu = document.createElement("div");
    let op = document.createElement("a");
    op.href = "javascript:createNote();";
    op.innerHTML = "New note";
    contextMenu.appendChild(op);
    contextMenu.id = "contextMenu";
    contextMenu.style.left = calculatePosX(mouse.clientX) + "px";
    contextMenu.style.top = mouse.clientY + 5 + "px";
    document.body.appendChild(contextMenu);
}

function clearContextMenu() {
    try {
        document.getElementById("contextMenu").style.opacity = "0";
        setTimeout(() => document.getElementById("contextMenu").remove(), 250);
    } catch (error) {

    }
}

function createNote() {
    if (document.getElementById("contextMenu") != null) {
        // Declaración de variables a usar.
        let location = document.getElementById("contextMenu");
        let note = document.createElement("div");
        let header = document.createElement("div");
        let content = document.createElement("p");
        let board_id = window.location.href.match(/[0-9]*$/)[0];
        let link = document.createElement("a");
        let title = document.createElement("span");

        title.innerHTML = "Note title";
        link.innerHTML = "Edit";

        header.classList.add("note_header");
        header.appendChild(link);
        header.appendChild(title);

        content.innerHTML = "Insert your content here.";

        note.appendChild(header);
        note.appendChild(content);

        let desktop = document.getElementById("desktop");
        note.style.left = calculateNotePosX(location.style.left) + "px";
        note.style.top = location.style.top;
        note.classList.add("note");
        note.id = "X";

        fetch("/api/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    note: {
                        board_id: board_id,
                        title: title.innerHTML,
                        content: content.innerHTML,
                        posX: note.style.left,
                        posY: note.style.top
                    }
                })
            })
            .then(result => result.json())
            .then(result => {
                try {
                    document.getElementById("empty").remove();
                } catch (err) {}
                desktop.appendChild(note);
                updateIdNotes();
            });
        clearContextMenu();
    }
}

function setEditEvent() {
    let notes = document.getElementsByClassName("note");
}

function saveData() {
    let notes = document.getElementsByClassName("note");
    let upload = [];
    let board_id = location.href.match(/[0-9]*$/)[0];

    for (let i = 0; i < notes.length; i++) {

        let note_id = notes[i].id ? notes[i].id : "X";

        let el = {
            posX: notes[i].style.left,
            posY: notes[i].style.top,
            title: notes[i].getElementsByClassName("note_header")[0].innerHTML,
            content: notes[i].getElementsByTagName("p")[0].innerHTML,
            note_id: note_id
        };
        upload.push(el);
    }

    fetch("/api/notes/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                notes: upload
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status == 200) {
                display("Your notes were updated sucessfully.", 2);
                console.log("uwu");
            }
        });
}

function updateIdNotes() {
    fetch("/api/board")
        .then(response => response.json())
        .then(response => {
            let notes = document.getElementsByClassName("note");
            let resp_notes = response.notes;
            for (let i = 0; i < notes.length; i++) {
                for (let j = 0; j < resp_notes.length; j++) {
                    if (notes[i].style.left == resp_notes[j].posX && notes[i].style.top == resp_notes[j].posY && notes[i].id == 'X') {
                        notes[i].id = resp_notes[j].note_id;
                        notes[i].getElementsByTagName("a")[0].href = `javascript:editNote(${notes[i].id})`;
                    }
                }
            }
        });
}

function calculatePosX(posX) {
    let width = document.body.getBoundingClientRect().width;
    if (posX + 200 >= width) {
        return width - 200;
    } else {
        return posX;
    }
}

function calculateNotePosX(posX) {
    posX = parseInt(posX.substring(0, posX.length - 2));
    let width = document.body.getBoundingClientRect().width;
    if (posX + 300 >= width) {
        return width - 300;
    } else {
        return posX;
    }
}

function settings() {
    toggleDialogManager(1);
}

function toggleDialogManager(opc) {
    let dialog = document.getElementById("dialogManager");

    switch (opc) {
        case 1:
            dialog.style.display = "flex";
            break;
        case 2:
            dialog.style.display = "none";
            break;
    }
}

function display(message, code) {
    let error_msg = document.getElementById("display_msg");
    let error_log = document.getElementById("display_log");
    error_msg.innerHTML = message;
    error_log.style.display = "block";
    if (code == 1) {
        error_msg.style.backgroundColor = "rgba(255, 0, 0, 0.63)";
    } else if (code == 2) {
        display_msg.style.backgroundColor = "rgba(17, 219, 84, 0.493)";
    }
    setTimeout(() => error_log.style.opacity = 0, 4000);
}

function editNote(id) {
    fetch(`/api/note/${id}`).then(result => result.json()).then(result => console.log(result));
    manageNote();
}

function loadCategoriesData() {
    fetch("/api/categories").then(result => result.json()).then(result => categories_data = result);
}

function manageSettings() {
    toggleDialogManager(1);

}

function manageGroups() {
    toggleDialogManager(1);
}

function manageNote() {
    toggleDialogManager(1);
}