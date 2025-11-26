import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistrarion = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {

        //store the image in form data
        const formData = new FormData();
        formData.append('image', profileImg);

        // send the photo to store and get the url
        const imageApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgage_host_key}`;

        axios.post(imageApiURL, formData)
          .then(res => {
            const photoURL = res.data.data.url;

            // creating user in db
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: photoURL
            };

            axiosSecure.post('/users', userInfo)
              .then(res => {
                if(res.data.insertedId){
                  console.log('user created in the database');
                }
              })

            // update user profile to firebase
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL
            };

            updateUserProfile(userProfile)
              .then(() => { 
                console.log('User profile updated done');
                navigate(location?.state || '/');
              })
              .catch(error => console.log(error))

          })

      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className='card-body'>
        <form onSubmit={handleSubmit(handleRegistrarion)}>
          <h3 className="text-3xl text-center">Welcome Back</h3>
          <p className='text-center'>Create Account</p>
          <fieldset className="fieldset">

            {/* Name */}
            <label className="label">Name</label>
            <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
            {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}

            {/* Photo Field */}
            <label className="label">Add Image</label>
            <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
            {errors.name?.type === 'required' && <p className='text-red-500'>Photo is required</p>}

            {/* email */}
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
            {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

            {/* password */}
            <label className="label">Password</label>
            <input type="password" {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/
            })} className="input" placeholder="Password" />
            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500'>Password should be at least 6 length</p>}
            {errors.password?.type === 'pattern' && <p className='text-red-500'>Password should be at one upper, lower and special character</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button type='submit' className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>Do you have any account? <Link state={location.state} to='/login' className='underline'>Login</Link></p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;