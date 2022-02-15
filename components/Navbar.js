import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import insta from '../assets/insta.jpg';
import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../context/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = (props) => {

    const { logout, user } = useContext(AppContext);
    const router = useRouter();
    // console.log(store)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    return (
        <>
            <AppBar position="static" sx={{ background: "white", paddingLeft: '1rem', paddingRight: '1rem', color: "black", height: "10vh", display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters >
                        {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'fllex', md: 'flex' } }}
                    >
                    </Typography> */}
                        <Link href="/">
                            <Image src={insta} height="55" width={200} />
                        </Link>
                        {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box> */}
                        {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                        </Box>

                        <Box sx={{ flexGrow: 0, display: 'flex' }}>
                            <HomeIcon fontSize='large' sx={{ margin: '0.5rem', display: { xs: 'none', sm: 'flex', color: "#000" } }} />
                            <ExploreIcon fontSize='large' sx={{ margin: '0.5rem', display: { xs: 'none', sm: 'flex', color: "#000" } }} />
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={props?.userData?.profileUrl} sx={{ margin: '0.5rem' }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link href="/profile">
                                        <Typography textAlign="center">Profile</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => handleLogout()}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};
export default ResponsiveAppBar;
