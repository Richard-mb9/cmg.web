import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

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
import Alert from '@mui/material/Alert';
import axios from 'axios';


import PageLoading from '../../../../shared/components/PageLoading';
import { useRedirect } from '../../../../context/redirect/useRedirect';
import { SecurityContext } from '../../../../context/securityContext';
import { useAuthApi } from '../../../../context/hooks/integrations';

const theme = createTheme();

type AlertType = 'error' | 'warning' | 'info' | 'success';
type displayAlertType = 'none' | 'flex';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('')
  const [textAlert, setTextAlert] = useState<string>('')
  const [alertType, setAlertType] = useState<AlertType>('error')
  const [displayAlert, setDisplayAlert] = useState<displayAlertType>('none')
  const [isLoading, setIsLoading] = useState(false)

  const [redirect] = useRedirect();

  const {isAuth, setIsAuth} = useContext(SecurityContext);
  const { getToken } = useAuthApi();

  const renderAlert = (type: AlertType, text: string) => {
    setTextAlert(text);
    setAlertType(type);
    setDisplayAlert('flex');
  }

  const send = async ()=>{
    try{
      const response = await getToken(
        {
          email: email,
          password: password
        }
      )
      
      if(response.status === 200){
        localStorage.setItem('accessToken', response.data.accessToken)
        setIsAuth(true);
        redirect('');
      }
    }
    catch (error: unknown){
      if(axios.isAxiosError(error) && error.response){
        if(error.response.status === 403){
          renderAlert('error', 'Usuario temporariamente bloqueado por excesso de tentativas, tente novamente após 10 minutos');
        }
        else if(error.response.status >= 400 && error.response.status < 500 ){
          renderAlert('error', 'verfique suas credenciais');
        }
      }
    }
    setIsLoading(false)
  }

  return  isAuth ? < Navigate to="/"/> : (
    <ThemeProvider theme={theme}>
      <PageLoading open={isLoading} />
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
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box >
            <Alert sx={{display: displayAlert }} severity={alertType}>{textAlert}</Alert>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event)=>setEmail(event.target.value)}
              inputProps={{
                "data-test-id": "input-email",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event)=>setPassword(event.target.value)}
              inputProps={{
                "data-testid": "input-password",
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="lembrar-me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>send()}
              data-testid="button-login"
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="register" variant="body2">
                  Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}