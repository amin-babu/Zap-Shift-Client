import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log('after login', result.user);
        navigate(location?.state || '/');
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0  shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <h3 className="text-3xl text-center">Welcome Back</h3>
          <p className='text-center'>Please Login</p>
          <fieldset className="fieldset">
            {/* email field */}
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
            {errors.email?.type === 'required' && <p className='text-red-500'>Fulfill the email</p>}

            {/* password field */}
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
            {errors.password?.type === 'required' && <p className='text-red-500'>Fulfill the Password</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button type='submit' className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p>New to ZapShift? <Link state={location.state} to='/register' className='underline'>Register</Link></p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;