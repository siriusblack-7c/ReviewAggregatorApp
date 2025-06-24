import { useTheme } from '@/contexts/ThemeContext';
import { favoriteService, SearchHistoryItem } from '@/services/favoriteService';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface NavigationCardProps {
    title: string;
    subtitle: string;
    icon: string;
    route: string;
    colors: [string, string];
    onPress: () => void;
}

function NavigationCard({ title, subtitle, icon, colors, onPress }: NavigationCardProps) {
    return (
        <Pressable style={styles.navigationCardContainer} onPress={onPress}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.navigationCard}
            >
                <View style={styles.cardIconContainer}>
                    <Text style={styles.cardIcon}>{icon}</Text>
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardSubtitle}>{subtitle}</Text>
                </View>
                <View style={styles.cardArrowContainer}>
                    <Text style={styles.cardArrow}>→</Text>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

export default function HomePage() {
    const { theme, isDark, toggleTheme } = useTheme();
    const [recentActivity, setRecentActivity] = useState<SearchHistoryItem[]>([]);
    const [activityLoading, setActivityLoading] = useState(true);

    // Load recent activity when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadRecentActivity();
        }, [])
    );

    const loadRecentActivity = async () => {
        try {
            const history = await favoriteService.getSearchHistory();
            // Show only the 3 most recent searches
            setRecentActivity(history.slice(0, 3));
        } catch (error) {
            console.error('Error loading recent activity:', error);
        } finally {
            setActivityLoading(false);
        }
    };

    const handleRecentActivityPress = (item: SearchHistoryItem) => {
        const query = encodeURIComponent(item.query);
        const location = encodeURIComponent(item.location);
        router.push(`/search/results?query=${query}&location=${location}`);
    };

    const navigationOptions = [
        {
            title: "Search Restaurants",
            subtitle: "Find reviews from all platforms",
            icon: "🔍",
            route: "/search",
            colors: theme.gradientPrimary
        },
        {
            title: "My Favorites",
            subtitle: "Your saved restaurants",
            icon: "⭐",
            route: "/favorites",
            colors: theme.gradientSecondary
        },
        {
            title: "Search History",
            subtitle: "Recent searches",
            icon: "📱",
            route: "/history",
            colors: theme.gradientAccent
        },
        {
            title: "Settings",
            subtitle: "Customize your experience",
            icon: "⚙️",
            route: "/settings",
            colors: ['#a8edea', '#fed6e3'] as [string, string]
        },
        {
            title: "About",
            subtitle: "App information",
            icon: "ℹ️",
            route: "/about",
            colors: ['#c3a6ff', '#b794f6'] as [string, string]
        }
    ];

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={theme.gradientPrimary}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroIconContainer}>
                            <Text style={styles.heroIcon}>🍽️</Text>
                        </View>
                        <Text style={[styles.heroTitle, { color: theme.textInverse }]}>Review Aggregator</Text>
                        <Text style={[styles.heroSubtitle, { color: 'rgba(255, 255, 255, 0.9)' }]}>
                            Discover the best restaurants with reviews from every platform
                        </Text>

                        {/* Theme Toggle Button */}
                        <Pressable
                            style={styles.themeToggle}
                            onPress={toggleTheme}
                        >
                            <LinearGradient
                                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                                style={styles.themeToggleGradient}
                            >
                                <Text style={styles.themeToggleText}>
                                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                                </Text>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    {/* Quick Search Section */}
                    <View style={[styles.contentContainer, { backgroundColor: theme.backgroundSecondary }]}>
                        <View style={styles.quickSearchSection}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Search</Text>
                            <Pressable
                                style={styles.quickSearchBar}
                                onPress={() => handleNavigation('/search')}
                            >
                                <LinearGradient
                                    colors={[theme.cardBackground, theme.surface]}
                                    style={styles.quickSearchGradient}
                                >
                                    <Text style={styles.quickSearchIcon}>🔍</Text>
                                    <Text style={[styles.quickSearchPlaceholder, { color: theme.textSecondary }]}>
                                        Search for restaurants...
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        {/* Navigation Grid */}
                        <View style={styles.navigationSection}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore</Text>
                            <View style={styles.navigationGrid}>
                                {navigationOptions.map((option, index) => (
                                    <NavigationCard
                                        key={index}
                                        title={option.title}
                                        subtitle={option.subtitle}
                                        icon={option.icon}
                                        route={option.route}
                                        colors={option.colors}
                                        onPress={() => handleNavigation(option.route)}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* Recent Activity Section */}
                        <View style={styles.recentSection}>
                            <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activity</Text>
                            {activityLoading ? (
                                <View style={styles.emptyStateCard}>
                                    <LinearGradient
                                        colors={[theme.cardBackground, theme.surface]}
                                        style={styles.emptyStateGradient}
                                    >
                                        <Text style={styles.emptyStateIcon}>⏳</Text>
                                        <Text style={[styles.emptyStateText, { color: theme.text }]}>Loading recent activity...</Text>
                                    </LinearGradient>
                                </View>
                            ) : recentActivity.length === 0 ? (
                                <View style={styles.emptyStateCard}>
                                    <LinearGradient
                                        colors={[theme.cardBackground, theme.surface]}
                                        style={styles.emptyStateGradient}
                                    >
                                        <Text style={styles.emptyStateIcon}>📊</Text>
                                        <Text style={[styles.emptyStateText, { color: theme.text }]}>No recent activity yet</Text>
                                        <Text style={[styles.emptyStateSubtext, { color: theme.textSecondary }]}>
                                            Start searching for restaurants to see your activity here
                                        </Text>
                                    </LinearGradient>
                                </View>
                            ) : (
                                <View style={styles.recentActivityList}>
                                    {recentActivity.map((item) => (
                                        <Pressable
                                            key={item.id}
                                            style={styles.recentActivityItem}
                                            onPress={() => handleRecentActivityPress(item)}
                                        >
                                            <LinearGradient
                                                colors={[theme.cardBackground, theme.surface]}
                                                style={styles.recentActivityGradient}
                                            >
                                                <View style={styles.recentActivityIcon}>
                                                    <Text style={styles.recentActivityIconText}>🔍</Text>
                                                </View>
                                                <View style={styles.recentActivityContent}>
                                                    <Text style={[styles.recentActivityQuery, { color: theme.text }]} numberOfLines={1}>
                                                        {item.query || 'Restaurant search'}
                                                    </Text>
                                                    <Text style={[styles.recentActivityLocation, { color: theme.textSecondary }]} numberOfLines={1}>
                                                        {item.location || 'All locations'}
                                                    </Text>
                                                    <Text style={[styles.recentActivityTime, { color: theme.textTertiary }]}>
                                                        {new Date(item.timestamp).toLocaleDateString()} • {item.resultCount} results
                                                    </Text>
                                                </View>
                                                <View style={styles.recentActivityArrow}>
                                                    <Text style={[styles.recentActivityArrowText, { color: theme.primary }]}>→</Text>
                                                </View>
                                            </LinearGradient>
                                        </Pressable>
                                    ))}

                                    {/* View All Button */}
                                    <Pressable
                                        style={styles.viewAllActivityButton}
                                        onPress={() => handleNavigation('/history')}
                                    >
                                        <LinearGradient
                                            colors={theme.gradientAccent}
                                            style={styles.viewAllActivityGradient}
                                        >
                                            <Text style={[styles.viewAllActivityText, { color: theme.textInverse }]}>View All History</Text>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                            )}
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
    heroSection: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 24,
    },
    heroIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    heroIcon: {
        fontSize: 40,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    themeToggle: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    themeToggleGradient: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    themeToggleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    contentContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 24,
        paddingBottom: 40,
        minHeight: 600,
    },
    quickSearchSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    quickSearchBar: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },
    quickSearchGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
    },
    quickSearchIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    quickSearchPlaceholder: {
        fontSize: 16,
        flex: 1,
    },
    navigationSection: {
        marginBottom: 32,
    },
    navigationGrid: {
        gap: 16,
    },
    navigationCardContainer: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    navigationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        minHeight: 80,
    },
    cardIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardIcon: {
        fontSize: 24,
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 18,
    },
    cardArrowContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardArrow: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    recentSection: {
        marginBottom: 32,
    },
    emptyStateCard: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    emptyStateGradient: {
        alignItems: 'center',
        padding: 32,
        borderRadius: 16,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    recentActivityList: {
        gap: 16,
    },
    recentActivityItem: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    recentActivityGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        minHeight: 80,
    },
    recentActivityIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    recentActivityIconText: {
        fontSize: 20,
    },
    recentActivityContent: {
        flex: 1,
    },
    recentActivityQuery: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    recentActivityLocation: {
        fontSize: 14,
        lineHeight: 18,
    },
    recentActivityTime: {
        fontSize: 12,
        lineHeight: 16,
        marginTop: 2,
    },
    recentActivityArrow: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recentActivityArrowText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewAllActivityButton: {
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewAllActivityGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
    },
    viewAllActivityText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 