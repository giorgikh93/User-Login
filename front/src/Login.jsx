import React, { useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Consumer } from './useLoggin'
import {motion} from 'framer-motion'


function Login() {

    const {
        setEmail,
        setPassword,
        handleLogin,
        loggedIn,
        email,
        password,
        user,
        unknownRef,
    } = useContext(Consumer)

    function privateRoute() {
        if (user !== undefined) {
            return `/private/${user.name}${user.surname}`
        } else {
            return '/'
        }
    }

    function handleFocus() {
        unknownRef.current.classList.add('none')
    }
    return (
        loggedIn ? <Redirect to={privateRoute()} /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='login'>
                <h1>Login</h1>
                <form >
                    <input type='text' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} onFocus={handleFocus}/>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span style={{ color: 'red' }}  className='none' ref={unknownRef}>Unknown user!</span>
                    <button type='button' onClick={handleLogin}>Login</button>
                </form>
                <div className='registration'><Link to='/registration'>Registration</Link></div >
            </motion.div>
    )
}


export default Login