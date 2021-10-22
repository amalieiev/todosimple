import { TodoList } from "../components/TodoList.js";
import { render, useParent } from "../core/index.js";

export function TodosPage({ todos }) {
    useParent((el) => {
        el.querySelector("#add").addEventListener("click", () => {
            todos.next([
                ...todos.value,
                {
                    id: Date.now(),
                    title: el.querySelector('input[type="text"]').value,
                    active: true,
                },
            ]);

            render(TodoList, { todos }, el.querySelector("#todos"));
        });

        render(TodoList, { todos }, el.querySelector("#todos"));
    });

    return `
        <input type="text">
        <button id="add">Add</button>
        <ul id="todos"></ul>
    `;
}
