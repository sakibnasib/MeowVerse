import React  from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { TbFidgetSpinner } from 'react-icons/tb'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hook/useAuth';
import { saveUserDB } from '../../api/utils';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, signInWithGoogle, user,loading } =useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
 
  const from = location?.state?.from?.pathname || '/'
  if (user) return <Navigate to={from} replace={true} />
  

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      //User Login
    const result=  await signIn (email, password)
    const userData={
       name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
    };
    // save DB
    await saveUserDB( userData)
navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err.message)
      toast.error(err?.message)
    
    }
  }
  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
    const result=  await signInWithGoogle()

     //User Registration using google
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      // save inDB
      await saveUserDB(userData)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
     
    }
  }

    return (
       <div className='flex justify-center md:mt-5 md:mb-5  items-center  pb-10'>
      <div className='flex flex-col max-w-md p-6 rounded-3xl sm:p-10 bg-white/30   text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl text-pink-600 font-bold'>Log In</h1>
          <p className='text-sm text-pink-600'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300  text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300  text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-pink-600 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
              {/* Continue */}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/auth/register'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
           Register
          </Link>
          .
        </p>
      </div>
    </div>
    );
};

export default Login;