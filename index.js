let todos = [
    { id: 1, title: "купить хлеб", active: true },
    { id: 2, title: "купить пиво", active: true },
];

let radio = "all"; // all,active,completed

let effects = [];

const styles = {
    row: "display: flex; flex-direction: row;",
    column: "display: flex; flex-direction: column;",
    between: "display: flex; justify-content: space-between;",
    center: "justify-content: center;",
    start: "justify-content: flex-start;",
    end: "justify-content: flex-end;",
};

window.addEventListener("hashchange", () => {
    render();
});

function render() {
    document.getElementById("root").innerHTML = Layout();
}

function addTodo(ref) {
    const title = document.querySelector(`[data-ref="${ref}"]`).value;

    todos = [
        ...todos,
        {
            id: Date.now(),
            title: title,
            active: true,
        },
    ];

    render();
}

function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    render();
}

function cancelEdit() {
    location.hash = "/";
}

function saveEdit(id, ref) {
    const title = document.querySelector(`[data-ref="${ref}"]`).value;

    todos = todos.map((todo) => {
        return todo.id === id ? { ...todo, title } : todo;
    });

    location.hash = "/";
}

function useEffect(callback, deps) {
    effects.push({
        callback,
        deps,
    });
}

function editTodo(id) {
    location.hash = `/edit/${id}`;
}

function toggleActive(id) {
    todos = todos.map((todo) => {
        return todo.id === id ? { ...todo, active: !todo.active } : todo;
    });
}

function signIn() {
    navigate("/");
}

function signOut() {
    navigate("/login");
}

function showAll() {
    radio = "all";
    render();
}
function showActive() {
    radio = "active";
    render();
}
function showCompleted() {
    radio = "completed";
    render();
}

function navigate(path) {
    location.hash = path;
}

function Router() {
    const hash = location.hash;

    switch (true) {
        case /login/.test(hash):
            return LoginPage();
        case /edit/.test(hash):
            return EditPage();
        default:
            return TodosPage();
    }
}

function Layout() {
    return `
        <header style="${styles.between}">
            <div>Важные дела</div>
            <div>
                <button onclick="navigate('/')">log in</button>
                <button onclick="navigate('/login')">log out</button>
            </div>
        </header>
        ${Router()}
        <footer></footer>
    `;
}

function LoginPage() {
    return `
        <div style="${styles.row}${styles.center}margin-top: 100px;">
            <input>
            <button onclick="signIn()">Войти</button>
        </div>
        
    `;
}

function EditPage() {
    const value = +location.hash.match(/\d+$/);
    const todo = todos.find((item) => item.id === value);
    const ref = Math.random();

    return `
        <h2>Редактировать дело</h2>
        <input type="text" data-ref=${ref} value="${todo.title}" >
        <button onclick="cancelEdit()">Отмена</button>
        <button onclick="saveEdit(${todo.id}, ${ref})">Сохранить</button>
    `;
}

function TodosPage() {
    const ref = Math.random();

    return `
        <input data-ref="${ref}" type="text">
        <button onclick="addTodo(${ref})">Добавить</button>
        <p>Список дел</p>
        <p>
            <label>
                <input onchange="showAll()" type="radio" name="radio" value="all" ${
                    radio == "all" ? "checked" : ""
                }>
                Все
            </label>
            <label>
                <input onchange="showActive()" type="radio" name="radio" value="active" ${
                    radio == "active" ? "checked" : ""
                }>
                Активные
            </label>
            <label>
                <input onchange="showCompleted()" type="radio" name="radio" value="completed" ${
                    radio == "completed" ? "checked" : ""
                }>
                Законченные
            </label>
        </p>
        <ul>
            ${TodoList()}
        </ul>
    `;
}

function TodoList() {
    return todos
        .filter((todo) => {
            if (radio === "all") {
                return true;
            }
            if (radio === "active") {
                return todo.active;
            }
            if (radio === "completed") {
                return !todo.active;
            }
        })
        .map((todo) => {
            return `
            <li>
                <label>
                    <input onchange="toggleActive(${
                        todo.id
                    })" type="checkbox" ${!todo.active ? "checked" : ""} >
                    ${todo.title}
                </label>
                <button onclick="editTodo(${todo.id})">редактировать</button>
                <button onclick="removeTodo(${todo.id})">удалить</button>
            </li>
        `;
        })
        .join("");
}

render();
