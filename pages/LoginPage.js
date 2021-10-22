import { useParent } from "../core/index.js";

export function LoginPage({ onLogin }) {
    useParent((el) => {
        el.querySelector("button").addEventListener("click", () => {
            gapi.load("auth2", () => {
                gapi.auth2
                    .init({
                        client_id:
                            "277836425026-d32flpp7m11qlkkaknfrn4485dqmkfd4.apps.googleusercontent.com",
                    })
                    .then((googleAuth) => {
                        const authResponse = googleAuth.currentUser
                            .get()
                            .getAuthResponse();
                        const token = authResponse.id_token;

                        console.log(token);

                        gapi.auth2
                            .getAuthInstance()
                            .signIn()
                            .then((user) => {
                                console.log(user.getAuthResponse());
                                localStorage.setItem(
                                    "token",
                                    user.getAuthResponse().id_token
                                );
                                location.hash = "todos";
                                onLogin();
                            });
                    });
            });
        });
    });

    return `
        <button>Login with Google</button>
    `;
}
