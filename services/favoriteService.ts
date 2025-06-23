import { Restaurant } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@ReviewAggregator:favorites';
const SEARCH_HISTORY_KEY = '@ReviewAggregator:searchHistory';

export interface SearchHistoryItem {
    id: string;
    query: string;
    location: string;
    timestamp: string;
    resultCount: number;
}

class FavoriteService {
    // Favorites Management
    async getFavorites(): Promise<Restaurant[]> {
        try {
            const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    async addToFavorites(restaurant: Restaurant): Promise<void> {
        try {
            const favorites = await this.getFavorites();
            const isAlreadyFavorite = favorites.some(fav => fav.id === restaurant.id);

            if (!isAlreadyFavorite) {
                const updatedFavorites = [...favorites, restaurant];
                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            throw error;
        }
    }

    async removeFromFavorites(restaurantId: string): Promise<void> {
        try {
            const favorites = await this.getFavorites();
            const updatedFavorites = favorites.filter(fav => fav.id !== restaurantId);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error removing from favorites:', error);
            throw error;
        }
    }

    async isFavorite(restaurantId: string): Promise<boolean> {
        try {
            const favorites = await this.getFavorites();
            return favorites.some(fav => fav.id === restaurantId);
        } catch (error) {
            console.error('Error checking favorite status:', error);
            return false;
        }
    }

    async toggleFavorite(restaurant: Restaurant): Promise<boolean> {
        try {
            const isFav = await this.isFavorite(restaurant.id);
            if (isFav) {
                await this.removeFromFavorites(restaurant.id);
                return false;
            } else {
                await this.addToFavorites(restaurant);
                return true;
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            throw error;
        }
    }

    // Search History Management
    async getSearchHistory(): Promise<SearchHistoryItem[]> {
        try {
            const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
            const parsed = history ? JSON.parse(history) : [];
            // Sort by most recent first
            return parsed.sort((a: SearchHistoryItem, b: SearchHistoryItem) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
        } catch (error) {
            console.error('Error loading search history:', error);
            return [];
        }
    }

    async addToSearchHistory(query: string, location: string, resultCount: number): Promise<void> {
        try {
            // Don't save empty searches
            if (!query.trim() && !location.trim()) return;

            const history = await this.getSearchHistory();

            // Remove duplicate if exists
            const filteredHistory = history.filter(
                item => !(item.query === query && item.location === location)
            );

            const newItem: SearchHistoryItem = {
                id: Date.now().toString(),
                query: query.trim(),
                location: location.trim(),
                timestamp: new Date().toISOString(),
                resultCount
            };

            // Keep only last 20 searches
            const updatedHistory = [newItem, ...filteredHistory].slice(0, 20);
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error adding to search history:', error);
        }
    }

    async clearSearchHistory(): Promise<void> {
        try {
            await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
        } catch (error) {
            console.error('Error clearing search history:', error);
            throw error;
        }
    }

    async removeSearchHistoryItem(itemId: string): Promise<void> {
        try {
            const history = await this.getSearchHistory();
            const updatedHistory = history.filter(item => item.id !== itemId);
            await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch (error) {
            console.error('Error removing search history item:', error);
            throw error;
        }
    }
}

export const favoriteService = new FavoriteService(); 