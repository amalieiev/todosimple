import { TodoList } from "../components/TodoList.js";
import { render, Subject, useParent } from "../core/index.js";

export function TodosPage({ todos }) {
    const showmode = new Subject("all");

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

            render(TodoList, { todos, showmode }, el.querySelector("#todos"));
        });

        el.querySelectorAll(['[name="showmode"]']).forEach((radio) => {
            radio.addEventListener("change", (event) => {
                showmode.next(event.target.value);

                render(
                    TodoList,
                    { todos, showmode },
                    el.querySelector("#todos")
                );
            });
        });

        render(TodoList, { todos, showmode }, el.querySelector("#todos"));
    });

    return `
        <input type="text">
        <button id="add">Add</button>
        <div>
            <label>
                <input type="radio" name="showmode" value="all" >
                All
            </label>
            <label>
                <input type="radio" name="showmode" value="active" >
                Active
            </label>
            <label>
                <input type="radio" name="showmode" value="completed" >
                Completed
            </label>
        </div>
        <ul id="todos"></ul>
    `;
}
