import { useParent } from "../core/index.js";

export function LoginPage({ onLogin }) {
    useParent((el) => {
        el.querySelector("button").addEventListener("click", () => {
            localStorage.setItem("token", "secret token");
            location.hash = "todos";
            onLogin();
        });
    });

    return `
        <input type="text">
        <button>login</button>
    `;
}
