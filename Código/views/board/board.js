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

    setCancelEvent();
    loadCategoriesData();
}

function setCancelEvent() {
    let cancel_btns = document.getElementsByClassName("cancel_button");
    for (let i = 0; i < cancel_btns.length; i++) {
        cancel_btns[i].addEventListener("click", evt => {
            evt.preventDefault();
            toggleDialogManager(2);
        });
    }
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
        note.classList.add("categ_default");
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

function updateNote(id, title, content, category) {
    let note = document.getElementById(id);

    note.getElementsByTagName("p")[0].innerHTML = content;
    note.getElementsByTagName("span")[0].innerHTML = title;

    note.classList.remove("categ_default");
    for (let i = 0; i < categories_data.length; i++) {
        note.classList.remove("categ_" + i);
    }

    note.classList.add(category);
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
    setTimeout(() => error_log.style.opacity = 1, 500);
    if (code == 1) {
        error_msg.style.backgroundColor = "rgba(255, 0, 0, 0.63)";
    } else if (code == 2) {
        display_msg.style.backgroundColor = "rgba(17, 219, 84, 0.493)";
    }
    setTimeout(() => error_log.style.opacity = 0, 3000);
    setTimeout(() => error_log.style.display = "none", 4000);
}

function verifyNoteData() {
    let form = document.getElementById("noteManager").getElementsByTagName("form")[0];
    let title = form.getElementsByTagName("input")[0].value;
    let content = form.getElementsByTagName("textarea")[0].value;
    let category = form.getElementsByTagName("select")[0].value;

    saveNote(parseInt(sessionStorage.getItem("edited_note")), title, content, category);
}

function editNote(id) {

    try {
        sessionStorage.removeItem("edited_note");
    } catch (err) {
        display("An error has occured", 1);
    }

    let form = document.getElementById("noteManager").getElementsByTagName("form")[0];
    let title = form.getElementsByTagName("input")[0];
    let content = form.getElementsByTagName("textarea")[0];
    let category = form.getElementsByTagName("select")[0];

    sessionStorage.setItem("edited_note", id);

    let displayed_note = document.getElementById(id);
    title.value = displayed_note.getElementsByTagName("span")[0].innerHTML;
    content.value = displayed_note.getElementsByTagName("p")[0].innerHTML;

    category.innerHTML = "";
    for (let i = 0; i < categories_data.length; i++) {
        let option = document.createElement("option");
        option.value = categories_data[i].categ_id;
        option.innerHTML = categories_data[i].title;

        category.appendChild(option);
    }

    let classList = document.getElementById(id).classList;
    for (let i = 0; i < classList.length; i++) {
        if (/categ\_\.*/.test(classList[i])) {
            category.value = classList[i];
        }
    }

    manageNote();
}

function saveNote(id, title, content, category) {
    fetch("/api/note/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title: title,
                content: content,
                categ_id: category,
                note_id: id
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status == 200) {
                display("Note has been sucessfully updated", 2);
                toggleDialogManager(2);
                updateNote(sessionStorage.getItem("edited_note"), title, content, category);
                sessionStorage.removeItem("edited_note");
            } else {
                display("An error has occured", 1);
            }
        });
}

function loadCategoriesData() {
    fetch("/api/categories").then(result => result.json()).then(result => {
        categories_data = result.categories;
    });
}

function manageSettings() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    let settingsWindow = document.getElementById("boardManager");
    settingsWindow.style.display = "flex";
}

function manageGroups() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    let settingsWindow = document.getElementById("groupManager");
    settingsWindow.style.display = "flex";
}

function manageNote() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    let settingsWindow = document.getElementById("noteManager");
    settingsWindow.style.display = "flex";
}

function hideAllWindowsManagers() {
    let windowManagers = document.getElementsByClassName("manager");
    for (let i = 0; i < windowManagers.length; i++) {
        windowManagers[i].style.display = "none";
    }
}