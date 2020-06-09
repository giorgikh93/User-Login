import React, { useState } from 'react'
import Axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState()

    function handleLogin(e) {
        e.stopPropagation()
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        Axios.post('http://localhost:5000/login', data)
            .then(res => setUser(res.data))
    }
    console.log(user)
    return (
        <div className='login'>
            <h1>Login</h1>
            <form >
                <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='button' onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}


export default Login