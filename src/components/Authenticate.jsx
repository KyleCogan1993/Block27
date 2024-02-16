import React from 'react'
import {useState} from 'react'

export default function Authenticate({token, setToken}) {
    
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    async function handleClick(event) {
        event.preventDefault();
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            });
            const json = await response.json();
            setSuccess(json.message);
        } catch(error) {
            setError(error.message);
        }
    }

    return (
    <>
        <h2>Authenticate</h2>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>Authenticate Token</button>
    </>
    );
}