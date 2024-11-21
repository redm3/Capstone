import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import s from './Login.module.scss'
import { useNavigate } from 'react-router-dom';




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Metro
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//const theme = createTheme();


export default function Register() {
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

/*         console.log({
            email: data.get('email'),
            password: data.get('password'),
        }); */
        const user = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        };
        console.log(user)
    
        try {
            const response = await fetch('https://metro-back-end.vercel.app/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                
            });
            console.log(response)
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                // Redirect to login page after successful registration
                navigate('/login');
            } else {
                // Handle error response from the server
                console.error('Error creating user:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={s.body} >
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: 'black' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to be a reseller."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="" variant="body2" onClick={() => navigate("/login")}>
                                        {"Already have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
}
