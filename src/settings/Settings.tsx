import React from 'react';
import './Settings.css';

const colourschemes = ['light', 'dark'];

export const SETTINGS_STORAGE = 'typelonger_settings';

// TODO:
// - game font size
// - game line height
export interface AppSettings {
    colourscheme: string;
}

export const defaultSettings: AppSettings = {
    colourscheme: 'light',
};

interface SettingsProps {
    settings: AppSettings;
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const Settings = ({ settings, setSettings }: SettingsProps) => {
    const saveSettings = (settings: AppSettings) => {
        setSettings(settings);
        window.localStorage.setItem(SETTINGS_STORAGE, JSON.stringify(settings));
    };

    return (
        <main id="settings">
            <section>
                <span className="container-title">Colour scheme</span>
                <div className="container colourscheme-settings">
                    {colourschemes.map((scheme, i) => (
                        <button
                            key={i}
                            className={scheme + ' colourscheme-button'}
                            onClick={() =>
                                saveSettings({
                                    ...settings,
                                    colourscheme: scheme,
                                })
                            }
                        >
                            {scheme}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Settings;

// Must have settings:
// - colour schemes
// - font size
// - font family
// - keybindings
// - sounds
// - caret style
// - quick stats style
// - keymap style

// Colour schemes:
// - regular light
// - regular dark
// - solarized light
// - solarized dark
// - etc.
