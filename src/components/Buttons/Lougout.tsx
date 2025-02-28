import React from 'react';
import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

const Lougout: React.FC = () => {

    const [signOut, loading, error] = useSignOut(auth)

    const handleLgout = () => {
        signOut();
    }

    return <button className='bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLgout}>
        <FiLogOut />
    </button>
}

export default Lougout;