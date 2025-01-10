import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../features/users/userSlice";


export default function Login() {

    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    // Update credentials object based on user input:
    const handleChange = ((e) => {
        setCredentials(prevCredentials => ({...prevCredentials, [e.target.name]: e.target.value}));
    });

    // Attempt to log in when form is submitted:
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(setCurrentUser(credentials));
    };

    return(
        <article>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form--field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        aria-label="Enter username"
                        required
                    />
                </div>
                <div className="form--field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        aria-label="Enter password"
                        required
                    />
                </div>
                <button className="form--button">Login</button>
            </form>
        </article>
    )
}