import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "@/auth";
import { useForm } from '@/hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '@/store/auth'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage  } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm(formData)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(startLoginWithEmailPassword({email, password}))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              fullWidth
              label={'Email'}
              name='email'
              onChange={onInputChange}
              placeholder={"email@here.com"}
              type={"email"}
              value={email}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              fullWidth
              label={'Password'}
              name='password'
              onChange={onInputChange}
              placeholder={"******"}
              type={"password"}
              value={password}
            />
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 1 }} display={!!errorMessage ? 'block' : 'none'}>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6}>
              <Button variant={'contained'} fullWidth type='submit' disabled={ isAuthenticating }>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant={'contained'} fullWidth onClick={onGoogleSignIn} disabled={ isAuthenticating }>
                <Google/>
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction={'row'}
            justifyContent={'end'}
          >
            <Link component={RouterLink} color={"inherit"} to={"/auth/register"}>Create an account</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

