import { LoadingState } from '@/components/common/LoadingState';
import { getRestaurantById, getRestaurantReviews } from '@/services/mockData';
import { Restaurant, Review } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RestaurantDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadRestaurantData();
        }
    }, [id]);

    const loadRestaurantData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [restaurantData, reviewsData] = await Promise.all([
                getRestaurantById(id as string),
                getRestaurantReviews(id as string)
            ]);

            if (restaurantData) {
                setRestaurant(restaurantData);
                setReviews(reviewsData);
            } else {
                setError('Restaurant not found');
            }
        } catch (err) {
            setError('Failed to load restaurant details');
        } finally {
            setLoading(false);
        }
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

    const renderPriceRange = (priceRange: number) => {
        return '$'.repeat(priceRange) + '·'.repeat(4 - priceRange);
    };

    if (loading) {
        return <LoadingState message="Loading restaurant details..." />;
    }

    if (error || !restaurant) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error || 'Restaurant not found'}</Text>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>← Go Back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    {restaurant.imageUrl ? (
                        <Image
                            source={{ uri: restaurant.imageUrl }}
                            style={styles.heroImage}
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

                    {/* Overlay Gradient */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)'] as [string, string]}
                        style={styles.imageOverlay}
                    />

                    {/* Restaurant Info Overlay */}
                    <View style={styles.heroOverlay}>
                        <Text style={styles.heroTitle}>{restaurant.name}</Text>
                        <View style={styles.heroSubInfo}>
                            <Text style={styles.heroCuisine}>
                                {restaurant.cuisineType.join(' • ')}
                            </Text>
                            <Text style={styles.heroPriceRange}>
                                {renderPriceRange(restaurant.priceRange)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Content Container */}
                <View style={styles.contentContainer}>
                    {/* Overall Rating */}
                    <View style={styles.ratingCard}>
                        <LinearGradient
                            colors={['#ffffff', '#f8f9fb'] as [string, string]}
                            style={styles.ratingGradient}
                        >
                            <View style={styles.ratingHeader}>
                                <Text style={styles.overallRatingNumber}>{restaurant.overallRating}</Text>
                                <View style={styles.ratingDetails}>
                                    {renderStars(restaurant.overallRating)}
                                    <Text style={styles.reviewCount}>
                                        Based on {restaurant.totalReviews} reviews
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    {/* Platform Ratings */}
                    <View style={styles.platformSection}>
                        <Text style={styles.sectionTitle}>Platform Ratings</Text>
                        <View style={styles.platformRatings}>
                            {Object.entries(restaurant.ratings).map(([platform, rating]) => (
                                <View key={platform} style={styles.platformRatingCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                        style={styles.platformRatingGradient}
                                    >
                                        <View style={styles.platformHeader}>
                                            <Text style={styles.platformName}>
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </Text>
                                            <View
                                                style={[
                                                    styles.platformBadge,
                                                    { backgroundColor: getPlatformColor(platform) }
                                                ]}
                                            />
                                        </View>
                                        <View style={styles.platformRatingRow}>
                                            <Text style={styles.platformRatingNumber}>{rating?.rating}</Text>
                                            {renderStars(rating?.rating || 0)}
                                            <Text style={styles.platformReviewCount}>
                                                {rating?.reviewCount} reviews
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Restaurant Details */}
                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Details</Text>
                        <View style={styles.detailsCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.detailsGradient}
                            >
                                {/* Address */}
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailIcon}>📍</Text>
                                    <View style={styles.detailContent}>
                                        <Text style={styles.detailLabel}>Address</Text>
                                        <Text style={styles.detailValue}>
                                            {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zipCode}
                                        </Text>
                                    </View>
                                </View>

                                {/* Phone */}
                                {restaurant.phone && (
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailIcon}>📞</Text>
                                        <View style={styles.detailContent}>
                                            <Text style={styles.detailLabel}>Phone</Text>
                                            <Text style={styles.detailValue}>{restaurant.phone}</Text>
                                        </View>
                                    </View>
                                )}

                                {/* Website */}
                                {restaurant.website && (
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailIcon}>🌐</Text>
                                        <View style={styles.detailContent}>
                                            <Text style={styles.detailLabel}>Website</Text>
                                            <Text style={styles.detailValue}>{restaurant.website}</Text>
                                        </View>
                                    </View>
                                )}
                            </LinearGradient>
                        </View>
                    </View>

                    {/* Features */}
                    <View style={styles.featuresSection}>
                        <Text style={styles.sectionTitle}>Features</Text>
                        <View style={styles.featuresGrid}>
                            {restaurant.features.map((feature, index) => (
                                <View key={index} style={styles.featureItem}>
                                    <LinearGradient
                                        colors={['#e0e7ff', '#c7d2fe'] as [string, string]}
                                        style={styles.featureGradient}
                                    >
                                        <Text style={styles.featureText}>
                                            {feature.name.replace(/_/g, ' ')}
                                        </Text>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Recent Reviews */}
                    {reviews.length > 0 && (
                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>Recent Reviews</Text>
                            {reviews.map((review, index) => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                        style={styles.reviewGradient}
                                    >
                                        <View style={styles.reviewHeader}>
                                            <View style={styles.reviewAuthor}>
                                                <Text style={styles.authorName}>{review.author.name}</Text>
                                                <Text style={styles.reviewPlatform}>
                                                    via {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                                                </Text>
                                            </View>
                                            <View style={styles.reviewRating}>
                                                <Text style={styles.reviewRatingNumber}>{review.rating}</Text>
                                                {renderStars(review.rating)}
                                            </View>
                                        </View>
                                        {review.title && (
                                            <Text style={styles.reviewTitle}>{review.title}</Text>
                                        )}
                                        <Text style={styles.reviewContent}>{review.content}</Text>
                                        <Text style={styles.reviewDate}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </Text>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );

    function getPlatformColor(platform: string): string {
        const colors: { [key: string]: string } = {
            google: '#4285F4',
            yelp: '#FF1A1A',
            tripadvisor: '#00AA6C',
            opentable: '#DA3743'
        };
        return colors[platform] || '#6b7280';
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    imageContainer: {
        height: 300,
        position: 'relative',
    },
    heroImage: {
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
        fontSize: 64,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
    },
    heroOverlay: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    heroCuisine: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    heroPriceRange: {
        fontSize: 16,
        color: '#22c55e',
        fontWeight: '600',
    },
    contentContainer: {
        padding: 24,
    },
    ratingCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    ratingGradient: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    ratingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    overallRatingNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#f59e0b',
    },
    ratingDetails: {
        alignItems: 'flex-start',
    },
    stars: {
        fontSize: 18,
        color: '#f59e0b',
        marginBottom: 4,
    },
    reviewCount: {
        fontSize: 14,
        color: '#6b7280',
    },
    platformSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 16,
    },
    platformRatings: {
        gap: 12,
    },
    platformRatingCard: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    platformRatingGradient: {
        padding: 16,
        borderRadius: 16,
    },
    platformHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    platformName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    platformBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    platformRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    platformRatingNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f59e0b',
    },
    platformReviewCount: {
        fontSize: 12,
        color: '#6b7280',
    },
    detailsSection: {
        marginBottom: 32,
    },
    detailsCard: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    detailsGradient: {
        padding: 20,
        borderRadius: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    detailIcon: {
        fontSize: 18,
        marginRight: 12,
        marginTop: 2,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    featuresSection: {
        marginBottom: 32,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    featureItem: {
        borderRadius: 20,
    },
    featureGradient: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    featureText: {
        fontSize: 12,
        color: '#667eea',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    reviewsSection: {
        marginBottom: 32,
    },
    reviewCard: {
        marginBottom: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    reviewGradient: {
        padding: 16,
        borderRadius: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    reviewAuthor: {
        flex: 1,
    },
    authorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    reviewPlatform: {
        fontSize: 12,
        color: '#6b7280',
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    reviewRatingNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f59e0b',
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    reviewContent: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: '#9ca3af',
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
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#667eea',
        borderRadius: 12,
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 