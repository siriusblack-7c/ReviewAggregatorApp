import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export interface SearchFilters {
    cuisineTypes: string[];
    priceRange: number[];
    minRating: number;
    features: string[];
    sortBy: 'relevance' | 'rating' | 'distance' | 'price';
}

interface SearchFiltersProps {
    filters: SearchFilters;
    onFiltersChange: (filters: SearchFilters) => void;
    onClose: () => void;
}

const CUISINE_TYPES = [
    'Italian', 'Japanese', 'American', 'Indian', 'French', 'Chinese',
    'Mexican', 'Thai', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek'
];

const FEATURES = [
    'delivery', 'takeout', 'reservations', 'outdoor_seating',
    'wifi', 'parking', 'wheelchair_accessible', 'alcohol'
];

const SORT_OPTIONS = [
    { value: 'relevance', label: '🎯 Relevance' },
    { value: 'rating', label: '⭐ Rating' },
    { value: 'distance', label: '📍 Distance' },
    { value: 'price', label: '💰 Price' }
];

export function SearchFilters({ filters, onFiltersChange, onClose }: SearchFiltersProps) {
    const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

    const updateFilters = (updates: Partial<SearchFilters>) => {
        const newFilters = { ...localFilters, ...updates };
        setLocalFilters(newFilters);
    };

    const handleApply = () => {
        onFiltersChange(localFilters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters: SearchFilters = {
            cuisineTypes: [],
            priceRange: [1, 4],
            minRating: 0,
            features: [],
            sortBy: 'relevance'
        };
        setLocalFilters(resetFilters);
    };

    const toggleCuisine = (cuisine: string) => {
        const newCuisines = localFilters.cuisineTypes.includes(cuisine)
            ? localFilters.cuisineTypes.filter(c => c !== cuisine)
            : [...localFilters.cuisineTypes, cuisine];
        updateFilters({ cuisineTypes: newCuisines });
    };

    const toggleFeature = (feature: string) => {
        const newFeatures = localFilters.features.includes(feature)
            ? localFilters.features.filter(f => f !== feature)
            : [...localFilters.features, feature];
        updateFilters({ features: newFeatures });
    };

    const renderPriceButton = (price: number) => {
        const isSelected = localFilters.priceRange.includes(price);
        return (
            <Pressable
                key={price}
                style={styles.priceButton}
                onPress={() => {
                    const newRange = isSelected
                        ? localFilters.priceRange.filter(p => p !== price)
                        : [...localFilters.priceRange, price].sort();
                    updateFilters({ priceRange: newRange });
                }}
            >
                <LinearGradient
                    colors={isSelected
                        ? ['#667eea', '#764ba2']
                        : ['#f8f9fb', '#e5e7eb']
                    }
                    style={styles.priceButtonGradient}
                >
                    <Text style={[
                        styles.priceButtonText,
                        { color: isSelected ? '#ffffff' : '#6b7280' }
                    ]}>
                        {'$'.repeat(price)}
                    </Text>
                </LinearGradient>
            </Pressable>
        );
    };

    const renderRatingButton = (rating: number) => {
        const isSelected = localFilters.minRating === rating;
        return (
            <Pressable
                key={rating}
                style={styles.ratingButton}
                onPress={() => updateFilters({ minRating: isSelected ? 0 : rating })}
            >
                <LinearGradient
                    colors={isSelected
                        ? ['#f59e0b', '#d97706']
                        : ['#f8f9fb', '#e5e7eb']
                    }
                    style={styles.ratingButtonGradient}
                >
                    <Text style={[
                        styles.ratingButtonText,
                        { color: isSelected ? '#ffffff' : '#6b7280' }
                    ]}>
                        {rating}★+
                    </Text>
                </LinearGradient>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                style={styles.contentGradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Search Filters</Text>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Cuisine Type */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>🍽️ Cuisine Type</Text>
                        <View style={styles.optionsGrid}>
                            {CUISINE_TYPES.map(cuisine => {
                                const isSelected = localFilters.cuisineTypes.includes(cuisine);
                                return (
                                    <Pressable
                                        key={cuisine}
                                        style={styles.optionButton}
                                        onPress={() => toggleCuisine(cuisine)}
                                    >
                                        <LinearGradient
                                            colors={isSelected
                                                ? ['#667eea', '#764ba2']
                                                : ['#f8f9fb', '#e5e7eb']
                                            }
                                            style={styles.optionButtonGradient}
                                        >
                                            <Text style={[
                                                styles.optionButtonText,
                                                { color: isSelected ? '#ffffff' : '#6b7280' }
                                            ]}>
                                                {cuisine}
                                            </Text>
                                        </LinearGradient>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Price Range */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>💰 Price Range</Text>
                        <View style={styles.priceRange}>
                            {[1, 2, 3, 4].map(renderPriceButton)}
                        </View>
                    </View>

                    {/* Minimum Rating */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>⭐ Minimum Rating</Text>
                        <View style={styles.ratingRange}>
                            {[3, 4, 5].map(renderRatingButton)}
                        </View>
                    </View>

                    {/* Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>✨ Features</Text>
                        <View style={styles.optionsGrid}>
                            {FEATURES.map(feature => {
                                const isSelected = localFilters.features.includes(feature);
                                const displayName = feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                return (
                                    <Pressable
                                        key={feature}
                                        style={styles.optionButton}
                                        onPress={() => toggleFeature(feature)}
                                    >
                                        <LinearGradient
                                            colors={isSelected
                                                ? ['#22c55e', '#16a34a']
                                                : ['#f8f9fb', '#e5e7eb']
                                            }
                                            style={styles.optionButtonGradient}
                                        >
                                            <Text style={[
                                                styles.optionButtonText,
                                                { color: isSelected ? '#ffffff' : '#6b7280' }
                                            ]}>
                                                {displayName}
                                            </Text>
                                        </LinearGradient>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* Sort By */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>📊 Sort By</Text>
                        <View style={styles.sortOptions}>
                            {SORT_OPTIONS.map(option => {
                                const isSelected = localFilters.sortBy === option.value;
                                return (
                                    <Pressable
                                        key={option.value}
                                        style={styles.sortButton}
                                        onPress={() => updateFilters({ sortBy: option.value as any })}
                                    >
                                        <LinearGradient
                                            colors={isSelected
                                                ? ['#f093fb', '#f5576c']
                                                : ['#f8f9fb', '#e5e7eb']
                                            }
                                            style={styles.sortButtonGradient}
                                        >
                                            <Text style={[
                                                styles.sortButtonText,
                                                { color: isSelected ? '#ffffff' : '#6b7280' }
                                            ]}>
                                                {option.label}
                                            </Text>
                                        </LinearGradient>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <Pressable style={styles.resetButton} onPress={handleReset}>
                        <LinearGradient
                            colors={['#6b7280', '#4b5563'] as [string, string]}
                            style={styles.resetButtonGradient}
                        >
                            <Text style={styles.resetButtonText}>🔄 Reset</Text>
                        </LinearGradient>
                    </Pressable>

                    <Pressable style={styles.applyButton} onPress={handleApply}>
                        <LinearGradient
                            colors={['#667eea', '#764ba2'] as [string, string]}
                            style={styles.applyButtonGradient}
                        >
                            <Text style={styles.applyButtonText}>✅ Apply Filters</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    contentGradient: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#6b7280',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        borderRadius: 20,
    },
    optionButtonGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    optionButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    priceRange: {
        flexDirection: 'row',
        gap: 12,
    },
    priceButton: {
        borderRadius: 12,
    },
    priceButtonGradient: {
        width: 50,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingRange: {
        flexDirection: 'row',
        gap: 12,
    },
    ratingButton: {
        borderRadius: 12,
    },
    ratingButtonGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    sortOptions: {
        gap: 8,
    },
    sortButton: {
        borderRadius: 12,
    },
    sortButtonGradient: {
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    sortButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },
    resetButton: {
        flex: 1,
        borderRadius: 12,
    },
    resetButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 2,
        borderRadius: 12,
    },
    applyButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 