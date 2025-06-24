import { useColorScheme } from '@/hooks/useColorScheme';
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
    const colorScheme = useColorScheme();
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
            colors: ['#667eea', '#764ba2'] as [string, string]
        },
        {
            title: "My Favorites",
            subtitle: "Your saved restaurants",
            icon: "⭐",
            route: "/favorites",
            colors: ['#f093fb', '#f5576c'] as [string, string]
        },
        {
            title: "Search History",
            subtitle: "Recent searches",
            icon: "📱",
            route: "/history",
            colors: ['#4facfe', '#00f2fe'] as [string, string]
        },
        {
            title: "About",
            subtitle: "App information",
            icon: "ℹ️",
            route: "/about",
            colors: ['#a8edea', '#fed6e3'] as [string, string]
        }
    ];

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroIconContainer}>
                            <Text style={styles.heroIcon}>🍽️</Text>
                        </View>
                        <Text style={styles.heroTitle}>Review Aggregator</Text>
                        <Text style={styles.heroSubtitle}>
                            Discover the best restaurants with reviews from every platform
                        </Text>
                    </View>

                    {/* Quick Search Section */}
                    <View style={styles.contentContainer}>
                        <View style={styles.quickSearchSection}>
                            <Text style={styles.sectionTitle}>Quick Search</Text>
                            <Pressable
                                style={styles.quickSearchBar}
                                onPress={() => handleNavigation('/search')}
                            >
                                <LinearGradient
                                    colors={['#ffffff', '#f8f9fb']}
                                    style={styles.quickSearchGradient}
                                >
                                    <Text style={styles.quickSearchIcon}>🔍</Text>
                                    <Text style={styles.quickSearchPlaceholder}>
                                        Search for restaurants...
                                    </Text>
                                </LinearGradient>
                            </Pressable>
                        </View>

                        {/* Navigation Grid */}
                        <View style={styles.navigationSection}>
                            <Text style={styles.sectionTitle}>Explore</Text>
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
                            <Text style={styles.sectionTitle}>Recent Activity</Text>
                            {activityLoading ? (
                                <View style={styles.emptyStateCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb']}
                                        style={styles.emptyStateGradient}
                                    >
                                        <Text style={styles.emptyStateIcon}>⏳</Text>
                                        <Text style={styles.emptyStateText}>Loading recent activity...</Text>
                                    </LinearGradient>
                                </View>
                            ) : recentActivity.length === 0 ? (
                                <View style={styles.emptyStateCard}>
                                    <LinearGradient
                                        colors={['#ffffff', '#f8f9fb']}
                                        style={styles.emptyStateGradient}
                                    >
                                        <Text style={styles.emptyStateIcon}>📊</Text>
                                        <Text style={styles.emptyStateText}>No recent activity yet</Text>
                                        <Text style={styles.emptyStateSubtext}>
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
                                                colors={['#ffffff', '#f8f9fb']}
                                                style={styles.recentActivityGradient}
                                            >
                                                <View style={styles.recentActivityIcon}>
                                                    <Text style={styles.recentActivityIconText}>🔍</Text>
                                                </View>
                                                <View style={styles.recentActivityContent}>
                                                    <Text style={styles.recentActivityQuery} numberOfLines={1}>
                                                        {item.query || 'Restaurant search'}
                                                    </Text>
                                                    <Text style={styles.recentActivityLocation} numberOfLines={1}>
                                                        {item.location || 'All locations'}
                                                    </Text>
                                                    <Text style={styles.recentActivityTime}>
                                                        {new Date(item.timestamp).toLocaleDateString()} • {item.resultCount} results
                                                    </Text>
                                                </View>
                                                <View style={styles.recentActivityArrow}>
                                                    <Text style={styles.recentActivityArrowText}>→</Text>
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
                                            colors={['#4facfe', '#00f2fe']}
                                            style={styles.viewAllActivityGradient}
                                        >
                                            <Text style={styles.viewAllActivityText}>View All History</Text>
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
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
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
    quickSearchSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2d3748',
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
        color: '#6b7280',
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
        color: '#374151',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#6b7280',
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
        color: '#374151',
        marginBottom: 4,
    },
    recentActivityLocation: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 18,
    },
    recentActivityTime: {
        fontSize: 12,
        color: '#9ca3af',
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
        color: '#4facfe',
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
        color: '#ffffff',
    },
}); 