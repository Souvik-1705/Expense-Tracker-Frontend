import React, { useState } from 'react'

const Register = ({ onRegister, goToLogin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            onRegister(data.user);
        }
        else {
            alert(data.message);
        }
    }

    return (
        <div className='register'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Register</button>
                <p>
                    Already registered?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={goToLogin}
                    >
                        Login here
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Register