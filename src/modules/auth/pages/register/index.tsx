import React, { useState, useEffect, useContext } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import PageLoading from '../../../../shared/components/PageLoading';
import { useRedirect } from '../../../../context/redirect/useRedirect';
import { SecurityContext } from '../../../../context/securityContext';
import { asyncLocalStorage } from '../../../../utils/asyncLocalStorage';
import { useAuthApi } from '../../../../context/hooks/integrations';

type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'block';

const theme = createTheme();

export default function SignUp() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordlError] = useState(false)
    const [confirmPassowordError, setConfirmPasswordError] = useState(false)
    const [textAlert, setTextAlert] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertType>('error')
    const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')
    const [isLoading, setIsloading] = useState(false);

    const [ redirect ] = useRedirect();

    const { setIsAuth, setAccessToken } = useContext(SecurityContext);
    const { createUserStore, getToken } = useAuthApi();

    const renderAlert = (type: AlertType, text: string) => {
        setTextAlert(text);
        setAlertType(type);
        setDisplayAlert('block');
    }   

    const validatePassword = ()=>{
        if(password === confirmPassword) return true;
        renderAlert('error', 'A senha e a confirmação de senha devem ser iguais')
        return false
    }

    const validateFields = ()=>{
        let isValid = true
        if (!!!email){
            setEmailError(true);
            isValid = false;
        }
        else setEmailError(false);
        if (!!!password){
            setPasswordlError(true)
            isValid = false;
        }
        else setPasswordlError(false);
        if(!!!confirmPassword){
            setConfirmPasswordError(true);
            isValid = false;
        }
        else setConfirmPasswordError(false)
        return isValid
    }
    
    useEffect(()=>{
        if(emailError || passwordError || confirmPassowordError){
            validateFields()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password, confirmPassword]);

    const validate = ()=>{
        if(!validateFields()) return false
        if(!validatePassword()) return false
        return true
    }

    const createPersonalDataAndauthenticate = async ()=>{
        const response = await getToken({email, password});
        if(response.status === 200){
            await asyncLocalStorage.setItem('accessToken', response.data.accessToken);
            setAccessToken(response.data.accessToken)
            setIsAuth(true);
            redirect('/profile');
        }
    }

    const save = async () => {
        setIsloading(true);
        if(validate()){
            try{
                const response = await createUserStore({
                    email, password, profiles: ['STORE'],
                })
                if(response.status === 201){
                    await createPersonalDataAndauthenticate()
                }
            }catch(error: unknown){
                if(axios.isAxiosError(error)){
                    if(error.response?.status === 409){
                        renderAlert('error', 'Este email ja esta cadastrado para outro usuario');
                        setEmailError(true);
                    }
                }
            }
            finally {
                setIsloading(false);
            }
        }
        setIsloading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <PageLoading open={isLoading}/>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastrar
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} display={displayAlert}>
                                <Alert severity={alertType}>{textAlert}</Alert>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={emailError}
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event)=>setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordError}
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(event)=>setPassword(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={confirmPassowordError}
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirme sua senha"
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(event)=>setConfirmPassword(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>save()}
                        >
                            Cadastrar
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Ja tenho uma conta
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}