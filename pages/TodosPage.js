import { TodoList } from "../components/TodoList.js";
import { Subject } from "../core/Subject.js";

export class TodoPage {
    constructor(props, el) {
        this.el = el || document.createElement("div");
        this.props = props;
    }

    render() {
        this.el.innerHTML = `
            <h2>Список дел</h2>
            <div class="todo-list"></div>
        `;

        const todoList = new TodoList(
            {
                todos: new Subject([
                    { id: 1, title: "купить хлеб", active: true },
                    { id: 2, title: "купить пиво", active: true },
                ]),
            },
            this.el.querySelector(".todo-list")
        );
        todoList.render();
    }
}
