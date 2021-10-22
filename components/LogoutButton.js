import { useParent } from "../core/index.js";

export function LogoutButton({ onLogout }) {
    const token = localStorage.getItem("token");

    if (!token) return "";

    useParent((el) => {
        el.querySelector("button").addEventListener("click", onLogout);
    });

    return `
        <button data-action="logout">logout</button>
    `;
}
