import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { Typewriter } from 'react-simple-typewriter';

type AuthPageProps = {

};

const AuthPage: React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalState);
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user) router.push('/');
        if (!loading && !user) setPageLoading(false);
    }, [user, router, loading]);

    if (pageLoading) return null;

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-25rem)] text-center">
                <h1 className="text-4xl font-bold text-white">ICPC Grind</h1>
                <p className="text-lg text-gray-300 mt-2">
                    <Typewriter
                        words={[
                            "Sharpen your problem-solving skills.",
                            "Ace your next ICPC contest.",
                            "Practice. Compete. Succeed.",
                            "Master algorithms and data structures."
                        ]}
                        loop
                    />
                </p>
            </div>
            {authModal.isOpen && <AuthModal />}
        </div>
    </div>
}
export default AuthPage;