import React from 'react';
import Topbar from '@/components/Topbar/Topbar';

type ProblemPageProps = {
    
};

const ProblemPage:React.FC<ProblemPageProps> = () => {
    
    return <div>
        <Topbar problemPage={true} />
    </div>
}
export default ProblemPage;