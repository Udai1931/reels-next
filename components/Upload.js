import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import BackupIcon from '@mui/icons-material/Backup';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../firebase';
import { arrayUnion, doc, serverTimestamp, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Alert from '@mui/material/Alert'

function Upload(props) {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleChange = (file) => {
        if (file == null) {
            setError("Please select a file first");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError('This video is very big');
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }

        let uid = uuidv4();
        setLoading(true);
        const storageRef = ref(storage, `posts/${uid}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(pro);
                console.log('Upload is ' + pro + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                // console.log(error)
                // throw new Error(error)
                setLoading(false);
                setProgress(0);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    let obj = {
                        likes: [],
                        postId: uid,
                        postUrl: downloadURL,
                        profileName: props.userData.name,
                        profileUrl: props.userData.profileUrl,
                        uid: props.userData.uid,
                        timestamp: serverTimestamp()
                    }
                    console.log(obj);
                    await setDoc(doc(db, "posts", uid), obj);
                    console.log("post added in post collection")
                    await updateDoc(doc(db, "users", props.userData.uid), {
                        posts: arrayUnion(uid)
                    })
                    console.log("user document updated")
                    setLoading(false);
                    setProgress(0);
                });
            }
        );
    }

    return (
        <div className='upload-container' style={{ height: "8vh", width: "15rem", margin: "auto", textAlign: "center" }}>
            {
                error != '' ?
                    <Alert severity="error" sx={{ marginTop: '0.5rem' }} >{error}</Alert> :
                    <>
                        <Button disabled={loading} variant="outlined" color='secondary' component="label" style={{ margin: "0.5rem"}} startIcon={<BackupIcon />}>
                            <input type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => handleChange(e.target.files[0])} />
                            Upload Video
                        </Button>
                        {
                            loading == true &&
                            <LinearProgress variant="determinate" value={progress} />
                        }
                    </>
            }
        </div>
    )
}

export default Upload