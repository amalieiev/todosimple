import { useParent } from "../core/index.js";

export function TodoItem({ title, id, active, onRemove, onToggle }) {
    useParent((el) => {
        el.querySelector(".remove").addEventListener("click", () => {
            onRemove(id);
        });

        el.querySelector("input").addEventListener("change", (event) => {
            onToggle(id, event.target.checked);
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
