import * as React from 'react';
import insta from './insta.jpg';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useState, useContext, useEffect } from 'react';
import { Router } from 'next/router';
import { useRouter } from 'next/router';
import { AppContext } from '../context/auth';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function Sign() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { signup, user } = useContext(AppContext);
    const store = useContext(AppContext);

    const handleClick = async (e) => {
        try {
            setLoading(true);
            setError('');
            if (file == null) {
                throw new Error('Please upload a profile picture')
            }
            let user = await signup(email, password);
            console.log(user.user.uid)

            const storageRef = ref(storage, `${user.user.uid}/ProfilePic`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    // console.log(error)
                    throw new Error(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        let obj = {
                            name: name,
                            email: email,
                            uid: user.user.uid,
                            profileUrl: downloadURL,
                            timestamp: serverTimestamp()
                        }
                        await setDoc(doc(db, "users", user.user.uid), obj);
                    });
                }
            );
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('')
            }, 2000)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    },[user])

    return (
        <div className='signup-container'>
            <div className="signupCard">
                {/* <img src={insta} /> */}
                <Image src={insta} />
                <TextField fullWidth margin='dense' size='small' id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth margin="dense" size='small' id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
                <TextField fullWidth margin="dense" size='small' id="outlined-basic" label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <Button variant="outlined" margin='dense' fullWidth component="label" sx={{ marginTop: "1rem" }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                    Upload
                </Button>
                <div className='signup-error' style={{ color: 'red' }}>{error != '' && error}</div>
                <Button fullWidth variant="contained" sx={{ marginTop: "1rem" }} onClick={handleClick} disabled={loading}>Sign Up</Button>
            </div>
            <div className='signupCard' style={{ marginTop: '1rem' }}>
                <div className='signup-error' >Dont have an account ? <span style={{ color: 'blue' }} onClick={() => router.push('/login')}>Sign up</span></div>
            </div>
        </div>
    );
}
