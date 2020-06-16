import React, { useContext, useState, useEffect} from 'react'
import { Consumer } from './useLoggin'
import { Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import Axios from 'axios'

function Private() {
    const { user, loggedIn, confirmation } = useContext(Consumer)
    const [file, setFile] = useState(null)
    const [img, setImg] = useState([])

    
    const SERVER_PATH = 'http://localhost:5000/'


    function handleUpload(e) {
        e.stopPropagation()
        e.preventDefault()
        let formData = new FormData()
        console.log(file)
        formData.append('image', file)
        formData.append('user', user.email)
        Axios.post(`${SERVER_PATH}upload`, formData)
            .then(res => setImg(res.data))
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

    function handleImgDelete(img) {
        let data = {
            user: user,
            img: img
        }
        Axios.delete(`${SERVER_PATH}deleteImg`, { data })
            .then(res => setImg(res.data))
    }

   

    const image = img.length > 0 ? img.map((img, index) =>
        <div key={index} className='imgWrapper' >
            <div className='img'><img src={`${SERVER_PATH}pictures/${img.file}`} alt='img' />
                <div className='like ' >
                    <div>{img.like.length === 0 ? 'There is no likes yet' :  `${img.like.length} person likes this photo `}</div>
                </div>
                <button className='delete' onClick={() => handleImgDelete(img.file)}> Delete</button>
            </div>
        </div>) : ''
    return (
        !loggedIn || !user.name ? <Redirect to='/' /> :
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='private'>
                <div className={`albumWrapper ${confirmation ? 'opacity' : ''}`}>
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