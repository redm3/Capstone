import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Button, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import CottageIcon from '@mui/icons-material/Cottage';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import MuseumIcon from '@mui/icons-material/Museum';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DrawerComponent from './DrawerComponent';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '../assets/metro-logo.png'
import Logosmall from '../assets/metro-logo-small.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const isMobile = useMediaQuery('(max-width:800px)');
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleChange = (event, value) => {
        // handle button click
    };

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <React.Fragment>

            <AppBar sx={{ backgroundColor: 'white', color: 'black', margin: '5px auto',/* , px: "96px"  */ padding: '1vw' }} elevation={0}>
                <div style={{ borderBottom: 'grey 1px solid' }}>
                    <Toolbar sx={{ justifyContent: 'center' }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: '1' }}>

                            {isMobile ? (
                                <>

                                    {/* <MuseumIcon sx={{ color: 'black',padding: '0px', position: 'absolute', left: '0', top: '10', fontSize: 40 }} /> */}
                                    <img
                                        src={Logosmall}
                                        alt="Logosmall"
                                        style={{
                                            padding: '0px',
                                            width: '150px',
                                            height: 'auto',
                                            position: 'absolute',
                                            left: '0',
                                            top: '10',
                                        }}
                                    />

                                    <DrawerComponent />

                                </>

                            ) : (
                                <>
                                    {/* <MuseumIcon sx={{ color: 'black',padding: '0px', position: 'absolute', left: '0', top: '10', fontSize: 40 }} /> */}
                                    <img
                                        src={Logosmall}
                                        alt="Logosmall"
                                        style={{
                                            padding: '0px',
                                            width: '150px',
                                            height: 'auto',
                                            position: 'absolute',
                                            left: '0',
                                            top: '10',
                                        }}
                                    />
                                    <Button
                                        disableRipple
                                        style={{ backgroundColor: "transparent" }}
                                        value={0}
                                        startIcon={<CottageIcon sx={{ color: 'black', opacity: 0.5 }} />}
                                        variant="text"
                                        sx={{ textTransform: 'none' }}
                                        onClick={(event) => handleChange(event, 0)}
                                    >
                                        <Link to="/" style={{ textDecoration: 'none' }}>
                                            <Typography variant="h6" component="div" sx={{ xl: 1, opacity: 0.8, '&:hover': { opacity: 1 } }} color="black">
                                                Home
                                            </Typography>
                                        </Link>
                                    </Button>
                                    <Button
                                        disableRipple
                                        style={{ backgroundColor: "transparent" }}
                                        value={1}
                                        startIcon={<StorefrontIcon sx={{ color: 'black', opacity: 0.6 }} />}
                                        variant="text"
                                        sx={{ textTransform: 'none' }}
                                        onClick={(event) => handleChange(event, 1)}
                                    >
                                        <Typography variant="h6" component="div" sx={{ xl: 1, opacity: 0.8, '&:hover': { opacity: 1 } }} color="black">
                                            Store
                                        </Typography>
                                    </Button>
                                    <Button
                                        disableRipple
                                        style={{ backgroundColor: "transparent" }}
                                        value={2}
                                        startIcon={<ShoppingCartIcon sx={{ color: 'black', opacity: 0.5 }} />}
                                        variant="text"
                                        sx={{ textTransform: 'none' }}
                                        onClick={(event) => handleChange(event, 2)}
                                    >
                                        <Typography variant="h6" component="div" sx={{ xl: 1, opacity: 0.8, '&:hover': { opacity: 1 } }} color="black">
                                            Cart
                                        </Typography>
                                    </Button>
                                    <Button
                                        style={{ backgroundColor: "transparent" }}
                                        disableRipple
                                        value={2}
                                        startIcon={<LoginIcon sx={{ color: 'black', opacity: 0.5 }} />}
                                        variant="text"
                                        sx={{ backgroundColor: "transparent", textTransform: 'none',/*  padding: '0px', */ position: 'absolute', right: '0' }}
                                        onClick={(event) => handleChange(event, 2)}
                                    >
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                        <Typography variant="h6" component="div" sx={{ xl: 1, opacity: 0.8, '&:hover': { opacity: 1 } }} color="black" >
                                            Login
                                        </Typography>
                                        </Link>
                                    </Button>
                                </>
                            )}

                        </Stack>

                    </Toolbar>
                </div>
            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;
