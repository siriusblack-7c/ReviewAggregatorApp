import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim() || location.trim()) {
            // Navigate to results with search parameters
            router.push(`/search/results?query=${searchQuery}&location=${location}`);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.content}>
                    {/* Search Form */}
                    <View style={styles.searchForm}>
                        <ThemedText type="subtitle" style={styles.formTitle}>
                            Find Restaurants
                        </ThemedText>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Restaurant Name</ThemedText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter restaurant name..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholderTextColor="#8E8E93"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.inputLabel}>Location</ThemedText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter city, address, or zip code..."
                                value={location}
                                onChangeText={setLocation}
                                placeholderTextColor="#8E8E93"
                            />
                        </View>

                        <Pressable
                            style={[styles.searchButton, (!searchQuery.trim() && !location.trim()) && styles.searchButtonDisabled]}
                            onPress={handleSearch}
                            disabled={!searchQuery.trim() && !location.trim()}
                        >
                            <ThemedText style={styles.searchButtonText}>
                                🔍 Search Restaurants
                            </ThemedText>
                        </Pressable>
                    </View>

                    {/* Search Tips */}
                    <ThemedView style={styles.tipsSection}>
                        <ThemedText type="defaultSemiBold" style={styles.tipsTitle}>
                            Search Tips
                        </ThemedText>
                        <ThemedText style={styles.tipText}>
                            • Enter just a restaurant name to search globally
                        </ThemedText>
                        <ThemedText style={styles.tipText}>
                            • Add location for local results
                        </ThemedText>
                        <ThemedText style={styles.tipText}>
                            • Try searching by cuisine type (e.g., "Italian", "Sushi")
                        </ThemedText>
                    </ThemedView>

                    {/* Popular Searches */}
                    <ThemedView style={styles.popularSection}>
                        <ThemedText type="defaultSemiBold" style={styles.popularTitle}>
                            Popular Searches
                        </ThemedText>
                        <View style={styles.popularTags}>
                            {['Pizza', 'Sushi', 'Burger', 'Thai', 'Mexican', 'Italian'].map((tag) => (
                                <Pressable
                                    key={tag}
                                    style={styles.popularTag}
                                    onPress={() => setSearchQuery(tag)}
                                >
                                    <ThemedText style={styles.popularTagText}>{tag}</ThemedText>
                                </Pressable>
                            ))}
                        </View>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    searchForm: {
        marginBottom: 32,
    },
    formTitle: {
        marginBottom: 24,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#F2F2F7',
    },
    searchButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    searchButtonDisabled: {
        backgroundColor: '#8E8E93',
        opacity: 0.5,
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    tipsSection: {
        marginBottom: 32,
        padding: 20,
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
    },
    tipsTitle: {
        marginBottom: 12,
    },
    tipText: {
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 6,
    },
    popularSection: {
        marginBottom: 32,
    },
    popularTitle: {
        marginBottom: 16,
    },
    popularTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    popularTag: {
        backgroundColor: '#E5E5EA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    popularTagText: {
        fontSize: 14,
        color: '#007AFF',
    },
}); 