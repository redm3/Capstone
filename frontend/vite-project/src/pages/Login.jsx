import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
/* import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles'; */
import { useNavigate } from 'react-router-dom';
import useFormInput from '../hooks/useForminput';
import { UserContext } from '../context/UserContext';
import s from './Login.module.scss'

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

/* const theme = createTheme(); */

export default function Login() {

    const emailProps = useFormInput('')
    const passwordProps = useFormInput('')
    const { email, setEmail } = React.useContext(UserContext)
    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [loginAttempts, setLoginAttempts] = React.useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let user = emailProps.value
        let password = passwordProps.value

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user, password: password }),
            });

            if (response.ok) {
                const data = await response.json();
                setEmail(user);
                setLoggedIn(true);
                setErrMsg('');
                console.log(data)

                if (data.data.admin== true) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setLoggedIn(false);
                setErrMsg('Unsuccessful login attempt');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrMsg('Error logging in');
        }
    };


    return (
        <div className={s.body} >
            <div className="Login componentBox">
                {/* <CssBaseline /> */}
                {/* <ThemeProvider theme={theme}> */}
                <Container component="main" maxWidth="xs">
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
                            {loggedIn ? 'Hello ' + email : 'Metro Login'}
                        </Typography>

                        {!loggedIn && loginAttempts < 5 &&

                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    {...emailProps}
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...passwordProps}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <p>{errMsg}</p>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="" variant="body2" onClick={() => navigate("/register")}>
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
                {/* </ThemeProvider> */}
            </div>
        </div>
    );
}