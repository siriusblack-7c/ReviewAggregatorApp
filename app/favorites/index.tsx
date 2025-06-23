import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#f093fb', '#f5576c'] as [string, string]}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconContainer}>
                            <Text style={styles.headerIcon}>⭐</Text>
                        </View>
                        <Text style={styles.headerTitle}>My Favorites</Text>
                        <Text style={styles.headerSubtitle}>
                            Your saved restaurants
                        </Text>
                    </View>

                    {/* Content Container */}
                    <View style={styles.contentContainer}>
                        {/* Empty State */}
                        <View style={styles.emptyStateCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.emptyStateGradient}
                            >
                                <View style={styles.emptyIconContainer}>
                                    <Text style={styles.emptyStateIcon}>⭐</Text>
                                </View>
                                <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                                <Text style={styles.emptyText}>
                                    Start exploring restaurants and save your favorites here.
                                    You'll be able to quickly access them anytime!
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* Info Section */}
                        <View style={styles.infoCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.infoGradient}
                            >
                                <View style={styles.infoHeader}>
                                    <Text style={styles.infoIcon}>💫</Text>
                                    <Text style={styles.infoTitle}>How to Add Favorites</Text>
                                </View>
                                <View style={styles.infoList}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>1.</Text>
                                        <Text style={styles.infoText}>Search for restaurants you love</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>2.</Text>
                                        <Text style={styles.infoText}>Tap the star icon to save them</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>3.</Text>
                                        <Text style={styles.infoText}>Access them quickly from this page</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Features Preview */}
                        <View style={styles.featuresCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.featuresGradient}
                            >
                                <View style={styles.featuresHeader}>
                                    <Text style={styles.featuresIcon}>🎯</Text>
                                    <Text style={styles.featuresTitle}>Coming Soon</Text>
                                </View>
                                <View style={styles.featuresList}>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureBullet}>✨</Text>
                                        <Text style={styles.featureText}>Organize favorites by categories</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureBullet}>🔔</Text>
                                        <Text style={styles.featureText}>Get notified about new reviews</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureBullet}>📊</Text>
                                        <Text style={styles.featureText}>Compare ratings over time</Text>
                                    </View>
                                </View>
                            </LinearGradient>
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
    emptyStateCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    emptyStateGradient: {
        alignItems: 'center',
        padding: 32,
        borderRadius: 20,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(240, 147, 251, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emptyStateIcon: {
        fontSize: 40,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    infoCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    infoGradient: {
        padding: 24,
        borderRadius: 20,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    infoList: {
        gap: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoBullet: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#f093fb',
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 24,
        marginRight: 12,
    },
    infoText: {
        fontSize: 15,
        color: '#6b7280',
        flex: 1,
        lineHeight: 22,
    },
    featuresCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    featuresGradient: {
        padding: 24,
        borderRadius: 20,
    },
    featuresHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    featuresIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureBullet: {
        fontSize: 16,
        marginRight: 12,
        width: 20,
    },
    featureText: {
        fontSize: 15,
        color: '#6b7280',
        flex: 1,
        lineHeight: 22,
    },
}); 