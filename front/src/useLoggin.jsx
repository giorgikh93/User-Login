import React, { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'



const Context = React.createContext()

function ContextProvider(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState('')
    const [unKnownUser, setUnknownUser] = useState('')

    const unknownRef = useRef()


    function reset(){
        setEmail('')
        setPassword('')
    }


    const LOGIN_URL = 'http://localhost:5000/login'
    function handleLogin(e) {
        e.stopPropagation()
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }
        Axios.post(LOGIN_URL, data)
            .then(res => {
                setUser(res.data)
                if (res.data === 'Unknown user') {
                    setUnknownUser(res.data)
                    unknownRef.current.classList.remove('none')
                } else {
                    setLoggedIn(true)
                    reset()
                }
            })
    }

    useEffect(() => {
        Axios.get(LOGIN_URL)
            .then(res => {
                if (!res.data) {
                    return <Redirect to='/' />
                }
                setUser(res.data)
            })
    }, [])

    return (
        <Context.Provider value={{
            setEmail,
            setPassword,
            loggedIn,
            setLoggedIn,
            handleLogin,
            email,
            password,
            user,
            unKnownUser,
            unknownRef
        }}>
            {props.children}
        </Context.Provider>
    )

}



export { ContextProvider, Context as Consumer }