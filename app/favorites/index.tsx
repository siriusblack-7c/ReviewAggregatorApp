import { LoadingState } from '@/components/common/LoadingState';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { favoriteService } from '@/services/favoriteService';
import { Restaurant } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
    const [favorites, setFavorites] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Load favorites when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const loadFavorites = async () => {
        try {
            setLoading(true);
            const favoritesData = await favoriteService.getFavorites();
            setFavorites(favoritesData);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadFavorites();
        setRefreshing(false);
    };

    const handleRestaurantPress = (restaurant: Restaurant) => {
        router.push(`/restaurant/${restaurant.id}`);
    };

    const handleRemoveFavorite = async (restaurantId: string) => {
        try {
            await favoriteService.removeFromFavorites(restaurantId);
            setFavorites(prev => prev.filter(fav => fav.id !== restaurantId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (loading) {
        return <LoadingState message="Loading your favorites..." />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#f093fb', '#f5576c'] as [string, string]}
                style={styles.backgroundGradient}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                >
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconContainer}>
                            <Text style={styles.headerIcon}>💖</Text>
                        </View>
                        <Text style={styles.headerTitle}>Your Favorites</Text>
                        <Text style={styles.headerSubtitle}>
                            {favorites.length === 0
                                ? "Save restaurants you love for quick access"
                                : `${favorites.length} favorite restaurant${favorites.length === 1 ? '' : 's'}`
                            }
                        </Text>
                    </View>

                    {/* Content Container */}
                    <View style={styles.contentContainer}>
                        {favorites.length === 0 ? (
                            <>
                                {/* Empty State */}
                                <View style={styles.emptyStateCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                        style={styles.emptyStateGradient}
                                    >
                                        <Text style={styles.emptyStateIcon}>💖</Text>
                                        <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
                                        <Text style={styles.emptyStateText}>
                                            Start exploring restaurants and save your favorites here.
                                            Tap the heart icon on any restaurant to add it to your collection!
                                        </Text>

                                        <Pressable
                                            style={styles.exploreButton}
                                            onPress={() => router.push('/search')}
                                        >
                                            <LinearGradient
                                                colors={['#f093fb', '#f5576c'] as [string, string]}
                                                style={styles.exploreButtonGradient}
                                            >
                                                <Text style={styles.exploreButtonText}>🔍 Explore Restaurants</Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </LinearGradient>
                                </View>

                                {/* How To Section */}
                                <View style={styles.infoCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                        style={styles.infoGradient}
                                    >
                                        <View style={styles.infoHeader}>
                                            <Text style={styles.infoIcon}>💡</Text>
                                            <Text style={styles.infoTitle}>How to Add Favorites</Text>
                                        </View>
                                        <View style={styles.infoList}>
                                            <View style={styles.infoItem}>
                                                <Text style={styles.infoBullet}>1.</Text>
                                                <Text style={styles.infoText}>Search for restaurants</Text>
                                            </View>
                                            <View style={styles.infoItem}>
                                                <Text style={styles.infoBullet}>2.</Text>
                                                <Text style={styles.infoText}>Tap the ❤️ icon to save</Text>
                                            </View>
                                            <View style={styles.infoItem}>
                                                <Text style={styles.infoBullet}>3.</Text>
                                                <Text style={styles.infoText}>Find them here instantly!</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>

                                {/* Coming Soon Features */}
                                <View style={styles.featuresCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                        style={styles.featuresGradient}
                                    >
                                        <View style={styles.featuresHeader}>
                                            <Text style={styles.featuresIcon}>🎯</Text>
                                            <Text style={styles.featuresTitle}>Coming Soon</Text>
                                        </View>
                                        <View style={styles.featuresList}>
                                            <View style={styles.featureItem}>
                                                <Text style={styles.featureBullet}>🔔</Text>
                                                <Text style={styles.featureText}>Smart notifications for special offers</Text>
                                            </View>
                                            <View style={styles.featureItem}>
                                                <Text style={styles.featureBullet}>📊</Text>
                                                <Text style={styles.featureText}>AI recommendations based on taste</Text>
                                            </View>
                                            <View style={styles.featureItem}>
                                                <Text style={styles.featureBullet}>👥</Text>
                                                <Text style={styles.featureText}>Share collections with friends</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </>
                        ) : (
                            <>
                                {/* Favorites Header */}
                                <View style={styles.favoritesHeader}>
                                    <Text style={styles.favoritesTitle}>Your Collection</Text>
                                    <Text style={styles.favoritesSubtitle}>
                                        Tap to view details • Swipe to manage
                                    </Text>
                                </View>

                                {/* Favorites List */}
                                <View style={styles.favoritesList}>
                                    {favorites.map((restaurant, index) => (
                                        <View key={restaurant.id} style={styles.favoriteItem}>
                                            <RestaurantCard
                                                restaurant={restaurant}
                                                onPress={() => handleRestaurantPress(restaurant)}
                                                showIndex={index + 1}
                                            />

                                            {/* Remove Button */}
                                            <Pressable
                                                style={styles.removeButton}
                                                onPress={() => handleRemoveFavorite(restaurant.id)}
                                            >
                                                <LinearGradient
                                                    colors={['#ef4444', '#dc2626'] as [string, string]}
                                                    style={styles.removeButtonGradient}
                                                >
                                                    <Text style={styles.removeButtonText}>💔 Remove Favorite</Text>
                                                </LinearGradient>
                                            </Pressable>
                                        </View>
                                    ))}
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.actionsSection}>
                                    <Pressable
                                        style={styles.actionButton}
                                        onPress={() => router.push('/search')}
                                    >
                                        <LinearGradient
                                            colors={['#22c55e', '#16a34a'] as [string, string]}
                                            style={styles.actionButtonGradient}
                                        >
                                            <Text style={styles.actionButtonText}>🔍 Find More Restaurants</Text>
                                        </LinearGradient>
                                    </Pressable>

                                    <Pressable
                                        style={styles.actionButton}
                                        onPress={() => router.push('/')}
                                    >
                                        <LinearGradient
                                            colors={['#667eea', '#764ba2'] as [string, string]}
                                            style={styles.actionButtonGradient}
                                        >
                                            <Text style={styles.actionButtonText}>🏠 Back to Home</Text>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGradient: {
        flex: 1,
    },
    headerSection: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 24,
    },
    headerIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    headerIcon: {
        fontSize: 28,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    contentContainer: {
        backgroundColor: '#f8f9fb',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 24,
        paddingBottom: 40,
        minHeight: 600,
    },
    // Empty State Styles
    emptyStateCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    emptyStateGradient: {
        alignItems: 'center',
        padding: 40,
        borderRadius: 20,
    },
    emptyStateIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    emptyStateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 12,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    exploreButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    exploreButtonGradient: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    exploreButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Info Card Styles
    infoCard: {
        marginBottom: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    infoGradient: {
        padding: 20,
        borderRadius: 16,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    infoList: {
        gap: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoBullet: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f093fb',
        width: 24,
    },
    infoText: {
        fontSize: 14,
        color: '#6b7280',
        flex: 1,
    },
    // Features Card Styles
    featuresCard: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    featuresGradient: {
        padding: 20,
        borderRadius: 16,
    },
    featuresHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    featuresIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureBullet: {
        fontSize: 16,
        width: 24,
    },
    featureText: {
        fontSize: 14,
        color: '#6b7280',
        flex: 1,
    },
    // Favorites List Styles
    favoritesHeader: {
        marginBottom: 20,
    },
    favoritesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 4,
    },
    favoritesSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    favoritesList: {
        gap: 16,
        marginBottom: 32,
    },
    favoriteItem: {
        gap: 12,
    },
    removeButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    removeButtonGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
    // Actions Section
    actionsSection: {
        gap: 12,
    },
    actionButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    actionButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 