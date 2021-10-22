import { render, useParent } from "../core/index.js";
import { TodoItem } from "./TodoItem.js";

export function TodoList({ todos }) {
    useParent((el) => {
        el.querySelectorAll(".todo-item").forEach((todoEl, index) => {
            render(
                TodoItem,
                {
                    ...todos.value[index],
                    onRemove(id) {
                        todos.next(
                            todos.value.filter((todo) => todo.id !== id)
                        );
                        render(TodoList, { todos }, el);
                    },
                },
                todoEl
            );
        });
    });

    return `${todos.value.map(() => '<li class="todo-item"></li>').join("")}`;
}
