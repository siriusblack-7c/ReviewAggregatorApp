import { ThemeColors, ThemeName, darkTheme, lightTheme } from '@/constants/Themes';
import { userPreferencesService } from '@/services/userPreferences';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

interface ThemeContextType {
    theme: ThemeColors;
    themeName: ThemeName;
    isDark: boolean;
    setTheme: (themeName: ThemeName) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [themeName, setThemeName] = useState<ThemeName>('system');
    const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
        Appearance.getColorScheme()
    );

    // Listen to system theme changes
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemColorScheme(colorScheme);
        });

        return () => subscription.remove();
    }, []);

    // Load theme preference on mount
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const preferences = await userPreferencesService.getPreferences();
            setThemeName(preferences.themePreference);
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    const setTheme = async (newThemeName: ThemeName) => {
        try {
            setThemeName(newThemeName);
            await userPreferencesService.setThemePreference(newThemeName);
        } catch (error) {
            console.error('Error saving theme preference:', error);
        }
    };

    const toggleTheme = () => {
        const newTheme = getCurrentTheme() === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const getCurrentTheme = (): 'light' | 'dark' => {
        if (themeName === 'system') {
            return systemColorScheme === 'dark' ? 'dark' : 'light';
        }
        return themeName;
    };

    const currentTheme = getCurrentTheme();
    const theme = currentTheme === 'dark' ? darkTheme : lightTheme;
    const isDark = currentTheme === 'dark';

    const value: ThemeContextType = {
        theme,
        themeName,
        isDark,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
} 