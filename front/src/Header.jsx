import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <div className='header'>
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                <Link to='/login'><span >LOGIN</span></Link>
            </div>
        </>
    )
}


export default Header