import React, { useContext } from 'react'
import { Consumer } from './useLoggin'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Axios from 'axios'

function Private() {
    const { user, setLoggedIn } = useContext(Consumer)


    function handleLoggOut() {
        setLoggedIn(false)
        Axios.post('http://localhost:5000/logout')
    }
    function handleDelete() {
        setLoggedIn(false)
        Axios.delete(`http://localhost:5000/delete/${user.email}`)
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='private'>
            <h1>Welcome {user.name} {user.surname} !</h1>
            <div>
                <Link to='/'><button onClick={handleLoggOut}>Logout</button></Link>
                <Link to='/'><button onClick={handleDelete}>Remove Account</button></Link>
            </div>
        </motion.div>
    )
}


export default Private