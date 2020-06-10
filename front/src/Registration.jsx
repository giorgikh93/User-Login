import React, { useState, useRef } from 'react'
import Axios from 'axios'
import Header from './Header'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
Axios.defaults.withCredentials = true


function Registration() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [select, setSelect] = useState('Georgia')


    //REFs
    const warnRef = useRef()
    //

    const REGISTRATION = 'http://localhost:5000/register'

    function handleChange(e) {
        const { value } = e.target
        setSelect(value)

    }

    function handleRegister(e) {
        e.stopPropagation()
        e.preventDefault()
        const data = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            country: select,
        }
        Axios.post(REGISTRATION, data)
            .then(res => setSuccess(res.data))
    }

    function handleBlur() {
        if (!email.includes('@')) {
            warnRef.current.classList.remove('none')
        }
        if (email.length < 7) {
            warnRef.current.classList.remove('none')
        }
    }

    function handleFocus() {
        if(success === 'User already exists'){
            setSuccess('')
        }
        warnRef.current.classList.add('none')
    }

    return (
        success === 'success' ? <Redirect to='/' /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Header />
                <div className='register'>
                    <h1>Registration</h1>
                    <form action="" className='registration-form'>
                        <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type='text' placeholder='Surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
                        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} onFocus={handleFocus} />
                        <span style={{ color: 'red' }} className='none' ref={warnRef}>You must enter valid email</span>
                        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <select onChange={handleChange} value={select}>
                            <option value='Georgia'>Georgia</option>
                            <option value='English'>English</option>
                            <option value='Arab'>Arab</option>
                        </select>
                        <span style={{ color: 'red' }}>{success === 'User already exists' && 'User with this email already exists'}</span>

                        <div className='button'>
                            <button disabled={!password} type='button' onClick={handleRegister}>Register</button>
                        </div>
                    </form>
                </div>

            </motion.div>
    )

}
export default Registration