// components/LanguageSelect.tsx
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { ISettings } from '@/components/Workspace/Playground/Playground';

type LanguageSelectProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const LanguageSelect: React.FC<LanguageSelectProps> = ({ settings, setSettings }) => {
  const handleChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      language: value as 'javaScript' | 'python' | 'cpp',
    }));
  };

  return (
    <Select.Root value={settings.language} onValueChange={handleChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded px-3 py-1.5 bg-dark-fill-3 text-white text-sm hover:bg-dark-fill-2 focus:outline-none"
        aria-label="Language"
      >
        <Select.Value />
        <Select.Icon className="ml-2 text-white">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          side="bottom"
          align="start"
          position="popper"
          className="bg-dark-layer-1 text-white rounded shadow-lg border border-dark-divider-border-2 z-50"
        >
          <Select.Viewport className="p-1 bg-dark-layer-1">
            {['javaScript', 'python', 'cpp'].map((lang) => (
              <Select.Item
                key={lang}
                value={lang}
                className="text-white text-sm px-3 py-2 rounded hover:bg-dark-fill-2 cursor-pointer flex items-center justify-between"
              >
                <Select.ItemText>{lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSelect;
