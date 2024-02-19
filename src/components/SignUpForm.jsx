import React from 'react'
import {useState} from 'react'

export default function SignUpForm({token,setToken}) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [userValid, setUserValid] = useState(null);
    
    async function handleSubmit(event) {
        event.preventDefault();
        try{
            if(username.length > 9) {
                setError("Username must be 8 or less characters");
                return;
            }

            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: {username},
                    password: {password}
                })
            });
            const json = await response.json();
            setToken(json.token);
            setUserValid(username)
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p> }
            <form onSubmit={handleSubmit}>
                <label>Username: 
                    <input
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </label>
                <label>Password: 
                    <input
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>
                <button>Submit</button>

            </form>
            {userValid && <p>{username} is valid!</p>}
        </>
        );
}