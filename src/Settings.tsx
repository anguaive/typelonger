import React from 'react';
import { setSyntheticTrailingComments } from 'typescript';

const colourschemes = ['light', 'dark'];

export const SETTINGS_STORAGE = 'typelonger_settings';

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
            <h1>Settings</h1>
            <h2>Colour scheme</h2>
            {colourschemes.map((scheme, i) => (
                <button
                    onClick={() =>
                        saveSettings({ ...settings, colourscheme: scheme })
                    }
                >
                    {scheme}
                </button>
            ))}
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
// - seoul
