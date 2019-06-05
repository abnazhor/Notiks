document.addEventListener("DOMContentLoaded", () => {
    let notes = document.getElementsByClassName("note");
    loadContextMenuEvt();
})

function makeDraggable(notes) {

}

function loadContextMenuEvt() {
    document.getElementById("desktop").addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu();
    });
    document.getElementById("desktop").addEventListener("click", (event) => {
        if (event.button == 0) {
            clearContextMenu();
        }
    });
}

function showContextMenu() {
    clearContextMenu();
    let mouse = window.event;
    let contextMenu = document.createElement("div");
    let op = document.createElement("a");
    op.href = "javascript:createNote();";
    op.innerHTML = "New note";
    contextMenu.appendChild(op);
    let height = height => {}
    let width = width => {

    }
    contextMenu.id = "contextMenu";
    contextMenu.style.left = mouse.clientX + "px";
    contextMenu.style.top = mouse.clientY + "px";
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

        header.innerHTML = "Note title";
        header.classList.add("note_header");

        content.innerHTML = "Insert your content here.";

        note.appendChild(header);
        note.appendChild(content);

        let desktop = document.getElementById("desktop");
        note.style.left = location.style.left;
        note.style.top = location.style.top;
        note.classList.add("note");
        note.id = "X";

        fetch("/api/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note: {
                        board_id: board_id,
                        title: header.innerHTML,
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
                } catch {

                }
                desktop.appendChild(note);
                updateIdNotes();
            });
            clearContextMenu();
    }
}

function saveData() {
    let notes = document.getElementsByClassName("note");
    let upload = [];
    let board_id = location.href.match(/[0-9]*$/)[0];

    for (let i = 0; i < notes.length; i++) {

        let note_id = notes[i].id ? notes[i].id : "X";

        let el = {
            note_id: note_id,
            posX: notes[i].style.left,
            posY: notes[i].style.top,
            title: notes[i].getElementsByClassName("note_header")[0].innerHTML,
            content: notes[i].getElementsByTagName("p")[0].innerHTML,
            board_id: board_id
        }
        upload.push(el);
    }

    fetch("/api/notes/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                notes: upload
            })
        })
        .then(response => response.json())
        .then(response => console.log(response));
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
                    }
                }
            }
        });
}