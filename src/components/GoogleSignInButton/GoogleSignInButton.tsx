import React from 'react';
import { FaGoogle } from 'react-icons/fa';

interface GoogleSignInButtonProps {
    onClick: () => void;
    loading?: boolean;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick, loading }) => {
    return (
        <button 
            type="button"
            className="w-full flex items-center justify-center gap-2 text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
            onClick={onClick}
        >
            {loading ? 'Signing in...' : <FaGoogle className="w-5 h-5" />}
        </button>
    );
};

export default GoogleSignInButton;
