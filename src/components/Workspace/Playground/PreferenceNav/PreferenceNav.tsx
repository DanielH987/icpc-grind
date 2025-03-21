import React, { useState, useEffect } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModals';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

type PreferenceNavProps = {
    settings: ISettings;
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ settings, setSettings }) => {
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