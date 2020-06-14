import React, { useContext, useState, useEffect } from 'react'
import { Consumer } from './useLoggin'
import Axios from 'axios'


function PersonalPage() {
    const { personal, SERVER_PATH } = useContext(Consumer)
    const [user, setUser] = useState([])
    const [clicked,setClicked] = useState(false)

    useEffect(() => {
        Axios.get(`${SERVER_PATH}user/?email=${personal}`)
            .then(res => setUser(res.data))
    }, [personal,SERVER_PATH])

    function imgs() {
        let images =[ ]
        for (let i in user.album) {
        images.push({file:user.album[i].file, like:user.album[i].like })
        }
        return images
    }
    const images = imgs().map((item,index )=> <div key={index} className='imgWrapper2'>
            <div className='img'>
                <img src={`http://localhost:5000/pictures/${item.file}`} alt='img' />
                <div className='like2'>
                  {!clicked ? <i onClick={()=>handleLike(item.file)} className="fa fa-thumbs-o-up" aria-hidden="true"></i> : <i className="fa fa-thumbs-up " aria-hidden="true"></i>}  
                    <span>{item.like}</span>
                </div>
            </div>
        </div>)


    function handleLike(img) {
        const data = {
            email: user.email,
            img: img
        }
        Axios.post(`${SERVER_PATH}like`, data)
            .then(res => setUser(res.data))
            .then(setClicked(true))
    }
    return (
        !user ? '' :
            <>

                <h1 style={{ color: 'white', fontSize: '25px', padding:'20px'}}>{user.name} {user.surname }</h1>
                <div className='album'>
                    {images}
                </div>
            </>
    )
}

export default PersonalPage