function deleteNote(id) {
    fetch("/api/note", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                note_id: id
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                display("Note has been successfully deleted", 2);
                document.getElementById("desktop").removeChild(document.getElementById(id));
            } else {
                display("Note couldn't be deleted", 1);
            }
        });
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
                addDragEvt(note.id);
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

function loadGroupsIntoWindow(id) {
    let available = document.getElementsByName("available_groups")[0];
    let added = document.getElementsByName("added_groups")[0];

    available.innerHTML = "";
    added.innerHTML = "";

    for (let i = 0; i < groups.length; i++) {
        let option = document.createElement("option");
        option.value = groups[i].group_id;
        option.innerHTML = groups[i].title;
        available.appendChild(option);
    }
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

    loadGroupsIntoWindow(id);

    manageNote();
}

function saveNotePos(note_id, posX, posY) {
    if (sessionStorage.getItem("moving_item") === note_id) {
        fetch("/api/note/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    posX,
                    posY,
                    note_id
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {} else {
                    display("An error has occured while moving the note", 1);
                }
            });
    }
}