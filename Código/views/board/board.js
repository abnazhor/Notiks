document.addEventListener("DOMContentLoaded", () => {
    let notes = document.getElementsByClassName("note");
    loadContextMenuEvt();
})

function makeDraggable(notes) {

}

function loadContextMenuEvt() {
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showContextMenu();
    });
    document.addEventListener("click", (event) => {
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
    console.log(document.body.clientWidth);
    console.log(document.body.clientHeight);
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
    try {
        document.getElementById("empty").remove();
    } catch {

    }

    if (document.getElementById("contextMenu") != null) {
        try {
            // Declaración de variables a usar.
            let location = document.getElementById("contextMenu");
            let note = document.createElement("div");
            let header = document.createElement("div");
            let content = document.createElement("p");

            header.innerHTML = "Note title";
            header.classList.add("note_header");

            content.innerHTML = "Insert your content here.";

            note.appendChild(header);
            note.appendChild(content);

            let desktop = document.getElementById("desktop");
            note.style.left = location.style.left;
            note.style.top = location.style.top;
            note.classList.add("note");
            desktop.appendChild(note);
        } catch (err) {

        }
    }
}

function unpin() {
    
}

function pin() {

}