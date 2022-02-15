import { Button, TextField } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import insta from '../assets/insta.jpg'
function login1() {
    return (
        <div className='login-container'>
            <div className='login-card'>
                <Image src={insta} />
                <TextField id="outlined-basic" size="small" margin="dense" label="Outlined" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <div>Error ke lia space</div>
                <div>Forgot Password?</div>
                <Button variant="outlined" component="label">
                    <input type="file" style={{display:"none"}}/>
                    Upload
                </Button>
            </div>
            login
        </div>
    )
}

export default login1
