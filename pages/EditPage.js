import { useParent } from "../core/index.js";

export function EditPage({ todos }) {
    const id = location.hash.match(/\d+$/)[0];
    const current = todos.value.find((item) => item.id === +id);

    useParent((el) => {
        el.querySelector('[data-action="cancel"]').addEventListener(
            "click",
            () => {
                location.hash = "todos";
            }
        );

        el.querySelector('[data-action="save"]').addEventListener(
            "click",
            () => {
                todos.next(
                    todos.value.map((todo) => {
                        return todo.id === +id
                            ? {
                                  ...todo,
                                  title: el.querySelector("input").value,
                              }
                            : todo;
                    })
                );

                location.hash = "todos";
            }
        );
    });

    return `
        <input type="text" value="${current.title}">
        <button data-action="cancel">cancel</button>
        <button data-action="save">save</button>
    `;
}
