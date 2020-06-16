import React, { useContext, useState, useEffect } from 'react'
import { Consumer } from './useLoggin'
import Axios from 'axios'


function PersonalPage() {
    const { personal, SERVER_PATH, user } = useContext(Consumer)
    const [usr, setUsr] = useState([])
    const [likesArr, setLikesArr] = useState([])

    useEffect(() => {
        Axios.get(`${SERVER_PATH}user/?email=${personal}`)
            .then(res => setUsr(res.data))
    }, [personal, SERVER_PATH])

    useEffect(() => {
        Axios.get(`${SERVER_PATH}likes/?email=${usr.email}`)
            .then(res => setLikesArr(res.data))
    }, [SERVER_PATH, usr.email])

    function imgs() {
        let images = []
        for (let i in usr.album) {
            images.push({ file: usr.album[i].file, like: usr.album[i].like })
        }
        return images
    }



    function like(file) {
        for (let i of likesArr) {
            if (i.file === file) {
                for (let j of i.like) {
                    if (j === user.email) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }
    const images = imgs().map((item, index) => <div key={index} className='imgWrapper2'>
        <div className='img'>
            <img src={`http://localhost:5000/pictures/${item.file}`} alt='img' />
            <div className='like2'>
                {!like(item.file) ? <i onClick={() => handleLike(item.file)} className="fa fa-thumbs-o-up" aria-hidden="true"></i> :
                    <>
                        <i className="fa fa-thumbs-up " aria-hidden="true"  onClick={() => handleLike(item.file)}></i>
                        <span>{item.like.length}</span>
                    </>}
            </div>
        </div>
    </div>)

    function handleLike(img) {
        const data = {
            email: usr.email,
            user: user,
            img: img
        }
        Axios.post(`${SERVER_PATH}like`, data)
            .then(res => setLikesArr(prev => [...prev, res.data]))
    }
    return (
        !usr ? '' :
            <>
                <h1 style={{ color: 'white', fontSize: '25px', padding: '20px' }}>{usr.name} {usr.surname}</h1>
                <div className='album'>
                    {images}
                </div>
            </>
    )
}

export default PersonalPage