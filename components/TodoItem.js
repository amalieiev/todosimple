import { useParent } from "../core/index.js";

export function TodoItem({ title, id, active, onRemove, onToggle }) {
    useParent((el) => {
        el.querySelector(".remove").addEventListener("click", () => {
            onRemove(id);
        });

        el.querySelector("input").addEventListener("change", (event) => {
            onToggle(id, event.target.checked);
        });

        el.querySelector("label").addEventListener("click", () => {
            location.hash = `edit/${id}`;
        });
    });

    return `
        <input type="checkbox" ${active ? "" : "checked"}>
        <label>${title}</label>
        <button class="remove">Remove</button>
    `;
}
