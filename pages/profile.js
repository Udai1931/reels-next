import { Avatar } from '@mui/material';
import { doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { AppContext } from '../context/auth';
import { db } from '../firebase';

function Profile() {

    const { user } = useContext(AppContext);
    const [userData, setUserData] = useState({})
    const [postsid, setPostsid] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(user.uid)
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log(doc.data());
            setUserData(doc.data())
            setPostsid(doc.data().posts)
        })

        return () => {
            unsub();
        }
    }, [user])

    useEffect(async () => {
        let tempArray = []
        postsid.map(async (postid,idx) => {
            const unsub = onSnapshot(doc(db, "posts", postid), (doc) => {
                // console.log(doc.data());
                tempArray.push(doc.data())
                console.log(tempArray)
                setPosts([...tempArray])
            })
        })
    }, [postsid])




    return (
        <div>
            <Navbar userData={userData} />
            <div className='container'>
                <div className='profile-upper'>
                    <img src={userData?.profileUrl} style={{ width: "8rem", height: "8rem", borderRadius: "50%" }} />
                    <div style={{ flexBasis: "40%" }}>
                        <h1>{userData.name}</h1>
                        <h3>Posts : {userData?.posts?.length}</h3>
                    </div>
                </div>
                <hr />
                <div className='profile-videos-container'>
                    {console.log(posts.length)}
                    {
                        posts.map((post,idx)=>(
                            <video key={idx} src={post.postUrl}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile