import * as React from 'react';
import insta from './insta.jpg';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Image from 'next/image';

export default function signup() {
    return (
        <div className='signup-container'>
            <div className="signupCard">
                {/* <img src={insta} /> */}
                <Image src={insta} />
                <TextField fullWidth margin='dense' size='small' id="outlined-basic" label="Email" variant="outlined" />
                <TextField fullWidth margin="dense" size='small' id="outlined-basic" label="Password" variant="outlined" />
                <TextField fullWidth margin="dense" size='small' id="outlined-basic" label="Full Name" variant="outlined" />
                {/* <div className='signup-error' style={{color:'red'}}>Error Yha aaega</div> */}
                {/* <label htmlFor="contained-button-file" fullWidth> */}
                <Button variant="outlined" margin='dense' fullWidth component="label" sx={{ marginTop: "1rem" }}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} />
                    Upload
                </Button>
                {/* </label> */}
                {/* <div className='signup-error' style={{ color: 'blue' }}>Forgot Password ? </div> */}
                <Button fullWidth variant="contained" sx={{ marginTop: "1rem" }}>Sign Up</Button>
            </div>
            <div className='signupCard' style={{ marginTop: '1rem' }}>
                <div className='signup-error' >Don't have an account ? <span style={{ color: 'blue' }}>Sign up</span></div>
            </div>
        </div>
    );
}
