import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "@/store/auth"
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "@/auth";
import { useForm } from "@/hooks"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

const formData = {
  displayName: '',
  email: '',
  password: '',
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formValidations = {
  email: [(value) => emailRegex.test(value), 'The email is not valid'],
  password: [(value) => value.length >= 6, 'The password should be at least 6 characters'],
  displayName: [(value) => value.length >= 1, 'The name is required'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)
  const isChekingAuthentication = useMemo(() => status === 'checking', [status])

  const { formState, password, email, displayName, onInputChange, isFormValid,
    passwordValid, emailValid, displayNameValid } = useForm(formData, formValidations)
  
  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    if (isChekingAuthentication) return
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title={'Register'}>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              fullWidth
              label={'Name'}
              name='displayName'
              onChange={onInputChange}
              placeholder={"John Doe"}
              type={"text"}
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid && formSubmitted ? displayNameValid : ''}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              fullWidth
              label={'Email'}
              placeholder={"email@here.com"}
              type={"email"}
              name='email'
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid && formSubmitted ? emailValid : ''}
            />
          </Grid>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              fullWidth
              label={'Password'}
              placeholder={"******"}
              type={"password"}
              name='password'
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid && formSubmitted ? passwordValid : ''}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={ !!errorMessage ? 'block' : 'none'}>
              <Alert severity="error">{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button variant={'contained'} fullWidth type="submit" disabled={isChekingAuthentication}>
                Create Account
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction={'row'}
            justifyContent={'end'}
          >
            <Link component={RouterLink} color={"inherit"} to={"/auth/login"}>
              <Typography sx={{mr:1}}>Already have an account?</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

