categories_data = [];
groups = [];
isMouseDown = false;

document.addEventListener("DOMContentLoaded", () => {
    let notes = document.getElementsByClassName("note");
    loadContextMenuEvt();
    loadOtherEvts();
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
}

function loadOtherEvts() {
    let notes = document.getElementsByClassName("note");
    for (let i = 0; i < notes.length; i++) {
        addDragEvt(notes[i].id);
        notes[i].addEventListener("mouseup", evt => saveNotePos(notes[i].id, notes[i].style.left, notes[i].style.top));
    }

    document.addEventListener("mousedown", evt => isMouseDown = true);
    document.addEventListener("mouseup", evt => isMouseDown = false);

    setCancelEvent();
    setDeleteEvent();
    setDeleteBoardEvt();
    setAddRemoveGroupEvt();
    setBoardId();
    loadCategoriesData();
    loadGroups();
}

function addDragEvt(id) {
    let elem = document.getElementById(id).getElementsByClassName("note_header")[0];
    elem.addEventListener("mousedown", evt => {
        let mouse = window.event;
        let elem = evt.currentTarget.getBoundingClientRect();
        sessionStorage.setItem("moving_item", evt.currentTarget.parentElement.id);

        let posX = mouse.clientX - elem.left;
        let posY = mouse.clientY - elem.top;

        evt.currentTarget.onmousemove = evt => movement(evt.currentTarget, posX, posY);
    });
}

function movement(element, posX, posY) {
    let mouse = window.event;

    if (isMouseDown) {
        element.parentElement.style.top = mouse.clientY - posY + "px";
        element.parentElement.style.left = mouse.clientX - posX + "px";
        setTimeout(() => {
            element.parentElement.style.top = mouse.clientY - posY + "px";
            element.parentElement.style.left = mouse.clientX - posX + "px";
        }, 15);
    }
}

function setBoardId() {
    let board_id = location.href.split("/");
    if(board_id[board_id.length-1] != "") {
        board_id = board_id[board_id.length-1];
    } else {
        board_id = board_id[board_id.length-2];
    }

    sessionStorage.setItem("boardId", board_id);
}

function setDeleteBoardEvt() {
    let delete_button = document.getElementById("delete_board");
    delete_button.addEventListener("click", evt => {
        evt.preventDefault();
        deleteBoard();
    });
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

function setDeleteEvent() {
    let delete_btns = document.getElementsByClassName("delete_button");
    for (let i = 0; i < delete_btns.length; i++) {
        delete_btns[i].addEventListener("click", evt => {
            evt.preventDefault();
            deleteNote(sessionStorage.getItem("edited_note"));
            toggleDialogManager(2);
        });
    }
}

function setAddRemoveGroupEvt() {
    let add_button = document.getElementById("add_group");
    let remove_button = document.getElementById("remove_group");

    add_button.addEventListener("click", evt => {
        evt.preventDefault();
        addGroup();
    });
    remove_button.addEventListener("click", evt => {
        evt.preventDefault();
        removeGroup();
    });
}

function addGroup() {
    let note_id = sessionStorage.getItem("edited_note");

    let available_groups = document.getElementsByName("available_groups")[0];
    let added_groups = document.getElementsByName("added_groups")[0];

    let group_id = available_groups.options[available_groups.selectedIndex].value;
    let group_title = available_groups.options[available_groups.selectedIndex].innerHTML;

    fetch("/api/group/assign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                note_id: note_id,
                group_id: group_id
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                let option = document.createElement("option");
                option.value = group_id;
                option.innerHTML = group_title;
                added_groups.appendChild(option);
            }
        });
}

function removeGroup() {
    let note_id = sessionStorage.getItem("edited_note");

    let available_groups = document.getElementsByName("available_groups")[0];
    let added_groups = document.getElementsByName("added_groups")[0];

    let group_id = added_groups.options[added_groups.selectedIndex].value;
    let group_title = added_groups.options[added_groups.selectedIndex].innerHTML;

    fetch("/api/group/deassign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                note_id: note_id,
                group_id: group_id
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 200) {
                added_groups.options[added_groups.selectedIndex].remove();
            }
        });
}


function showContextMenu() {
    clearContextMenu();
    let mouse = window.event;
    let contextMenu = document.createElement("div");
    let op = document.createElement("a");
    let op2 = document.createElement("a");
    let hr = document.createElement("hr");
    op.href = "javascript:createNote();";
    op.innerHTML = "New note";
    op2.href = "javascript:showHideGroup()";
    op2.innerHTML = "Show/Hide groups";
    contextMenu.appendChild(op);
    contextMenu.appendChild(op2);
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

function verifyBoardData() {
    let form = document.getElementById("boardManager").getElementsByTagName("form")[0];
    let title = form.getElementsByTagName("input")[0].value;
    let board_id = sessionStorage.getItem("boardId");

    fetch("/api/board/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            board_id: board_id,
            title: title
        })
    })
    .then(response => response.json())
    .then(response => {
        if(response.status === 200) {
            toggleDialogManager(2);
            hideAllWindowsManagers();
            display("Successfully updated board information", 2);
        } else {
            display(response.message);
        }
    });
}

function deleteBoard() {
    let board_id = window.location.href.split("/");
    board_id = board_id[board_id.length - 1];

    let verif = confirm("Are you sure you want to delete this board?");
    if (verif) {
        fetch("/api/board", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    board_id: board_id
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response.status === 200) {
                    display("The board has been successfully deleted. Redirecting...", 2);
                    setTimeout(() => window.location.replace("/boards"), 2000);
                } else {
                    display("Something went wrong. Please try again later.", 1);
                }
            });
    }
}

function loadCategoriesData() {
    fetch("/api/categories").then(result => result.json()).then(result => {
        if (result.status === 200) {
            categories_data = result.categories;
        }
    });
}

function loadGroups() {
    fetch("/api/groups").then(result => result.json()).then(result => {
        if (result.status === 200) {
            groups = result.groups;
        }
    });
}

function manageSettings() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    let settingsWindow = document.getElementById("boardManager");
    settingsWindow.style.display = "flex";
}

function loadGroupsIntoHider() {
    let groupsSelector = document.getElementById("showHideGroups");
    groupsSelector.innerHTML = "";

    for (let i = 0; i < groups.length; i++) {
        let option = document.createElement("option");
        option.innerHTML = groups[i].title;
        option.value = groups[i].group_id;
        groupsSelector.appendChild(option);
    }
}

function hideShow() {
    let group_id = document.getElementById("showHideGroups").value;
    let hideShowOption = document.querySelector('.showHide:checked').value
    let board_id = window.location.href.split("/");

    board_id = board_id[board_id.length - 1];

    let notes = document.getElementsByClassName("note");
    let operation = "";

    fetch("/api/notegroups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                group_id: group_id,
                board_id: board_id
            })
        })
        .then(response => response.json())
        .then(response => {
            if (hideShowOption === "hide") {
                operation = "none";
            } else {
                operation = "block";
            }

            for (let i = 0; i < response.notes.length; i++) {
                for (let j = 0; j < notes.length; j++) {
                    if (notes[j].id == response.notes[i].note_id) {
                        notes[j].style.display = operation;
                    }
                }
            }

            toggleDialogManager(2);
            hideAllWindowsManagers();

        });
}

function showHideGroup() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    loadGroupsIntoHider();
    let showHideManager = document.getElementById("hideShowManager");
    showHideManager.style.display = "flex";
    clearContextMenu();
}

function manageNote() {
    toggleDialogManager(1);
    hideAllWindowsManagers();
    let noteWindow = document.getElementById("noteManager");
    noteWindow.style.display = "flex";
}

function hideAllWindowsManagers() {
    let windowManagers = document.getElementsByClassName("manager");
    for (let i = 0; i < windowManagers.length; i++) {
        windowManagers[i].style.display = "none";
    }
}