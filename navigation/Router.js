import { render, useParent } from "../core/index.js";
import { EditPage } from "../pages/EditPage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { TodosPage } from "../pages/TodosPage.js";

export function Router(params) {
    const hash = location.hash;

    useParent((el) => {
        if (/login/.test(hash)) {
            render(LoginPage, {}, el);
            return;
        }

        if (/edit/.test(hash)) {
            render(EditPage, {}, el);
            return;
        }

        render(TodosPage, params, el);
    });
}
