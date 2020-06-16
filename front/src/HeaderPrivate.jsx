import React, { useState } from 'react'
import { Consumer } from './useLoggin'
import { useContext } from 'react'
import Axios from 'axios'
import { Link,  } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';

function HeaderPrivate() {
    const { user, handleRedirect, setLoggedIn, search, setSearch, SERVER_PATH, setConfirmation } = useContext(Consumer)

    const [results, setResults] = useState([])
    const [toggle, setToggle] = useState(false)



    function handleToggle() {
        setToggle(prev => !prev)
    }

    function handleLoggOut() {
        setLoggedIn(false)
        Axios.post(`${SERVER_PATH}logout`)
    }
    function handleSearch(e) {
        const { value } = e.target
        setSearch(value)
        if (value.length >= 2) {
            Axios.get(`${SERVER_PATH}search/?email=${value}`)
                .then(res => setResults(res.data))
        }
    }
    function handleDelete() {
        setConfirmation(true)
        confirmAlert({
            title: 'confirm to submit',
            message: 'Are you sure to delete your account? you will not be able to restore information',
            buttons: [
                {
                    label: 'Yes',
                    className: 'yes',
                    onClick() {
                        setLoggedIn(false)
                        Axios.delete(`${SERVER_PATH}delete/${user.email}`)
                        setConfirmation(false)

                    }
                },
                {
                    label: 'No',
                    className: 'no',
                    onClick() {
                        setConfirmation(false)
                        return false
                    }

                }
            ]
        })
    }
    const resultList = results.map((item, index) => <Link key={index} to={`/${(item)}`} onClick={() => handleRedirect(item)}>{item}</Link>)
    return (
     
      <> 
            <div className='headerPrivate'>
                <Link to={`/private/${user.name}${user.surname}`}> <h1>Welcome {user.name} {user.surname} !</h1></Link>
                <div className='search'>
                    <form action="">
                        <input type="text" value={search} onChange={handleSearch} />
                    </form>
                    <div className='results'>
                        {search.length > 0 ? resultList : ''}
                    </div>
                </div>
                <div>
                    <i onClick={handleToggle} className="fa fa-sort-desc" aria-hidden="true"></i>
                    <div className={`${toggle ? 'flex' : 'none'} menu`}>
                        <Link to='/'><button onClick={handleLoggOut}>Logout</button></Link>
                        <Link to='/'><button onClick={handleDelete}>Remove Account</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}


export default HeaderPrivate