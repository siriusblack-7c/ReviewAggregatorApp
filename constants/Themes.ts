export interface ThemeColors {
    // Background colors
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceSecondary: string;

    // Gradient colors
    gradientPrimary: [string, string];
    gradientSecondary: [string, string];
    gradientAccent: [string, string];

    // Text colors
    text: string;
    textSecondary: string;
    textTertiary: string;
    textInverse: string;

    // UI element colors
    border: string;
    borderSecondary: string;
    shadow: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Interactive colors
    primary: string;
    primaryDark: string;
    accent: string;
    accentDark: string;

    // Card and overlay colors
    cardBackground: string;
    overlayBackground: string;
    inputBackground: string;

    // Platform specific colors (consistent across themes)
    google: string;
    yelp: string;
    tripadvisor: string;
    openTable: string;
}

export const lightTheme: ThemeColors = {
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f8f9fb',
    surface: '#ffffff',
    surfaceSecondary: '#f1f5f9',

    // Gradient colors
    gradientPrimary: ['#667eea', '#764ba2'],
    gradientSecondary: ['#f093fb', '#f5576c'],
    gradientAccent: ['#4facfe', '#00f2fe'],

    // Text colors
    text: '#374151',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    textInverse: '#ffffff',

    // UI element colors
    border: '#e5e7eb',
    borderSecondary: '#d1d5db',
    shadow: '#000000',

    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Interactive colors
    primary: '#667eea',
    primaryDark: '#4f46e5',
    accent: '#f093fb',
    accentDark: '#e879f9',

    // Card and overlay colors
    cardBackground: '#ffffff',
    overlayBackground: 'rgba(0, 0, 0, 0.5)',
    inputBackground: '#ffffff',

    // Platform specific colors
    google: '#4285F4',
    yelp: '#FF1A1A',
    tripadvisor: '#00AA6C',
    openTable: '#DA3743',
};

export const darkTheme: ThemeColors = {
    // Background colors
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    surface: '#1e293b',
    surfaceSecondary: '#334155',

    // Gradient colors
    gradientPrimary: ['#4f46e5', '#7c3aed'],
    gradientSecondary: ['#ec4899', '#ef4444'],
    gradientAccent: ['#06b6d4', '#3b82f6'],

    // Text colors
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    textInverse: '#0f172a',

    // UI element colors
    border: '#475569',
    borderSecondary: '#64748b',
    shadow: '#000000',

    // Status colors
    success: '#22c55e',
    warning: '#eab308',
    error: '#f87171',
    info: '#60a5fa',

    // Interactive colors
    primary: '#4f46e5',
    primaryDark: '#3730a3',
    accent: '#ec4899',
    accentDark: '#db2777',

    // Card and overlay colors
    cardBackground: '#1e293b',
    overlayBackground: 'rgba(0, 0, 0, 0.7)',
    inputBackground: '#334155',

    // Platform specific colors
    google: '#4285F4',
    yelp: '#FF1A1A',
    tripadvisor: '#00AA6C',
    openTable: '#DA3743',
};

export type ThemeName = 'light' | 'dark' | 'system';

export const themes = {
    light: lightTheme,
    dark: darkTheme,
} as const; 