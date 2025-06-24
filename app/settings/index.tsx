import { LoadingState } from '@/components/common/LoadingState';
import { useTheme } from '@/contexts/ThemeContext';
import { UserPreferences, userPreferencesService } from '@/services/userPreferences';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CUISINE_OPTIONS = [
    'Italian', 'Japanese', 'American', 'Indian', 'French', 'Chinese',
    'Mexican', 'Thai', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek'
];

const SORT_OPTIONS = [
    { value: 'relevance', label: '🎯 Relevance' },
    { value: 'rating', label: '⭐ Rating' },
    { value: 'distance', label: '📍 Distance' },
    { value: 'price', label: '💰 Price' }
];

const THEME_OPTIONS = [
    { value: 'light', label: '☀️ Light' },
    { value: 'dark', label: '🌙 Dark' },
    { value: 'system', label: '⚙️ System' }
];

export default function SettingsScreen() {
    const { theme, setTheme } = useTheme();
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadPreferences();
        }, [])
    );

    const loadPreferences = async () => {
        try {
            setLoading(true);
            const prefs = await userPreferencesService.getPreferences();
            setPreferences(prefs);
        } catch (error) {
            console.error('Error loading preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const updatePreference = async (updates: Partial<UserPreferences>) => {
        try {
            setSaving(true);
            await userPreferencesService.updatePreferences(updates);
            setPreferences(prev => prev ? { ...prev, ...updates } : null);

            // If theme preference is being updated, also update the theme context
            if (updates.themePreference) {
                setTheme(updates.themePreference);
            }
        } catch (error) {
            console.error('Error updating preferences:', error);
            Alert.alert('Error', 'Failed to save preferences. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const toggleCuisine = (cuisine: string) => {
        if (!preferences) return;

        const isSelected = preferences.preferredCuisines.includes(cuisine);
        const updated = isSelected
            ? preferences.preferredCuisines.filter(c => c !== cuisine)
            : [...preferences.preferredCuisines, cuisine];

        updatePreference({ preferredCuisines: updated });
    };

    const handleReset = () => {
        Alert.alert(
            'Reset Preferences',
            'Are you sure you want to reset all preferences to default values?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setSaving(true);
                            await userPreferencesService.resetPreferences();
                            await loadPreferences();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to reset preferences.');
                        } finally {
                            setSaving(false);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return <LoadingState message="Loading your preferences..." />;
    }

    if (!preferences) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
                    <Text style={[styles.errorText, { color: theme.error }]}>Failed to load preferences</Text>
                    <Pressable style={[styles.retryButton, { backgroundColor: theme.primary }]} onPress={loadPreferences}>
                        <Text style={[styles.retryButtonText, { color: theme.textInverse }]}>Retry</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={theme.gradientPrimary}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={[styles.headerIconContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                            <Text style={[styles.headerIcon, { color: theme.textInverse }]}>⚙️</Text>
                        </View>
                        <Text style={[styles.headerTitle, { color: theme.textInverse }]}>Settings</Text>
                        <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.9)' }]}>
                            Customize your experience
                        </Text>
                    </View>

                    {/* Content Container */}
                    <View style={[styles.contentContainer, { backgroundColor: theme.backgroundSecondary }]}>

                        {/* Default Location */}
                        <View style={styles.sectionCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.sectionGradient}
                            >
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>📍 Default Location</Text>
                                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>Set your preferred search location</Text>
                                <TextInput
                                    style={[styles.textInput, {
                                        borderColor: theme.border,
                                        color: theme.text,
                                        backgroundColor: theme.inputBackground
                                    }]}
                                    value={preferences.defaultLocation}
                                    onChangeText={(text) => updatePreference({ defaultLocation: text })}
                                    placeholder="Enter city or location"
                                    placeholderTextColor={theme.textTertiary}
                                />
                            </LinearGradient>
                        </View>

                        {/* Preferred Cuisines */}
                        <View style={styles.sectionCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.sectionGradient}
                            >
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>🍽️ Preferred Cuisines</Text>
                                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                                    Selected: {preferences.preferredCuisines.length} of {CUISINE_OPTIONS.length}
                                </Text>
                                <View style={styles.optionsGrid}>
                                    {CUISINE_OPTIONS.map(cuisine => {
                                        const isSelected = preferences.preferredCuisines.includes(cuisine);
                                        return (
                                            <Pressable
                                                key={cuisine}
                                                style={styles.optionButton}
                                                onPress={() => toggleCuisine(cuisine)}
                                            >
                                                <LinearGradient
                                                    colors={isSelected
                                                        ? theme.gradientAccent
                                                        : [theme.surface, theme.backgroundSecondary]
                                                    }
                                                    style={styles.optionButtonGradient}
                                                >
                                                    <Text style={[
                                                        styles.optionButtonText,
                                                        { color: isSelected ? theme.text : theme.textSecondary }
                                                    ]}>
                                                        {cuisine}
                                                    </Text>
                                                </LinearGradient>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Default Sort By */}
                        <View style={styles.sectionCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.sectionGradient}
                            >
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>🔄 Default Sort By</Text>
                                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>How should search results be ordered?</Text>
                                <View style={styles.sortOptions}>
                                    {SORT_OPTIONS.map(option => {
                                        const isSelected = preferences.sortByPreference === option.value;
                                        return (
                                            <Pressable
                                                key={option.value}
                                                style={styles.sortButton}
                                                onPress={() => updatePreference({ sortByPreference: option.value as any })}
                                            >
                                                <LinearGradient
                                                    colors={isSelected
                                                        ? theme.gradientSecondary
                                                        : [theme.surface, theme.backgroundSecondary]
                                                    }
                                                    style={styles.sortButtonGradient}
                                                >
                                                    <Text style={[
                                                        styles.sortButtonText,
                                                        { color: isSelected ? theme.textInverse : theme.textSecondary }
                                                    ]}>
                                                        {option.label}
                                                    </Text>
                                                </LinearGradient>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Theme Selection */}
                        <View style={styles.sectionCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.sectionGradient}
                            >
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>🎨 Theme</Text>
                                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>Choose your preferred color scheme</Text>
                                <View style={styles.themeOptions}>
                                    {THEME_OPTIONS.map(option => {
                                        const isSelected = preferences.themePreference === option.value;
                                        return (
                                            <Pressable
                                                key={option.value}
                                                style={styles.themeButton}
                                                onPress={() => updatePreference({ themePreference: option.value as any })}
                                            >
                                                <LinearGradient
                                                    colors={isSelected
                                                        ? theme.gradientPrimary
                                                        : [theme.surface, theme.backgroundSecondary]
                                                    }
                                                    style={styles.themeButtonGradient}
                                                >
                                                    <Text style={[
                                                        styles.themeButtonText,
                                                        { color: isSelected ? theme.textInverse : theme.textSecondary }
                                                    ]}>
                                                        {option.label}
                                                    </Text>
                                                </LinearGradient>
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </LinearGradient>
                        </View>

                        {/* App Preferences */}
                        <View style={styles.sectionCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.sectionGradient}
                            >
                                <Text style={[styles.sectionTitle, { color: theme.text }]}>📱 App Preferences</Text>

                                {/* Notifications Toggle */}
                                <View style={styles.toggleRow}>
                                    <View style={styles.toggleInfo}>
                                        <Text style={[styles.toggleTitle, { color: theme.text }]}>🔔 Notifications</Text>
                                        <Text style={[styles.toggleSubtitle, { color: theme.textSecondary }]}>Get updates about favorites</Text>
                                    </View>
                                    <Switch
                                        value={preferences.notificationsEnabled}
                                        onValueChange={(value) => updatePreference({ notificationsEnabled: value })}
                                        trackColor={{ false: theme.border, true: theme.accent }}
                                        thumbColor={preferences.notificationsEnabled ? theme.primary : theme.textTertiary}
                                    />
                                </View>

                                {/* Auto Save Searches Toggle */}
                                <View style={styles.toggleRow}>
                                    <View style={styles.toggleInfo}>
                                        <Text style={[styles.toggleTitle, { color: theme.text }]}>💾 Auto Save Searches</Text>
                                        <Text style={[styles.toggleSubtitle, { color: theme.textSecondary }]}>Automatically save search history</Text>
                                    </View>
                                    <Switch
                                        value={preferences.autoSaveSearches}
                                        onValueChange={(value) => updatePreference({ autoSaveSearches: value })}
                                        trackColor={{ false: theme.border, true: theme.accent }}
                                        thumbColor={preferences.autoSaveSearches ? theme.primary : theme.textTertiary}
                                    />
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Reset Button */}
                        <View style={styles.actionsCard}>
                            <LinearGradient
                                colors={[theme.cardBackground, theme.surface]}
                                style={styles.actionsGradient}
                            >
                                <Pressable
                                    style={styles.resetButton}
                                    onPress={handleReset}
                                    disabled={saving}
                                >
                                    <LinearGradient
                                        colors={[theme.error, theme.error]}
                                        style={styles.resetButtonGradient}
                                    >
                                        <Text style={[styles.resetButtonText, { color: theme.textInverse }]}>
                                            {saving ? '⏳ Resetting...' : '🔄 Reset to Defaults'}
                                        </Text>
                                    </LinearGradient>
                                </Pressable>
                            </LinearGradient>
                        </View>

                        {/* Back Button */}
                        <Pressable
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <LinearGradient
                                colors={theme.gradientAccent}
                                style={styles.backButtonGradient}
                            >
                                <Text style={[styles.backButtonText, { color: theme.textInverse }]}>← Back to Home</Text>
                            </LinearGradient>
                        </Pressable>
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
    sectionCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    sectionGradient: {
        padding: 24,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: '#374151',
        backgroundColor: '#ffffff',
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        borderRadius: 12,
        marginBottom: 8,
    },
    optionButtonGradient: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
    },
    optionButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sortOptions: {
        gap: 12,
    },
    sortButton: {
        borderRadius: 12,
    },
    sortButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    sortButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    toggleInfo: {
        flex: 1,
        marginRight: 16,
    },
    toggleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    toggleSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    actionsCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    actionsGradient: {
        padding: 24,
        borderRadius: 20,
    },
    resetButton: {
        borderRadius: 12,
    },
    resetButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    backButton: {
        borderRadius: 16,
        marginTop: 16,
    },
    backButtonGradient: {
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        fontSize: 18,
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#4f46e5',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    themeOptions: {
        gap: 12,
    },
    themeButton: {
        borderRadius: 12,
    },
    themeButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    themeButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 