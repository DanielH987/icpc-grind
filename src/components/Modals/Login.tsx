import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword, useSignInWithGoogle  } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth } from "@/firebase/firebase";
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const [inputs, setInputs] = useState({ email: "", password: "" });

    const [
        signInWithGoogle, 
        googleUser, 
        googleLoading, 
        googleError
    ] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert('Please fill all fields');
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (error: any) {
            console.log(error.message);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            if (result) {
                router.push('/');
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    
    useEffect(() => {
        if (error) {
            alert(error.message);
        }
    }, [error]);

    return (
        <form className='space-y-6 px-6 py-4' onSubmit={handleLogin}>
            <h3 className='text-xl font-medium text-white'>Sign in to ICPC Grind</h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>
                    Your Email
                </label>
                <input
                    onChange={handleInputChange}
                    type="email" name="email" id="email" className="
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    "
                    placeholder='name@company.com'
                />
            </div>
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
                    Your Password
                </label>
                <input
                    onChange={handleInputChange}
                    type="password" name="password" id="password" className="
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    "
                    placeholder='******'
                />
            </div>

            <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
            '>
                {loading ? 'Loading...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
                <hr className="w-full border-gray-500" />
                <span className="px-3 text-gray-300 text-sm whitespace-nowrap">Or Continue with</span>
                <hr className="w-full border-gray-500" />
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} loading={googleLoading} />
            
            <button className='flex w-full justify-end' onClick={() => handleClick('forgotPassword')}>
                <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right'>
                    Forgot Password?
                </a>
            </button>
            <div className='text-sm font-medium text-gray-300'>
                Not Registered? {' '}
                <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick('register')}>
                    Create account
                </a>
            </div>
        </form>
    )
}
export default Login;