let addUserButton = document.querySelector(".add-user-button");
let inpLogin = document.querySelector(".input-login");
let inpPassword = document.querySelector(".input-password");
let inpEmail = document.querySelector(".input-email");

addUserButton.addEventListener("click", addUser);
let getS = (sel) => document.querySelector(sel);
let arr = [];

// вілідація інпутів
let loginRegExp = /^[a-zA-Z]{4,16}$/;
let passwordRegExp = /^[\w_.-]{4,16}$/;
let emailRegExp = /^[\w.-]+@[\w.-]+$/;

inpLogin.addEventListener("input", () => {
    if (loginRegExp.test(inpLogin.value)) {
        inpLogin.classList.add("green-input");
        inpLogin.classList.remove("red-input");
    } else {
        inpLogin.classList.add("red-input");
        inpLogin.classList.remove("green-input");
    }
});
inpPassword.addEventListener("input", () => {
    if (passwordRegExp.test(inpPassword.value)) {
        inpPassword.classList.add("green-input");
        inpPassword.classList.remove("red-input");
    } else {
        inpPassword.classList.add("red-input");
        inpPassword.classList.remove("green-input");
    }
});
inpEmail.addEventListener("input", () => {
    if (emailRegExp.test(inpEmail.value)) {
        inpEmail.classList.add("green-input");
        inpEmail.classList.remove("red-input");
    } else {
        inpEmail.classList.add("red-input");
        inpEmail.classList.remove("green-input");
    }
});

// функція додавання інфи з інпутів у масив та рендер

function addUser(event) {
    // тут також перевіряємо чи все правильно заповнено
    if (
        loginRegExp.test(inpLogin.value) &&
        passwordRegExp.test(inpPassword.value) &&
        emailRegExp.test(inpEmail.value)
    ) {
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
    } else {
        alert("заповніть правильно поля");
    }
}

//  ф-ція створення дом елементів таблиці і додавання туди інфи з масиву
function render() {
    document.querySelector("tbody").textContent = "";
    for (let i = 0; i < arr.length; i++) {
        // створюємо рядок
        let tr = document.createElement("tr");
        document.querySelector("tbody").appendChild(tr);
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
        // додаємо відповідні класи
        editBtn.classList.add("edit-button");
        deleteBtn.classList.add("delete-button");
        // даємо назву кнопкам
        let nameEditBtn = document.createTextNode("Edit");
        let nameDeleteBtn = document.createTextNode("Delete");

        // вставляємо кнопку в клітинку
        tdEdit.appendChild(editBtn);
        tdDelete.appendChild(deleteBtn);

        // створюємо вміст клітинок
        let num = document.createTextNode(i + 1);
        let log = document.createTextNode(`${arr[i].login}`);
        let passw = document.createTextNode(`${arr[i].password}`);
        let email = document.createTextNode(`${arr[i].email}`);

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
    }
    //      видаленя рядка
    let delButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < delButtons.length; i++) {
        delButtons[i].addEventListener("click", () => {
            arr.splice(i, 1);
            render();
        });
    }

    // редагування рядка

    let editButtons = document.querySelectorAll(".edit-button");
    // let rows = document.querySelectorAll("tr");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", () => {
            inpLogin.value = arr[i].login;
            inpPassword.value = arr[i].password;
            inpEmail.value = arr[i].email;
            getS(".add-user-button").style.zIndex = "-1";

            getS(".edit-user-button").addEventListener("click", () => {
                arr.splice(i, 1, {
                    login: `${inpLogin.value}`,
                    password: `${inpPassword.value}`,
                    email: `${inpEmail.value}`,
                });

                inpLogin.value = "";
                inpPassword.value = "";
                inpEmail.value = "";
                getS(".add-user-button").style.zIndex = "1";
                render();
            });
        });
    }
}
