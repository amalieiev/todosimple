import { useParent, render } from "../core/index.js";
import { Router } from "../navigation/Router.js";

export function Layout(props) {
    useParent((el) => {
        window.addEventListener("hashchange", () => {
            render(Router, props, el.querySelector("#router"));
        });

        render(Router, props, el.querySelector("#router"));
    });

    return `
        <ul>
            <li>
                <a href="/#login" >login</a>
            </li>
            <li>
                <a href="/#todos">todos</a>
            </li>
            <li>
                <a href="/#edit">edit</a>
            </li>
        </ul>
        
        <div id="router"><div>
    `;
}
