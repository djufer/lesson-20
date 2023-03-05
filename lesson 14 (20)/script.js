let addUserButton = document.querySelector(".add-user-button");
let inpLogin = document.querySelector(".input-login");
let inpPassword = document.querySelector(".input-password");
let inpEmail = document.querySelector(".input-email");

addUserButton.addEventListener("click", addUser);
let getS = (sel) => document.querySelector(sel);
let arr = [];
function addUser() {
    let obj = {
        login: `${inpLogin.value}`,
        password: `${inpPassword.value}`,
        email: `${inpEmail.value}`,
    };
    arr.push(obj);
    inpLogin.value = "";
    inpPassword.value = "";
    inpEmail.value = "";

    render();
}

function render() {
    // створюємо рядок
    let tr = document.createElement("tr");
    document.querySelector("table").appendChild(tr);
    // створюємо  клітинки
    let tdNum = document.createElement("td");
    let tdLog = document.createElement("td");
    let tdPassw = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdEdit = document.createElement("td");
    let tdDelete = document.createElement("td");
    // створення тегів кнопок
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    // додаємо кнопкам відповідні класи
    editBtn.classList.add("edit-button");
    deleteBtn.classList.add("delete-button");
    // даємо назву кнопкам
    let nameEditBtn = document.createTextNode("Edit");
    let nameDeleteBtn = document.createTextNode("Delete");

    // вставляємо кнопку в клітинку
    tdEdit.appendChild(editBtn);
    tdDelete.appendChild(deleteBtn);

    // створюємо вміст клітинок
    let num = document.createTextNode(arr.length);
    let log = document.createTextNode(`${arr[arr.length - 1].login}`);
    let passw = document.createTextNode(`${arr[arr.length - 1].password}`);
    let email = document.createTextNode(`${arr[arr.length - 1].email}`);

    // вставляємо цей вміст у відповідні клітинки
    tdNum.appendChild(num);
    tdLog.appendChild(log);
    tdPassw.appendChild(passw);
    tdEmail.appendChild(email);

    editBtn.appendChild(nameEditBtn);
    deleteBtn.appendChild(nameDeleteBtn);

    // вставляємо всі клітинки у рядок tr

    tr.appendChild(tdNum);
    tr.appendChild(tdLog);
    tr.appendChild(tdPassw);
    tr.appendChild(tdEmail);
    tr.appendChild(tdEdit);
    tr.appendChild(tdDelete);

    //      видаленя рядка

    let deleteButtons = document.querySelectorAll(".delete-button");
    let deleteIndex;
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteUser);
        deleteIndex = i;
    }
    function deleteUser(event) {
        event.target.parentElement.parentElement.remove();
        arr.splice(deleteIndex, 1);
        console.log(arr);
        let rows = document.querySelectorAll("tr");
        for (let i = deleteIndex; i < rows.length; i++) {
            rows[i + 1].firstElementChild.textContent--;

            // -----тут матюкається firstElementChild, не знаю як зробити по іншому (
        }
    }
    // редагування рядка

    let editButtons = document.querySelectorAll(".edit-button");
    let rows = document.querySelectorAll("tr");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", () => {
            inpLogin.value = rows[i + 1].children[1].textContent;
            inpPassword.value = rows[i + 1].children[2].textContent;
            inpEmail.value = rows[i + 1].children[3].textContent;

            getS(".add-user-button").style.zIndex = "-1";
            getS(".edit-user-button").addEventListener("click", () => {
                rows[i + 1].children[1].textContent = inpLogin.value;
                rows[i + 1].children[2].textContent = inpPassword.value;
                rows[i + 1].children[3].textContent = inpEmail.value;

                inpLogin.value = "";
                inpPassword.value = "";
                inpEmail.value = "";
                getS(".add-user-button").style.zIndex = "1";
            });
        });
    }
    console.log(arr);
}
