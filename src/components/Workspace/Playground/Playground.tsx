import React, { useEffect, useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, fireStore } from '@/firebase/firebase';
import { toast, ToastOptions } from 'react-toastify';
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import useLocalStorage from '@/hooks/useLocalStorage';

type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
    fontSize: string;
    settingModalIsOpen: boolean;
    dropdownIsOpen: boolean;
    language: 'js' | 'python' | 'cpp';
};

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
    let [userCode, setUserCode] = useState<string>(problem.starterCode['js']);
    const [language, setLanguage] = useState<'javascript' | 'python' | 'cpp'>('javascript');
    const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
    const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
    const [settings, setSettings] = useState<ISettings>({
        fontSize: fontSize,
        settingModalIsOpen: false,
        dropdownIsOpen: false,
        language: 'js',
    });
    const [user] = useAuthState(auth);
    const { query: { pid } } = useRouter();
    const toastConfig: ToastOptions = { position: 'top-center', autoClose: 3000, theme: 'dark' };
    const [testResults, setTestResults] = useState<any[]>([]);

    const getLanguageExtension = () => {
        switch (settings.language) {
            case 'js': return javascript();
            case 'python': return python();
            case 'cpp': return cpp();
            default: return javascript();
        }
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error('Please login to run your code', toastConfig);
            return;
        }

        try {
            const response = await fetch('/api/runSecret', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: userCode,
                    language: settings.language,
                    problemId: problem.id
                }),
            });

            const data = await response.json();

            if (data.correct) {
                toast.success("✅ Correct Answer!", toastConfig);
            } else {
                toast.error("❌ Wrong Answer!", toastConfig);
            }
        } catch (error) {
            toast.error('An error occurred while running your code', toastConfig);
        }
    };

    const handleRun = async () => {
        if (!user) {
            toast.error('Please login to submit your code', toastConfig);
            return;
        }

        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: userCode,
                    language: settings.language,
                    input: JSON.stringify(problem.tests),
                    answers: JSON.stringify(problem.answers),
                }),
            });

            const data = await response.json();

            if (data.output?.results) {
                const results = data.output.results;
                setTestResults(results);

                const allPassed = results.every((test: any) => test.passed);

                if (allPassed) {
                    toast.success("✅ Correct Answer!", toastConfig);
                } else {
                    toast.error("❌ Wrong Answer!", toastConfig);
                }
            } else {
                toast.error("❌ Something went wrong with the test results", toastConfig);
            }

        } catch (error) {
            toast.error('An error occurred while running your code', toastConfig);
        }
    };

    useEffect(() => {
        const code = localStorage.getItem(`code-${pid}-${settings.language}`);
        if (user) {
            setUserCode(code ? JSON.parse(code) : problem.starterCode[settings.language]);
        } else {
            setUserCode(problem.starterCode[settings.language]);
        }
    }, [pid, user, settings.language, problem.starterCode]);

    useEffect(() => {
        setTestResults([]);
    }, [settings.language, pid]);

    const onCHange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${pid}-${settings.language}`, JSON.stringify(value));
    };

    return (
        <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
            <PreferenceNav settings={settings} setSettings={setSettings} />

            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onCHange}
                        extensions={[getLanguageExtension()]}
                        style={{ fontSize: settings.fontSize }}
                    />
                </div>
                <div className='w-full px-5 overflow-auto pb-[60px]'>
                    {/* testcase heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                            <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                        </div>
                    </div>

                    <div className="flex">
                        {problem.examples.map((example, index) => {
                            const result = testResults[index];
                            const passed = result?.passed;

                            return (
                                <div
                                    className='mr-2 items-start mt-2'
                                    key={example.id}
                                    onClick={() => setActiveTestCaseId(index)}
                                >
                                    <div className='flex flex-wrap items-center gap-y-4 relative'>
                                        <div className={`${activeTestCaseId === index ? 'text-white' : 'text-gray-500'} font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap`}>
                                            case {index + 1}
                                        </div>
                                        {typeof passed === 'boolean' && (
                                            <div className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className='font-semibold'>
                        <p className='text-sm font-medium mt-4 text-white'>Input:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>

                        {testResults[activeTestCaseId] && (
                            <>
                                {testResults[activeTestCaseId].result.stdout && (
                                    <>
                                        <p className='text-sm font-medium mt-4 text-white'>Stdout:</p>
                                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                            {testResults[activeTestCaseId].result.stdout}
                                        </div>
                                    </>
                                )}

                                <p className='text-sm font-medium mt-4 text-white'>Output:</p>
                                <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                                    {String(testResults[activeTestCaseId].result.output)}
                                </div>

                            </>
                        )}

                        <p className='text-sm font-medium mt-4 text-white'>Expected Output:</p>
                        <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                    </div>
                </div>
            </Split>

            <EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} />
        </div>
    )
}
export default Playground;