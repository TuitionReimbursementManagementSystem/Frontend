import { Outlet } from "react-router-dom";


export default function Messages() {


    return(
        <article>
            <h1>Messages Page</h1>
            <hr />
            <Outlet />
        </article>
    )
}