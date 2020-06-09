import React, { useState } from 'react'
import Axios from 'axios'
Axios.defaults.withCredentials = true


function Registration() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')



    const REGISTRATION = 'http://localhost:5000/register'
    function handleRegister(e) {
        e.stopPropagation()
        e.preventDefault()
        const data = {
            name: name,
            surname: surname,
            email: email,
            password: password,
        }
        Axios.post(REGISTRATION, data)
            .then(res => setSuccess(res.data))
    }




    return (
        <div className='register'>

                <h1>Registration</h1>
                <form action="" className='registration-form'>
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='text' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <select>
                        <option value='Georgia'>Georgia</option>
                        <option value='English'>English</option>
                        <option value='Arab'>Arab</option>
                    </select>
                    <div className='button'>
                        <button type='button' onClick={handleRegister}>Register</button>
                    </div>
                </form> 
        </div>

    )

    }
    export default Registration