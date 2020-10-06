import React from 'react';

const colourschemes = ['light', 'dark'];

export interface AppSettings {
    colourscheme: string;
}

interface SettingsProps {
    settings: AppSettings;
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const Settings = ({ settings, setSettings }: SettingsProps) => {
    return (
        <main id="settings">
            <h1>Settings</h1>
            <h2>Colour scheme</h2>
            {colourschemes.map((scheme, i) => (
                <button
                    onClick={() =>
                        setSettings({ ...settings, colourscheme: scheme })
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
