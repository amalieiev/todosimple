import { render, useParent } from "../core/index.js";
import { TodoItem } from "./TodoItem.js";

const showmodeFilter = (showmode) => (todo) => {
    if (showmode.value === "all") return true;
    if (showmode.value === "active") return todo.active;
    if (showmode.value === "completed") return !todo.active;
};

export function TodoList({ todos, showmode }) {
    useParent((el) => {
        el.querySelectorAll(".todo-item").forEach((todoEl, index) => {
            render(
                TodoItem,
                {
                    ...todos.value.filter(showmodeFilter(showmode))[index],
                    onRemove(id) {
                        todos.next(
                            todos.value.filter((todo) => todo.id !== id)
                        );
                        render(TodoList, { todos, showmode }, el);
                    },
                    onToggle(id, checked) {
                        todos.next(
                            todos.value.map((todo) => {
                                return todo.id === id
                                    ? { ...todo, active: !checked }
                                    : todo;
                            })
                        );
                        render(TodoList, { todos, showmode }, el);
                    },
                },
                todoEl
            );
        });
    });

    return `${todos.value
        .filter(showmodeFilter(showmode))
        .map((todo) => {
            return '<li class="todo-item"></li>';
        })
        .join("")}`;
}
