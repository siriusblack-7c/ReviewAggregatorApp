import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
    const handleContactPress = () => {
        Linking.openURL('mailto:support@reviewaggregator.com');
    };

    const handleWebsitePress = () => {
        Linking.openURL('https://reviewaggregator.com');
    };

    const handlePrivacyPress = () => {
        // In a real app, this would navigate to privacy policy
        alert('Privacy Policy would be shown here');
    };

    const handleTermsPress = () => {
        // In a real app, this would navigate to terms of service
        alert('Terms of Service would be shown here');
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#667eea', '#764ba2'] as [string, string]}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.appIconContainer}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.appIconGradient}
                            >
                                <Text style={styles.appIcon}>🍽️</Text>
                            </LinearGradient>
                        </View>
                        <Text style={styles.appTitle}>Review Aggregator</Text>
                        <Text style={styles.appSubtitle}>
                            Your Ultimate Restaurant Discovery App
                        </Text>
                        <View style={styles.versionBadge}>
                            <Text style={styles.versionText}>Version 1.0.0</Text>
                        </View>
                    </View>

                    {/* Content Container */}
                    <View style={styles.contentContainer}>
                        {/* App Description */}
                        <View style={styles.descriptionCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.descriptionGradient}
                            >
                                <Text style={styles.descriptionTitle}>📱 About This App</Text>
                                <Text style={styles.descriptionText}>
                                    Review Aggregator brings together restaurant reviews from multiple platforms
                                    including Google, Yelp, TripAdvisor, and OpenTable. Discover the best dining
                                    experiences with comprehensive reviews, ratings, and detailed restaurant
                                    information all in one beautiful, easy-to-use app.
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* Features Section */}
                        <View style={styles.featuresCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.featuresGradient}
                            >
                                <Text style={styles.featuresTitle}>✨ Key Features</Text>
                                <View style={styles.featuresList}>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>🔍</Text>
                                        <Text style={styles.featureText}>Smart Restaurant Search</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>⭐</Text>
                                        <Text style={styles.featureText}>Multi-Platform Review Aggregation</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>💖</Text>
                                        <Text style={styles.featureText}>Personal Favorites Collection</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>📱</Text>
                                        <Text style={styles.featureText}>Search History Tracking</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>🎯</Text>
                                        <Text style={styles.featureText}>Advanced Filtering Options</Text>
                                    </View>
                                    <View style={styles.featureItem}>
                                        <Text style={styles.featureIcon}>📍</Text>
                                        <Text style={styles.featureText}>Location-Based Discovery</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Tech Stack */}
                        <View style={styles.techCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.techGradient}
                            >
                                <Text style={styles.techTitle}>🛠️ Built With</Text>
                                <View style={styles.techList}>
                                    <View style={styles.techItem}>
                                        <Text style={styles.techIcon}>⚛️</Text>
                                        <Text style={styles.techText}>React Native & Expo</Text>
                                    </View>
                                    <View style={styles.techItem}>
                                        <Text style={styles.techIcon}>📘</Text>
                                        <Text style={styles.techText}>TypeScript</Text>
                                    </View>
                                    <View style={styles.techItem}>
                                        <Text style={styles.techIcon}>🎨</Text>
                                        <Text style={styles.techText}>Beautiful Gradients & Animations</Text>
                                    </View>
                                    <View style={styles.techItem}>
                                        <Text style={styles.techIcon}>💾</Text>
                                        <Text style={styles.techText}>AsyncStorage for Data Persistence</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Contact & Links */}
                        <View style={styles.contactCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.contactGradient}
                            >
                                <Text style={styles.contactTitle}>📞 Get In Touch</Text>

                                <Pressable style={styles.contactButton} onPress={handleContactPress}>
                                    <LinearGradient
                                        colors={['#22c55e', '#16a34a'] as [string, string]}
                                        style={styles.contactButtonGradient}
                                    >
                                        <Text style={styles.contactButtonText}>📧 Contact Support</Text>
                                    </LinearGradient>
                                </Pressable>

                                <Pressable style={styles.contactButton} onPress={handleWebsitePress}>
                                    <LinearGradient
                                        colors={['#3b82f6', '#1d4ed8'] as [string, string]}
                                        style={styles.contactButtonGradient}
                                    >
                                        <Text style={styles.contactButtonText}>🌐 Visit Website</Text>
                                    </LinearGradient>
                                </Pressable>
                            </LinearGradient>
                        </View>

                        {/* Legal & Policies */}
                        <View style={styles.legalCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.legalGradient}
                            >
                                <Text style={styles.legalTitle}>⚖️ Legal Information</Text>

                                <Pressable style={styles.legalButton} onPress={handlePrivacyPress}>
                                    <Text style={styles.legalButtonText}>🔒 Privacy Policy</Text>
                                </Pressable>

                                <Pressable style={styles.legalButton} onPress={handleTermsPress}>
                                    <Text style={styles.legalButtonText}>📋 Terms of Service</Text>
                                </Pressable>

                                <Text style={styles.copyrightText}>
                                    © 2024 Review Aggregator. All rights reserved.
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* Developer Credits */}
                        <View style={styles.creditsCard}>
                            <LinearGradient
                                colors={['#f093fb', '#f5576c'] as [string, string]}
                                style={styles.creditsGradient}
                            >
                                <Text style={styles.creditsTitle}>👨‍💻 Developed by</Text>
                                <Text style={styles.creditsText}>
                                    Built with ❤️ for food lovers everywhere
                                </Text>
                                <Text style={styles.creditsSubtext}>
                                    Connecting diners with the best restaurant experiences
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* Back Button */}
                        <Pressable style={styles.backButton} onPress={() => router.back()}>
                            <LinearGradient
                                colors={['#667eea', '#764ba2'] as [string, string]}
                                style={styles.backButtonGradient}
                            >
                                <Text style={styles.backButtonText}>← Back to App</Text>
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
    appIconContainer: {
        marginBottom: 20,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 12,
    },
    appIconGradient: {
        width: 100,
        height: 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appIcon: {
        fontSize: 48,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    appSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 16,
    },
    versionBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    versionText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
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
    // Description Card
    descriptionCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    descriptionGradient: {
        padding: 24,
        borderRadius: 20,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        color: '#6b7280',
        lineHeight: 24,
    },
    // Features Card
    featuresCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    featuresGradient: {
        padding: 24,
        borderRadius: 20,
    },
    featuresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 20,
    },
    featuresList: {
        gap: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureIcon: {
        fontSize: 20,
        marginRight: 12,
        width: 32,
    },
    featureText: {
        fontSize: 16,
        color: '#6b7280',
        flex: 1,
    },
    // Tech Card
    techCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    techGradient: {
        padding: 24,
        borderRadius: 20,
    },
    techTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 20,
    },
    techList: {
        gap: 12,
    },
    techItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    techIcon: {
        fontSize: 18,
        marginRight: 12,
        width: 28,
    },
    techText: {
        fontSize: 15,
        color: '#6b7280',
        flex: 1,
    },
    // Contact Card
    contactCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    contactGradient: {
        padding: 24,
        borderRadius: 20,
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 20,
    },
    contactButton: {
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    contactButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    contactButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Legal Card
    legalCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    legalGradient: {
        padding: 24,
        borderRadius: 20,
    },
    legalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 20,
    },
    legalButton: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    legalButtonText: {
        fontSize: 16,
        color: '#667eea',
        fontWeight: '500',
    },
    copyrightText: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: 16,
        fontStyle: 'italic',
    },
    // Credits Card
    creditsCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    creditsGradient: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    creditsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 12,
        textAlign: 'center',
    },
    creditsText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 8,
    },
    creditsSubtext: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    // Back Button
    backButton: {
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    backButtonGradient: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 