import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface NavigationCardProps {
    title: string;
    subtitle: string;
    icon: string;
    route: string;
    color: string;
    onPress: () => void;
}

function NavigationCard({ title, subtitle, icon, color, onPress }: NavigationCardProps) {
    return (
        <Pressable style={[styles.navigationCard, { borderLeftColor: color }]} onPress={onPress}>
            <ThemedView style={styles.cardContent}>
                <ThemedText style={[styles.cardIcon, { color }]}>{icon}</ThemedText>
                <View style={styles.cardTextContainer}>
                    <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                        {title}
                    </ThemedText>
                    <ThemedText style={styles.cardSubtitle}>
                        {subtitle}
                    </ThemedText>
                </View>
                <ThemedText style={styles.cardArrow}>→</ThemedText>
            </ThemedView>
        </Pressable>
    );
}

export default function HomePage() {
    const colorScheme = useColorScheme();

    const navigationOptions = [
        {
            title: "Search Restaurants",
            subtitle: "Find reviews from all platforms",
            icon: "🔍",
            route: "/search",
            color: "#007AFF"
        },
        {
            title: "My Favorites",
            subtitle: "Your saved restaurants",
            icon: "⭐",
            route: "/favorites",
            color: "#FF3B30"
        },
        {
            title: "Search History",
            subtitle: "Recent searches",
            icon: "📱",
            route: "/history",
            color: "#34C759"
        },
        {
            title: "About",
            subtitle: "App information",
            icon: "ℹ️",
            route: "/about",
            color: "#8E8E93"
        }
    ];

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <ThemedView style={styles.heroSection}>
                    <ThemedText type="title" style={styles.heroTitle}>
                        Review Aggregator
                    </ThemedText>
                    <ThemedText style={styles.heroSubtitle}>
                        Find restaurant reviews from all platforms in one place
                    </ThemedText>
                </ThemedView>

                {/* Quick Search Section */}
                <ThemedView style={styles.quickSearchSection}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Quick Search
                    </ThemedText>
                    <Pressable
                        style={styles.quickSearchBar}
                        onPress={() => handleNavigation('/search')}
                    >
                        <ThemedText style={styles.quickSearchPlaceholder}>
                            🔍 Search for restaurants...
                        </ThemedText>
                    </Pressable>
                </ThemedView>

                {/* Navigation Grid */}
                <ThemedView style={styles.navigationSection}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Explore
                    </ThemedText>
                    <View style={styles.navigationGrid}>
                        {navigationOptions.map((option, index) => (
                            <NavigationCard
                                key={index}
                                title={option.title}
                                subtitle={option.subtitle}
                                icon={option.icon}
                                route={option.route}
                                color={option.color}
                                onPress={() => handleNavigation(option.route)}
                            />
                        ))}
                    </View>
                </ThemedView>

                {/* Recent Activity Section */}
                <ThemedView style={styles.recentSection}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>
                        Recent Activity
                    </ThemedText>
                    <ThemedView style={styles.emptyState}>
                        <ThemedText style={styles.emptyStateText}>
                            No recent activity yet
                        </ThemedText>
                        <ThemedText style={styles.emptyStateSubtext}>
                            Start searching for restaurants to see your activity here
                        </ThemedText>
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
    heroSection: {
        padding: 24,
        alignItems: 'center',
        paddingTop: 32,
    },
    heroTitle: {
        textAlign: 'center',
        marginBottom: 8,
    },
    heroSubtitle: {
        textAlign: 'center',
        opacity: 0.7,
        fontSize: 16,
        lineHeight: 22,
    },
    quickSearchSection: {
        padding: 24,
        paddingTop: 16,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    quickSearchBar: {
        padding: 16,
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    quickSearchPlaceholder: {
        color: '#8E8E93',
        fontSize: 16,
    },
    navigationSection: {
        padding: 24,
        paddingTop: 8,
    },
    navigationGrid: {
        gap: 12,
    },
    navigationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderLeftWidth: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'transparent',
    },
    cardIcon: {
        fontSize: 24,
        marginRight: 16,
        width: 32,
        textAlign: 'center',
    },
    cardTextContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        opacity: 0.7,
    },
    cardArrow: {
        fontSize: 18,
        opacity: 0.5,
    },
    recentSection: {
        padding: 24,
        paddingTop: 8,
    },
    emptyState: {
        alignItems: 'center',
        padding: 32,
        backgroundColor: 'transparent',
    },
    emptyStateText: {
        fontSize: 16,
        opacity: 0.7,
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        opacity: 0.5,
        textAlign: 'center',
    },
}); 