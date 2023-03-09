import { useEffect, useState } from 'react';
import { login } from '../../../services/auth.service';
import '../../../sass/main.scss';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { LogoImage } from '../../../image';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../utils/form.validate';
import CircularProgress from '@mui/material/CircularProgress';
import { dispatch } from 'decoders';
import { UserLogged } from '../../../types/auth';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';

// Infer the Schema to get the TS Type
type InputLogin = TypeOf<typeof loginSchema>;

export function LoginManager() {
  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string | any>('');

  const navigate: NavigateFunction = useNavigate();

  // The object returned from useForm Hook
  const methods = useForm<InputLogin>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<InputLogin> = async (manager: InputLogin) => {
    setMessage('');
    setLoading(true);
    console.log(manager);
    const response = await login(manager);
    if (response.data?.role === 'ROLE_MANAGER') {
      // const managerLogged: UserLogged = response?.data;
      navigate('/dashboard');
      // window.location.reload();
    } else {
      setLoading(false);
      setMessage(response.message);
    }
  };

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset();
    }
  }, [methods.formState.isSubmitSuccessful, methods.reset]);

  return (
    <div className='auth-page'>
      <Container>
        <FormProvider {...methods}>
          <Box component={'form'} noValidate onSubmit={methods.handleSubmit(handleLogin)}>
            <div className='logo-image'>
              <img src={LogoImage} alt='logo' />
            </div>
            <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1.5rem' }}>
              ĐĂNG NHẬP VÀO HỆ THỐNG QUẢN LÝ
            </Typography>
            <div className='text-field'>
              <TextField
                type='username'
                sx={{ marginBottom: '20px', width: '500px' }}
                id='outlined-basic'
                label='Tài khoản'
                variant='outlined'
                required
                {...methods.register('username')}
              />
            </div>
            <div className='text-field'>
              <TextField
                type='password'
                sx={{ marginBottom: '20px', width: '500px' }}
                id='outlined-basic'
                label='Mật khẩu'
                variant='outlined'
                required
                {...methods.register('password')}
              />
            </div>
            <Typography
              variant='h6'
              component='p'
              sx={{
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              <a href='#'>Quên mật khẩu</a>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                sx={{ borderRadius: '80px', padding: '12px 50px 12px 50px', backgroundColor: '#00D8B0' }}
                variant='contained'
                type='submit'
                disabled={loading}
              >
                {loading}
                Đăng nhập
              </Button>
            </Box>
            {message && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <Alert sx={{ width: '188px' }} severity='error'>
                  {message}
                </Alert>
              </Box>
            )}
          </Box>
        </FormProvider>
      </Container>
    </div>
  );
}
