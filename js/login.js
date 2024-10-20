document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const loginInput = document.getElementById("login-input");
    const greeting = document.getElementById("greeting");
    const logoutButton = document.getElementById("logout-button");
    const toDoForm = document.getElementById("todo-form");
    const toDoList = document.getElementById("todo-list");

    function onLoginSubmit(event) {
        event.preventDefault();
        const loginIDValue = loginInput.value.trim();
        if (loginIDValue === "") return;

        localStorage.setItem("LoginID", loginIDValue);
        paintGreetings(loginIDValue);
    }

    function onLogout() {
        console.log("Logout button clicked"); 
        const currentLoginID = localStorage.getItem("LoginID");

        localStorage.removeItem("LoginID");
        localStorage.removeItem(`${currentLoginID}-todos`); 

        updateUIForLogout();
    }

    function updateUIForLogout() {
        greeting.classList.add("hidden");
        logoutButton.classList.add("hidden");
        loginButton.classList.remove("hidden");
        loginInput.classList.remove("hidden");
        toDoForm.classList.add("hidden");
        toDoList.innerHTML = "";
    }

 
    function paintGreetings(loginIDValue) {
        greeting.innerText = `Hello, ${loginIDValue}`;
        greeting.classList.remove("hidden");
        loginButton.classList.add("hidden");
        loginInput.classList.add("hidden");
        logoutButton.classList.remove("hidden");
        toDoForm.classList.remove("hidden");

        loadToDos(loginIDValue); 
    }

 
    function loadToDos(loginIDValue) {
        const savedToDos = localStorage.getItem(`${loginIDValue}-todos`);
        if (savedToDos) {
            const parsedToDos = JSON.parse(savedToDos);
            toDos = parsedToDos;
            parsedToDos.forEach(paintToDo);
        }
    }

    const savedLoginID = localStorage.getItem("LoginID");
    if (savedLoginID !== null) {
        paintGreetings(savedLoginID);
    }

    loginButton.addEventListener("click", onLoginSubmit);
    logoutButton.addEventListener("click", onLogout);
});
