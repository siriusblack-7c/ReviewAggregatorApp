import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleSearch = () => {
        if (searchQuery.trim() || location.trim()) {
            // Navigate to results with search parameters
            const query = encodeURIComponent(searchQuery);
            const loc = encodeURIComponent(location);
            router.push(`/search/results?query=${query}&location=${loc}`);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={theme.gradientPrimary}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconContainer}>
                            <Text style={styles.headerIcon}>🔍</Text>
                        </View>
                        <Text style={styles.headerTitle}>Find Restaurants</Text>
                        <Text style={styles.headerSubtitle}>
                            Search across all review platforms
                        </Text>
                    </View>

                    {/* Content Container */}
                    <View style={[styles.contentContainer, { backgroundColor: theme.backgroundSecondary }]}>
                        {/* Search Form */}
                        <View style={styles.searchForm}>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.inputLabel, { color: theme.text }]}>Restaurant Name</Text>
                                <View style={[
                                    styles.inputContainer,
                                    focusedInput === 'restaurant' && styles.inputContainerFocused
                                ]}>
                                    <LinearGradient
                                        colors={[theme.cardBackground, theme.surface]}
                                        style={styles.inputGradient}
                                    >
                                        <Text style={styles.inputIcon}>🏪</Text>
                                        <TextInput
                                            style={[styles.textInput, { color: theme.text }]}
                                            placeholder="Enter restaurant name..."
                                            value={searchQuery}
                                            onChangeText={setSearchQuery}
                                            onFocus={() => setFocusedInput('restaurant')}
                                            onBlur={() => setFocusedInput(null)}
                                            placeholderTextColor={theme.textTertiary}
                                        />
                                    </LinearGradient>
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.inputLabel, { color: theme.text }]}>Location</Text>
                                <View style={[
                                    styles.inputContainer,
                                    focusedInput === 'location' && styles.inputContainerFocused
                                ]}>
                                    <LinearGradient
                                        colors={[theme.cardBackground, theme.surface]}
                                        style={styles.inputGradient}
                                    >
                                        <Text style={styles.inputIcon}>📍</Text>
                                        <TextInput
                                            style={[styles.textInput, { color: theme.text }]}
                                            placeholder="Enter city, address, or zip code..."
                                            value={location}
                                            onChangeText={setLocation}
                                            onFocus={() => setFocusedInput('location')}
                                            onBlur={() => setFocusedInput(null)}
                                            placeholderTextColor={theme.textTertiary}
                                        />
                                    </LinearGradient>
                                </View>
                            </View>

                            <Pressable
                                style={[
                                    styles.searchButtonContainer,
                                    (!searchQuery.trim() && !location.trim()) && styles.searchButtonDisabled
                                ]}
                                onPress={handleSearch}
                                disabled={!searchQuery.trim() && !location.trim()}
                            >
                                <LinearGradient
                                    colors={
                                        (!searchQuery.trim() && !location.trim())
                                            ? [theme.textTertiary, theme.textSecondary]
                                            : theme.gradientSecondary
                                    }
                                    style={styles.searchButton}
                                >
                                    <Text style={styles.searchButtonText}>
                                        🔍 Search Restaurants
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        {/* Search Tips */}
                        <View style={styles.tipsCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.tipsGradient}
                            >
                                <View style={styles.tipsHeader}>
                                    <Text style={styles.tipsIcon}>💡</Text>
                                    <Text style={[styles.tipsTitle, { color: theme.text }]}>Search Tips</Text>
                                </View>
                                <View style={styles.tipsList}>
                                    <View style={styles.tipItem}>
                                        <Text style={[styles.tipBullet, { color: theme.textSecondary }]}>•</Text>
                                        <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                                            Enter just a restaurant name to search globally
                                        </Text>
                                    </View>
                                    <View style={styles.tipItem}>
                                        <Text style={[styles.tipBullet, { color: theme.textSecondary }]}>•</Text>
                                        <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                                            Add location for local results
                                        </Text>
                                    </View>
                                    <View style={styles.tipItem}>
                                        <Text style={[styles.tipBullet, { color: theme.textSecondary }]}>•</Text>
                                        <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                                            Try searching by cuisine type (e.g., "Italian", "Sushi")
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Popular Searches */}
                        <View style={styles.popularSection}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Searches</Text>
                            <View style={styles.popularTags}>
                                {['Pizza', 'Sushi', 'Burger', 'Thai', 'Mexican', 'Italian'].map((tag) => (
                                    <Pressable
                                        key={tag}
                                        style={styles.popularTagContainer}
                                        onPress={() => setSearchQuery(tag)}
                                    >
                                        <LinearGradient
                                            colors={theme.gradientAccent}
                                            style={styles.popularTag}
                                        >
                                            <Text style={[styles.popularTagText, { color: theme.textInverse }]}>{tag}</Text>
                                        </LinearGradient>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
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
    searchForm: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    inputContainerFocused: {
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    inputGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 16,
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
    },
    searchButtonContainer: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        marginTop: 8,
    },
    searchButtonDisabled: {
        shadowOpacity: 0.05,
    },
    searchButton: {
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tipsCard: {
        marginBottom: 32,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    tipsGradient: {
        padding: 24,
        borderRadius: 20,
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tipsIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    tipsList: {
        gap: 8,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tipBullet: {
        fontSize: 16,
        color: '#667eea',
        fontWeight: 'bold',
        marginRight: 8,
        marginTop: 2,
    },
    tipText: {
        fontSize: 15,
        color: '#6b7280',
        lineHeight: 22,
        flex: 1,
    },
    popularSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 16,
    },
    popularTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    popularTagContainer: {
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
    },
    popularTag: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    popularTagText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#667eea',
    },
}); 