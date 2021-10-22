import { useParent } from "../core/index.js";

export function TodoItem({ title, id, active, onRemove }) {
    useParent((el) => {
        el.querySelector(".remove").addEventListener("click", () => {
            onRemove(id);
        });
    });

    return `
        <label>
            <input type="checkbox" ${active ? "" : "checked"}>
            ${title}
        </label>
        <button class="remove">Remove</button>
    `;
}
