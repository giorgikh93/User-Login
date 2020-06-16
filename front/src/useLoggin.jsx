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
    const [personal, setPersonal] = useState('')
    const [confirmation, setConfirmation] = useState(false)
    const [search, setSearch] = useState('')

    const unknownRef = useRef()


    function reset() {
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
        let isSubscribed = true
        Axios.get(LOGIN_URL)
            .then(res => {
                if (isSubscribed) {
                    if (res.data === 'Unknown user') {
                        return <Redirect to='/' />
                    } else if (res.data !== 'Unknown user') {
                        setUser(res.data)
                        setLoggedIn(true)
                    }
                }
            })
        return () => isSubscribed = false
    }, [])
    function handleRedirect(email) {

        Axios.get(`http://localhost:5000/searchByEmail/?email=${email}`)
            .then(res => setPersonal(res.data))
            .then(setSearch(''))
    }
    const SERVER_PATH = 'http://localhost:5000/'


    return (
        <Context.Provider value={{
            setEmail,
            setPassword,
            loggedIn,
            setLoggedIn,
            handleLogin,
            email,
            password, confirmation, setConfirmation,
            user, SERVER_PATH,
            unKnownUser, search, setSearch,
            unknownRef, handleRedirect, personal
        }}>
            {props.children}
        </Context.Provider>
    )

}



export { ContextProvider, Context as Consumer }