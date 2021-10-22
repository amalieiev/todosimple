import { render, useParent } from "../core/index.js";
import { EditPage } from "../pages/EditPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { TodosPage } from "../pages/TodosPage.js";

export function Router({ todos, onLogin }) {
    const hash = location.hash;

    const token = localStorage.getItem("token");
    if (!token) {
        location.hash = "/login";
    }

    useParent((el) => {
        if (/login/.test(hash)) {
            render(LoginPage, { onLogin }, el);
            return;
        }

        if (/edit/.test(hash)) {
            render(EditPage, { todos }, el);
            return;
        }

        render(TodosPage, { todos }, el);
    });
}
