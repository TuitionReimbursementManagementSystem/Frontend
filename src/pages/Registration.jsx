import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../features/users/userSlice";


export default function Registration() {

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.users);

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(formData));
    }


    return(
        <article>
            <h1>Register:</h1>
            <hr />
            <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            aria-label="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label>First name</label>
                        <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            aria-label="Enter first name"
                            required
                        />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            aria-label="Enter last name"
                            required
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-label="Enter email address"
                            required
                        />
                    </div>
                    <button className="form--button" type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                </form>

                {error && <p style={{color: 'red'}}>{ error }</p>}
                {user && <p style={{color: 'green'}}>Registration successful</p>}
            </section>
        </article>
    )
}