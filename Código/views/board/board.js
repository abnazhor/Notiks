document.addEventListener("DOMContentLoaded", () => {
    let notes = document.getElementsByClassName("note");
    if (notes.length >= 1) {
        makeDraggable(notes);
        setNotesPos(notes);
    }
})

function makeDraggable(notes) {
    for (let i = 0; i < notes.length; i++) {
        notes[i].getElementsByClassName("note_header")[0].addEventListener("mousedown", (elem) => {
            activateDrag(elem);
        })

        notes[i].getElementsByClassName("note_header")[0].addEventListener("mouseup", (elem) => {
            deactivateDrag(elem);
        })

        notes[i].getElementsByClassName("note_header")[0].addEventListener("mousemove", (elem) => {
            dragElem(elem);
        })
    }

    document.addEventListener("contextmenu", event => event.preventDefault());
    document.addEventListener("contextmenu", () => {
        testMenu();   
    })
}

function activateDrag(elem) {
    let note = elem.target.parentElement;
    if(!note.classList.contains("dragOn")) note.classList.add("dragOn")
}

function deactivateDrag(elem) {
    let note = elem.target.parentElement;
    if(note.classList.contains("dragOn")) note.classList.remove("dragOn")
}

function dragElem(elem) {
    let note = elem.target.parentElement;
    console.log(note);
}

function setNotesPos(notes) {
    let desktop = document.getElementById("desktop").getBoundingClientRect();
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].style.top == "" && notes[i].style.left == "") {
            notes[i].style.top = desktop.top + (150*i) + "px";
        }
    }
}

function testMenu() {
    clearMenu();
    let bolita = document.createElement("div");
    let mouse = window.event;
    bolita.style.backgroundColor = "green";
    bolita.style.position = "absolute";
    bolita.style.borderRadius = "100px";
    bolita.style.left = mouse.clientX + "px";
    bolita.style.top = mouse.clientY + "px";
    bolita.style.width = "50px";
    bolita.style.height = "50px";
    bolita.id = "bolita";
    document.body.appendChild(bolita);
}

function clearMenu() {
    if(document.getElementById("bolita") != null) document.getElementById("bolita").remove();
}