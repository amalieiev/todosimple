import { useParent, render } from "../core/index.js";
import { Router } from "../navigation/Router.js";

export function Layout(props) {
    useParent((el) => {
        window.addEventListener("hashchange", () => {
            render(Router, props, el.querySelector("#router"));
        });

        el.querySelector('[data-action="login"]').addEventListener(
            "click",
            () => {
                location.hash = "todos";
            }
        );

        el.querySelector('[data-action="logout"]').addEventListener(
            "click",
            () => {
                location.hash = "login";
            }
        );

        render(Router, props, el.querySelector("#router"));
    });

    return `
        <div class="row between items-center">
            <p></p>
            <div class="row">
                <button data-action="login">login</button>
                <button data-action="logout">logout</button>
            </div>
        </div>
        
        <div id="router"><div>
    `;
}
