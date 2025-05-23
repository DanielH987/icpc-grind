import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, fireStore } from '@/firebase/firebase';
import { DBProblem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';

type ProblemsTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
    const [youtubePlayer, setYoutubePlayer] = useState({
        videoId: "",
        isOpen: false,
    });

    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems();

    const [sortConfig, setSortConfig] = useState<{ key: keyof DBProblem; direction: "asc" | "desc" } | null>(null);

    const closeModal = () => {
        setYoutubePlayer({ videoId: "", isOpen: false });
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleSort = (key: keyof DBProblem) => {
        if (sortConfig && sortConfig.key === key) {
            setSortConfig({
                key,
                direction: sortConfig.direction === "asc" ? "desc" : "asc",
            });
        } else {
            setSortConfig({ key, direction: "asc" });
        }
    };

    const sortedProblems = [...problems];
    if (sortConfig) {
        sortedProblems.sort((a, b) => {
            const valA = a[sortConfig.key];
            const valB = b[sortConfig.key];

            if (typeof valA === "string" && typeof valB === "string") {
                return sortConfig.direction === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            if (typeof valA === "number" && typeof valB === "number") {
                return sortConfig.direction === "asc" ? valA - valB : valB - valA;
            }

            return 0;
        });
    }

    return (
        <>
            <thead className='text-xs text-gray-500 uppercase dark:text-gray-400 border-b'>
                <tr>
                    <th className='px-1 py-3 w-0 font-medium'>Status</th>
                    <th onClick={() => handleSort("title")} className='px-6 py-3 w-0 font-medium cursor-pointer'>
                        Title {sortConfig?.key === "title" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("difficulty")} className='px-6 py-3 w-0 font-medium cursor-pointer'>
                        Difficulty {sortConfig?.key === "difficulty" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("category")} className='px-6 py-3 w-0 font-medium cursor-pointer'>
                        Category {sortConfig?.key === "category" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th onClick={() => handleSort("year")} className='px-6 py-3 w-0 font-medium cursor-pointer'>
                        Year {sortConfig?.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                </tr>
            </thead>

            <tbody className='text-white'>
                {sortedProblems.map((problem, idx) => {
                    const difficultyColor =
                        problem.difficulty === 'Easy' ? 'text-dark-green-s' :
                            problem.difficulty === 'Medium' ? 'text-dark-yellow' :
                                'text-dark-pink';

                    return (
                        <tr className={`${idx % 2 === 0 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
                            <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                {solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={"18"} width="18" />}
                            </th>
                            <td className='px-6 py-4'>
                                {problem.link ? (
                                    <Link className='hover:text-blue-600 cursor-pointer' target='_blank' href={problem.link}>
                                        {problem.title}
                                    </Link>
                                ) : (
                                    <Link className='hover:text-blue-600' href={`/problems/${problem.id}`}>
                                        {problem.title}
                                    </Link>
                                )}
                            </td>
                            <td className={`px-6 py-4 ${difficultyColor}`}>
                                {problem.difficulty}
                            </td>
                            <td className='px-6 py-4'>
                                {problem.category}
                            </td>
                            <td className='px-6 py-4'>
                                {problem.year}
                            </td>
                        </tr>
                    );
                })}
            </tbody>

            {youtubePlayer.isOpen && (
                <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                    <div
                        className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
                        onClick={closeModal}
                    ></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose
                                    fontSize={"35"}
                                    className='cursor-pointer absolute -top-16 right-0'
                                    onClick={closeModal}
                                />
                                <YouTube
                                    videoId={youtubePlayer.videoId}
                                    loading='lazy'
                                    iframeClassName='w-full min-h-[500px]'
                                />
                            </div>
                        </div>
                    </div>
                </tfoot>
            )}
        </>
    );
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(fireStore, 'problems'), orderBy('order', 'asc'));
            const querySnapshot = await getDocs(q);
            const tmp: DBProblem[] = [];
            querySnapshot.forEach((doc) => {
                tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
            });
            setProblems(tmp);
            setLoadingProblems(false);
        };

        getProblems();
    }, [setLoadingProblems]);

    return problems;
}

function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const getSolvedProblems = async () => {
            const userRef = doc(fireStore, 'users', user!.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setSolvedProblems(userDoc.data().solvedProblems);
            }
        };

        if (user) getSolvedProblems();
        if (!user) setSolvedProblems([]);
    }, [user]);

    return solvedProblems;
}