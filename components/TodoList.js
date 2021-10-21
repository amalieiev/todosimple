import { TodoItem } from "./TodoItem.js";

export class TodoList {
    constructor(props, el) {
        this.el = el || document.createElement("div");
        this.props = props;
    }

    render() {
        this.el.innerHTML = "";
        this.props.todos.value.forEach((todo) => {
            const todoItem = new TodoItem(todo);
            todoItem.render();
            this.el.appendChild(todoItem.el);
        });
    }
}
