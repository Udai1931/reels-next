import * as React from 'react';
import insta from './insta.jpg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../context/auth';
import { useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image as Img } from 'pure-react-carousel';


export default function BasicCard() {

    const { signup } = useContext(AppContext);

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
                    <TextField fullWidth size="small" margin='dense' id="outlined-basic" label="Email" variant="outlined" />
                    <TextField fullWidth size="small" margin="dense" id="outlined-basic" label="Password" variant="outlined" />
                    <div className='login-error' style={{ color: 'red' }}>Error Yha aaega</div>
                    <div className='login-error' style={{ color: 'blue' }}>Forgot Password ? </div>
                    <Button fullWidth variant="contained">Login</Button>
                </div>
                <div className='loginCard' style={{ marginTop: '1rem' }}>
                    <div className='login-error' >Don't have an account ? <span style={{ color: 'blue' }}>Sign up</span></div>
                </div>
            </div>
        </div>
    );
}
