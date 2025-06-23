import { LoadingState } from '@/components/common/LoadingState';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { favoriteService } from '@/services/favoriteService';
import { searchRestaurants } from '@/services/mockData';
import { Restaurant, SearchResult } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchResultsScreen() {
    const params = useLocalSearchParams();
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { query, location } = params;

    useEffect(() => {
        performSearch();
    }, [query, location]);

    const performSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await searchRestaurants({
                query: query as string,
                location: location as string
            });

            setSearchResult(result);

            // Save to search history
            await favoriteService.addToSearchHistory(
                query as string || '',
                location as string || '',
                result.totalCount
            );
        } catch (err) {
            setError('Failed to search restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantPress = (restaurant: Restaurant) => {
        router.push(`/restaurant/${restaurant.id}`);
    };

    const renderEmptyState = () => (
        <View style={styles.emptyStateCard}>
            <LinearGradient
                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                style={styles.emptyStateGradient}
            >
                <Text style={styles.emptyStateIcon}>🔍</Text>
                <Text style={styles.emptyStateTitle}>No Results Found</Text>
                <Text style={styles.emptyStateText}>
                    We couldn't find any restaurants matching your search.
                    Try adjusting your search terms or location.
                </Text>
                <Pressable
                    style={styles.retryButton}
                    onPress={() => router.back()}
                >
                    <LinearGradient
                        colors={['#667eea', '#764ba2'] as [string, string]}
                        style={styles.retryButtonGradient}
                    >
                        <Text style={styles.retryButtonText}>← Back to Search</Text>
                    </LinearGradient>
                </Pressable>
            </LinearGradient>
        </View>
    );

    if (loading) {
        return <LoadingState message="Searching restaurants..." />;
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Pressable style={styles.retryButton} onPress={performSearch}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#667eea', '#764ba2'] as [string, string]}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <Text style={styles.headerTitle}>Search Results</Text>
                        <Text style={styles.headerSubtitle}>
                            {searchResult?.totalCount || 0} restaurants found
                            {query && ` for "${query}"`}
                            {location && ` in ${location}`}
                        </Text>
                    </View>

                    {/* Content Container */}
                    <View style={styles.contentContainer}>
                        {searchResult && searchResult.restaurants.length > 0 ? (
                            <>
                                {/* Results Header */}
                                <View style={styles.resultsHeader}>
                                    <Text style={styles.resultsCount}>
                                        {searchResult.totalCount} Results
                                    </Text>
                                    <Text style={styles.searchParams}>
                                        {query || 'All restaurants'}
                                        {location && ` • ${location}`}
                                    </Text>
                                </View>

                                {/* Restaurant List */}
                                <View style={styles.restaurantList}>
                                    {searchResult.restaurants.map((restaurant, index) => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                            onPress={() => handleRestaurantPress(restaurant)}
                                            showIndex={index + 1}
                                        />
                                    ))}
                                </View>

                                {/* Load More Button (for future pagination) */}
                                {searchResult.hasMore && (
                                    <Pressable style={styles.loadMoreButton}>
                                        <LinearGradient
                                            colors={['#667eea', '#764ba2'] as [string, string]}
                                            style={styles.loadMoreGradient}
                                        >
                                            <Text style={styles.loadMoreText}>Load More Results</Text>
                                        </LinearGradient>
                                    </Pressable>
                                )}
                            </>
                        ) : (
                            renderEmptyState()
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
    resultsHeader: {
        marginBottom: 24,
    },
    resultsCount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 4,
    },
    searchParams: {
        fontSize: 14,
        color: '#6b7280',
    },
    restaurantList: {
        gap: 16,
    },
    emptyStateCard: {
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
    retryButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    retryButtonGradient: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    retryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    loadMoreButton: {
        marginTop: 24,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    loadMoreGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    loadMoreText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 16,
    },
}); 