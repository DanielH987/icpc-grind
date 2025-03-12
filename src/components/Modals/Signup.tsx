import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth, fireStore } from "@/firebase/firebase";
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

type SignupProps = {

};

const Signup: React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();
    const handleClick = (type: "login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type }));
    };

    const [inputs, setInputs] = useState({
        email: '',
        displayName: '',
        password: ''
    });

    const [
        signInWithGoogle,
        googleUser,
        googleLoading,
        googleError
    ] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.displayName) return alert('Please fill all fields');
        try {
            toast.loading('Registering...', { position: 'top-center', toastId: 'loadingToast' });
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;

            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            }

            await setDoc(doc(fireStore, 'users', newUser.user.uid), userData)

            router.push('/');
        } catch (error: any) {
            toast.error(error.message, { position: 'top-center' });
        } finally {
            toast.dismiss('loadingToast');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            toast.loading('Registering...', { position: 'top-center', toastId: 'loadingToast' });
    
            const result = await signInWithGoogle();
            console.log("Signup with Google:", result);
    
            if (!result || !result.user) {
                throw new Error("Google sign-in failed.");
            }
    
            const userData = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: [],
            };
    
            console.log(userData);
    
            await setDoc(doc(fireStore, 'users', result.user.uid), userData);
    
            router.push('/');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { position: 'top-center' });
            } else {
                toast.error('An unexpected error occurred', { position: 'top-center' });
            }
        } finally {
            toast.dismiss('loadingToast');
        }
    };    

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center' });
        }
    }, [error]);

    return (
        <form className='space-y-6 px-6 py-4' onSubmit={handleRegister}>
            <h3 className='text-xl font-medium text-white'>Register to ICPC Grind</h3>
            <div>
                <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>
                    Your Email
                </label>
                <input
                    onChange={handleChangeInput}
                    type="email" name="email" id="email" className="
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    "
                    placeholder='name@company.com'
                />
            </div>
            <div>
                <label htmlFor="displayName" className='text-sm font-medium block mb-2 text-gray-300'>
                    Display Name
                </label>
                <input
                    onChange={handleChangeInput}
                    type="displayName" name="displayName" id="displayName" className="
                        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                        bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    "
                    placeholder='John Doe'
                />
            </div>
            <div>
                <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
                    Password
                </label>
                <input
                    onChange={handleChangeInput}
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
                {loading ? 'Loading...' : 'Register'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
                <hr className="w-full border-gray-500" />
                <span className="px-3 text-gray-300 text-sm whitespace-nowrap">Or Continue with</span>
                <hr className="w-full border-gray-500" />
            </div>

            <GoogleSignInButton onClick={handleGoogleSignIn} loading={googleLoading} />

            <div className='text-sm font-medium text-gray-300'>
                Already have an account? {' '}
                <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick('login')}>
                    Log In
                </a>
            </div>
        </form>
    )
}
export default Signup;