import { LogoutButton } from "../components/LogoutButton.js";
import { useParent, render } from "../core/index.js";
import { Router } from "../navigation/Router.js";

export function Layout(props) {
    useParent((el) => {
        const onLogout = () => {
            localStorage.removeItem("token");
            location.hash = "login";
            render(
                LogoutButton,
                { onLogout },
                el.querySelector(".logout-button")
            );
        };

        const onLogin = () => {
            render(
                LogoutButton,
                { onLogout },
                el.querySelector(".logout-button")
            );
        };

        window.addEventListener("hashchange", () => {
            render(Router, { ...props, onLogin }, el.querySelector("#router"));
        });

        fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then((response) => response.json())
            .then((data) =>
                data.map((item) => {
                    return {
                        ...item,
                        active: !item.completed,
                        title: item.title.slice(0, 15),
                    };
                })
            )
            .then((data) => {
                props.todos.next(data);
                render(
                    Router,
                    { ...props, onLogin },
                    el.querySelector("#router")
                );
            });

        render(LogoutButton, { onLogout }, el.querySelector(".logout-button"));
        render(Router, { ...props, onLogin }, el.querySelector("#router"));
    });

    return `
        <div class="row between items-center">
            <p></p>
            <div class="logout-button"></div>
        </div>
        
        <div id="router"><div>
    `;
}
