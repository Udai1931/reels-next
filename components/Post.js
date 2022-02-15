import { Avatar } from '@mui/material'
import React, { useContext } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppContext } from '../context/auth';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactDom from 'react-dom';
import {useRef} from 'react'

function Post(props) {

    const [like,setLike] = React.useState(false)
    const {user} = useContext(AppContext)
    const videoRef = useRef(null)

    React.useEffect(()=>{
        if(props.postData.likes.includes(user.uid)){
            setLike(true)
        }else{
            setLike(false)
        }
    },[props])

    const handleLike = async() => {
        if(!like){
            await updateDoc(doc(db,"posts",props.postData.postId),{
                likes: arrayUnion(user.uid)
            })
            console.log("liked")
        }else{
            await updateDoc(doc(db,"posts",props.postData.postId),{
                likes: arrayRemove(user.uid)
            })
            console.log("unliked")
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleScroll = (e) => {
        let next = videoRef.current.parentNode.nextSibling
        if(next){
            next.scrollIntoView({behaviour:"smooth"})
            e.target.muted = true
        }
    }

    return (
        <div className='video-container' style={{display:"flex"}}>
            <video ref={videoRef} src={props.postData.postUrl} muted onClick={handleClick} onEnded={handleScroll} />
            <div className='video-info'>
                <div style={{display:"flex",alignItems:"center",fontWeight:"bold"}}>
                    {props.postData.likes.length > 0 && props.postData.likes.length} <FavoriteIcon style={ !like ? {marginLeft:"0.5rem",color:"white"} : {marginLeft:"0.5rem",color:"red"}} onClick={handleLike} />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Avatar alt="Remy Sharp" src={props.postData.profileUrl} />
                    <h3 style={{marginLeft:'1rem'}}>{props.postData.profileName}</h3>
                </div>

            </div>
        </div>
    )
}

export default Post