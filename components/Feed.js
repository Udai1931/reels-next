import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/auth';
import { db } from '../firebase';
import Navbar from './Navbar'
import Post from './Post';
import Upload from './Upload'

function Feed() {

    const { user } = useContext(AppContext);
    const [userData, setUserData] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(user.uid)
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            console.log(doc.data());
            setUserData(doc.data())
        })

        return () => {
            unsub();
        }
    }, [user])

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "posts"), orderBy('timestamp', "desc")), (snapshot) => {
            let tempArray = []
            snapshot.docs.map((doc) => {
                tempArray.push(doc.data())
            })
            setPosts([...tempArray])
            console.log(tempArray)
        })
        return () => {
            unsub();
        }
    }, [])


    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }

    let observer = new IntersectionObserver(callback,{threshold:0.6});

    useEffect(()=>{
        const elements = document.querySelectorAll(".video-container video");
        elements.forEach((element)=>{
            observer.observe(element)
        })
        return ()=>{
            observer.disconnect();
        }
    },[posts])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Navbar userData={userData} />
            </div>
            <div>
                <Upload userData={userData} />
            </div>
            <div className='posts-container'>
                {
                    posts.map((post, idx) => (
                        <Post postData={post} idx={idx} />
                    ))
                }
            </div>
        </div>
    )
}

export default Feed
