import * as React from 'react';
import insta from './insta.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useContext,useState } from 'react';
import { AppContext } from '../context/auth';
import { useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as Img } from 'pure-react-carousel';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function BasicCard() {
    const router = useRouter();
    const { login } = useContext(AppContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const handleClick = async() => {
        try{
            setError('')
            setLoading(true)
            await login(email,password)
            router.push('/')
        }catch{
            setError('Invalid Credentials')
            setTimeout(()=>{
                setError('')
            },2000);
        }
        setLoading(false)
    }

    return (
        <div className='login-container'>
            <div className='carbg' style={{backgroundImage:"url(https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png)",backgroundSize:'cover'}}>
                <div className='car'>
                    <CarouselProvider
                        naturalSlideWidth={241}
                        naturalSlideHeight={423}
                        totalSlides={3}
                        visibleSlides={1}
                        isPlaying={true}
                        isInfinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                        hasMasterSpinner
                    >
                        <Slider>
                            <Slide index={0}><Img src="https://reels-839c5.web.app/static/media/img2.25af168d.jpg" /></Slide>
                            <Slide index={1}><Img src="https://reels-839c5.web.app/static/media/img1.678f281f.jpg" /></Slide>
                            <Slide index={2}><Img src="https://reels-839c5.web.app/static/media/img5.21a5f717.jpg" /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div>
                <div className="loginCard">
                    {/* <img src={insta} /> */}
                    <Image src={insta} />
                    <TextField fullWidth size="small" margin='dense' id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <TextField fullWidth size="small" margin="dense" id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <div className='login-error' style={{ color: 'red' }}>{
                        error != '' && error 
                    }</div>
                    <div className='login-error' style={{ color: 'blue' }}>Forgot Password ? </div>
                    <Button fullWidth variant="contained" onClick={()=>handleClick()}>Login</Button>
                </div>
                <div className='loginCard' style={{ marginTop: '1rem' }}>
                    <div className='login-error' >Dont have an account ? <Link href="signup"><span style={{ color: 'blue' }}>Sign up</span></Link></div>
                </div>
            </div>
        </div>
    );
}
