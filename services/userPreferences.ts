import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserPreferences {
    defaultLocation: string;
    preferredCuisines: string[];
    priceRangePreference: number[];
    minRatingPreference: number;
    sortByPreference: 'relevance' | 'rating' | 'distance' | 'price';
    notificationsEnabled: boolean;
    themePreference: 'light' | 'dark' | 'system';
    autoSaveSearches: boolean;
    maxSearchHistoryItems: number;
}

const DEFAULT_PREFERENCES: UserPreferences = {
    defaultLocation: '',
    preferredCuisines: [],
    priceRangePreference: [1, 4],
    minRatingPreference: 0,
    sortByPreference: 'relevance',
    notificationsEnabled: true,
    themePreference: 'system',
    autoSaveSearches: true,
    maxSearchHistoryItems: 50,
};

const PREFERENCES_KEY = 'user_preferences';

class UserPreferencesService {
    async getPreferences(): Promise<UserPreferences> {
        try {
            const stored = await AsyncStorage.getItem(PREFERENCES_KEY);
            if (stored) {
                const preferences = JSON.parse(stored);
                // Merge with defaults to ensure all keys exist
                return { ...DEFAULT_PREFERENCES, ...preferences };
            }
            return DEFAULT_PREFERENCES;
        } catch (error) {
            console.error('Error loading preferences:', error);
            return DEFAULT_PREFERENCES;
        }
    }

    async updatePreferences(updates: Partial<UserPreferences>): Promise<void> {
        try {
            const current = await this.getPreferences();
            const updated = { ...current, ...updates };
            await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error('Error saving preferences:', error);
            throw error;
        }
    }

    async resetPreferences(): Promise<void> {
        try {
            await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(DEFAULT_PREFERENCES));
        } catch (error) {
            console.error('Error resetting preferences:', error);
            throw error;
        }
    }

    // Convenience methods
    async setDefaultLocation(location: string): Promise<void> {
        await this.updatePreferences({ defaultLocation: location });
    }

    async addPreferredCuisine(cuisine: string): Promise<void> {
        const preferences = await this.getPreferences();
        if (!preferences.preferredCuisines.includes(cuisine)) {
            const updated = [...preferences.preferredCuisines, cuisine];
            await this.updatePreferences({ preferredCuisines: updated });
        }
    }

    async removePreferredCuisine(cuisine: string): Promise<void> {
        const preferences = await this.getPreferences();
        const updated = preferences.preferredCuisines.filter(c => c !== cuisine);
        await this.updatePreferences({ preferredCuisines: updated });
    }

    async setPriceRangePreference(priceRange: number[]): Promise<void> {
        await this.updatePreferences({ priceRangePreference: priceRange });
    }

    async setMinRatingPreference(rating: number): Promise<void> {
        await this.updatePreferences({ minRatingPreference: rating });
    }

    async setSortByPreference(sortBy: 'relevance' | 'rating' | 'distance' | 'price'): Promise<void> {
        await this.updatePreferences({ sortByPreference: sortBy });
    }

    async toggleNotifications(): Promise<boolean> {
        const preferences = await this.getPreferences();
        const newValue = !preferences.notificationsEnabled;
        await this.updatePreferences({ notificationsEnabled: newValue });
        return newValue;
    }

    async setThemePreference(theme: 'light' | 'dark' | 'system'): Promise<void> {
        await this.updatePreferences({ themePreference: theme });
    }

    async toggleAutoSaveSearches(): Promise<boolean> {
        const preferences = await this.getPreferences();
        const newValue = !preferences.autoSaveSearches;
        await this.updatePreferences({ autoSaveSearches: newValue });
        return newValue;
    }

    async setMaxSearchHistoryItems(max: number): Promise<void> {
        await this.updatePreferences({ maxSearchHistoryItems: max });
    }
}

export const userPreferencesService = new UserPreferencesService(); 