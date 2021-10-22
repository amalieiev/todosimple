import { Subject, render } from "./core/index.js";
import { TodosPage } from "./pages/TodosPage.js";

render(
    TodosPage,
    {
        todos: new Subject([
            { id: 1, title: "Learn JS", active: true },
            { id: 2, title: "Learn English", active: false },
        ]),
    },
    document.getElementById("root")
);

render(
    TodosPage,
    {
        todos: new Subject([
            { id: 1, title: "Learn JS", active: true },
            { id: 2, title: "Learn English", active: false },
        ]),
    },
    document.getElementById("root-2")
);
