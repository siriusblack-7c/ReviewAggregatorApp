import { Restaurant } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface RestaurantCardProps {
    restaurant: Restaurant;
    onPress: () => void;
    showIndex?: number;
}

export function RestaurantCard({ restaurant, onPress, showIndex }: RestaurantCardProps) {
    const renderPriceRange = (priceRange: number) => {
        return '$'.repeat(priceRange) + '·'.repeat(4 - priceRange);
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <Text style={styles.stars}>
                {'★'.repeat(fullStars)}
                {hasHalfStar ? '☆' : ''}
                {'☆'.repeat(emptyStars)}
            </Text>
        );
    };

    const getPlatformBadges = () => {
        const badges = [];
        if (restaurant.ratings.google) badges.push({ name: 'Google', color: '#4285F4' });
        if (restaurant.ratings.yelp) badges.push({ name: 'Yelp', color: '#FF1A1A' });
        if (restaurant.ratings.tripadvisor) badges.push({ name: 'TripAdvisor', color: '#00AA6C' });
        if (restaurant.ratings.openTable) badges.push({ name: 'OpenTable', color: '#DA3743' });
        return badges;
    };

    return (
        <Pressable style={styles.cardContainer} onPress={onPress}>
            <LinearGradient
                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                style={styles.card}
            >
                {/* Index Badge */}
                {showIndex && (
                    <View style={styles.indexBadge}>
                        <Text style={styles.indexText}>{showIndex}</Text>
                    </View>
                )}

                {/* Restaurant Image */}
                <View style={styles.imageContainer}>
                    {restaurant.imageUrl ? (
                        <Image
                            source={{ uri: restaurant.imageUrl }}
                            style={styles.restaurantImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <LinearGradient
                            colors={['#e0e7ff', '#c7d2fe'] as [string, string]}
                            style={styles.placeholderImage}
                        >
                            <Text style={styles.placeholderIcon}>🍽️</Text>
                        </LinearGradient>
                    )}

                    {/* Cuisine Badge */}
                    <View style={styles.cuisineBadge}>
                        <Text style={styles.cuisineText}>
                            {restaurant.cuisineType[0]}
                        </Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <View style={styles.infoContainer}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.restaurantName} numberOfLines={1}>
                                {restaurant.name}
                            </Text>
                            <Text style={styles.priceRange}>
                                {renderPriceRange(restaurant.priceRange)}
                            </Text>
                        </View>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.overallRating}>
                            <Text style={styles.ratingNumber}>{restaurant.overallRating}</Text>
                            {renderStars(restaurant.overallRating)}
                            <Text style={styles.reviewCount}>
                                ({restaurant.totalReviews} reviews)
                            </Text>
                        </View>
                    </View>

                    {/* Platform Badges */}
                    <View style={styles.platformBadges}>
                        {getPlatformBadges().map((platform, index) => (
                            <View key={index} style={[styles.platformBadge, { backgroundColor: platform.color }]}>
                                <Text style={styles.platformText}>{platform.name}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Address */}
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressIcon}>📍</Text>
                        <Text style={styles.addressText} numberOfLines={1}>
                            {restaurant.address}, {restaurant.city}
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresContainer}>
                        {restaurant.features.slice(0, 3).map((feature, index) => (
                            <View key={index} style={styles.featureBadge}>
                                <Text style={styles.featureText}>
                                    {feature.name.replace(/_/g, ' ')}
                                </Text>
                            </View>
                        ))}
                        {restaurant.features.length > 3 && (
                            <Text style={styles.moreFeatures}>
                                +{restaurant.features.length - 3} more
                            </Text>
                        )}
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 8,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    indexBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#667eea',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    indexText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    imageContainer: {
        height: 180,
        position: 'relative',
    },
    restaurantImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderIcon: {
        fontSize: 48,
    },
    cuisineBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    cuisineText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    infoContainer: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    nameContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        flex: 1,
    },
    priceRange: {
        fontSize: 16,
        color: '#22c55e',
        fontWeight: '600',
    },
    ratingContainer: {
        marginBottom: 12,
    },
    overallRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ratingNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f59e0b',
    },
    stars: {
        fontSize: 14,
        color: '#f59e0b',
    },
    reviewCount: {
        fontSize: 12,
        color: '#6b7280',
    },
    platformBadges: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 12,
        flexWrap: 'wrap',
    },
    platformBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    platformText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '600',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    addressText: {
        fontSize: 14,
        color: '#6b7280',
        flex: 1,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
    },
    featureBadge: {
        backgroundColor: '#e0e7ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    featureText: {
        fontSize: 10,
        color: '#667eea',
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    moreFeatures: {
        fontSize: 10,
        color: '#9ca3af',
        fontStyle: 'italic',
    },
}); 