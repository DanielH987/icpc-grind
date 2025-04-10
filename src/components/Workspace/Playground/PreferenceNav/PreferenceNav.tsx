import React, { useState, useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { RiResetLeftLine } from "react-icons/ri";
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModals';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { Problem } from '@/utils/types/problem';

type PreferenceNavProps = {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
    setUserCode: React.Dispatch<React.SetStateAction<string>>;
    problem: Problem;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ settings, setSettings, setUserCode, problem }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        function exitHandler(e: any) {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
                return;
            }
            setIsFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', exitHandler);
            document.addEventListener('webkitfullscreenchange', exitHandler);
            document.addEventListener('mozfullscreenchange', exitHandler);
            document.addEventListener('MSFullscreenChange', exitHandler);
        }
    }, [isFullScreen]);

    return <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
        <div className='flex items-center text-white'>
            <LanguageSelector settings={settings} setSettings={setSettings} />
        </div>

        <div className='flex items-center m-2'>
            <button
                className='preferenceBtn group'
                onClick={() => {
                    const defaultCode = problem.starterCode[settings.language];
                    setUserCode(defaultCode);
                    localStorage.setItem(`code-${problem.id}-${settings.language}`, JSON.stringify(defaultCode));
                }}
            >
                <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                    <RiResetLeftLine />
                </div>
                <div className='preferenceBtn-tooltip'>Restore Default Code</div>
            </button>

            <button className='preferenceBtn group' onClick={() => setSettings({ ...settings, settingModalIsOpen: true })}>
                <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                    <AiOutlineSetting />
                </div>
                <div className='preferenceBtn-tooltip'>Settings</div>
            </button>

            <button className='preferenceBtn group' onClick={handleFullScreen}>
                <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                    {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                </div>
                <div className='preferenceBtn-tooltip'>Full Screen</div>
            </button>
        </div>
        {settings.settingModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />}
    </div>
}
export default PreferenceNav;