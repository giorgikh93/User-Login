import React, { useContext, useState, useEffect,useRef } from 'react'
import { Consumer } from './useLoggin'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import { confirmAlert } from 'react-confirm-alert';
import Axios from 'axios'

function Private() {
    const { user, setLoggedIn, loggedIn } = useContext(Consumer)
    const [toggle, setToggle] = useState(false)
    const [file, setFile] = useState(null)
    const [img, setImg] = useState([])
    const [search, setSearch] = useState('')
    const [results,setResults] = useState('')


    const likeRef= useRef()
    const likedRef = useRef()

    const SERVER_PATH = 'http://localhost:5000/'


    function handleToggle() {
        setToggle(prev => !prev)
    }

    function handleLoggOut() {
        setLoggedIn(false)
        Axios.post(`${SERVER_PATH}logout`)
    }
    function handleDelete() {
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

                    }
                },
                {
                    label: 'No',
                    className: 'no',
                    onClick: () => (false)
                }
            ]
        })


    }
    function handleUpload(e) {
        e.stopPropagation()
        e.preventDefault()
        let formData = new FormData()
        formData.append('image', file)
        formData.append('user', user.email)
        Axios.post(`${SERVER_PATH}upload`, formData)
            .then(res => setImg(res.data))
            .then(setFile(null))

    }
    useEffect(() => {
        let isSubscribed = true
        Axios.get(`${SERVER_PATH}upload/${user.email}`)

            .then(res => {
                if (isSubscribed) {
                    setImg(res.data)
                }
            })
        return () => isSubscribed = false
    }, [user.email])

    function handleLike(img,e) {
  
        const data = {
            email: user.email,
            img: img
        }
        Axios.post(`${SERVER_PATH}like`, data)
            .then(res => setImg(res.data))
            likeRef.current.classList.add('none')
           likedRef.current.classList.remove('none')
    }
    function handleImgDelete(img) {
        let data = {
            user: user,
            img: img
        }
        Axios.delete(`${SERVER_PATH}deleteImg`, { data })
            .then(res => setImg(res.data))
    }


    function handleSearch(e) {
        const { value } = e.target
        setSearch(value)
        if(value.length >= 2){
            Axios.get(`${SERVER_PATH}search/?email=${value}`)
            .then(res=>setResults(res.data))
        }
    }

    const image = img.length > 0 ? img.map((img, index) =>
    <div key={index} className='imgWrapper'>
         <div className='img'><img src={`http://localhost:5000/pictures/${img.file}`} alt='img' />
         <div className='like'>
             <i ref={likeRef}  onClick={() => handleLike(img.file)} className="fa fa-thumbs-o-up" aria-hidden="true"></i> 
             <i ref={likedRef}  className="fa fa-thumbs-up none" aria-hidden="true"></i> 
             <span>{img.like}</span> 
         </div><button className='delete' onClick={() => handleImgDelete(img.file)}> Delete</button></div></div>) : ''

    return (
        !loggedIn ? <Redirect to='/' /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='private'>
                <div className='headerPrivate'>
                    <h1>Welcome {user.name} {user.surname} !</h1>
                    <div className='search'>
                        <form action="">
                            <input type="text" value={search} onChange={handleSearch} />
                        </form>
                        <div className='results'>{search.length > 0 ? results : ''}</div>
                    </div>
                    <div>
                        <i onClick={handleToggle} className="fa fa-sort-desc" aria-hidden="true"></i>
                        <div className={`${toggle ? 'flex' : 'none'} menu`}>
                            <Link to='/'><button onClick={handleLoggOut}>Logout</button></Link>
                            <Link to='/'><button onClick={handleDelete}>Remove Account</button></Link>
                        </div>
                    </div>
                </div>
                <div className='albumWrapper'>
                    <div className='album'>
                        {image}
                    </div>
                    <form action="" className='form'>
                        <input style={{ color: 'white' }} type='file' className='fileUploadForm' onChange={(e) => setFile(e.target.files[0])} />
                        <button onClick={handleUpload}>Upload</button>
                    </form>
                </div>
            </motion.div>
    )
}



export default Private