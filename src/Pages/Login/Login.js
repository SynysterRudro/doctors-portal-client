import { da } from 'date-fns/locale';
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { signIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            })


    }

    // google sign in 
    // google login 
    const handleGoogle = () => {
        // console.log('clicked');
        googleLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error))
    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center mb-7'>Log in</h2>

                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full max-w-xs" {...register("email", { required: "email address is required" })} />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required", minLength: { value: 6, message: 'password must be 6 characters or more' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password must be strengthen' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                        <label className="label">
                            <span className="label-text">Forget password?</span>
                        </label>

                    </div>


                    <input type="submit" className='btn btn-accent w-full' value='login' />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>

                <p>New to Doctors Portal? <Link className='text-secondary' to='/signup'>Create new account</Link></p>

                <div className="divider">OR</div>
                <button onClick={handleGoogle} className='uppercase btn btn-outline w-full'>Continue with google</button>
            </div>
        </div>
    );
};

export default Login;