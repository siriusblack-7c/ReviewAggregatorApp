import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4facfe', '#00f2fe'] as [string, string]}
                style={styles.backgroundGradient}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.headerIconContainer}>
                            <Text style={styles.headerIcon}>📱</Text>
                        </View>
                        <Text style={styles.headerTitle}>Search History</Text>
                        <Text style={styles.headerSubtitle}>
                            Your recent searches
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
                                    <Text style={styles.emptyStateIcon}>📱</Text>
                                </View>
                                <Text style={styles.emptyTitle}>No Search History</Text>
                                <Text style={styles.emptyText}>
                                    Your recent searches will appear here. Start searching for restaurants
                                    to build your search history!
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
                                    <Text style={styles.infoIcon}>🔍</Text>
                                    <Text style={styles.infoTitle}>Search History Features</Text>
                                </View>
                                <View style={styles.infoList}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>⚡</Text>
                                        <Text style={styles.infoText}>Quick access to recent searches</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>👀</Text>
                                        <Text style={styles.infoText}>See previously viewed restaurants</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoBullet}>🗑️</Text>
                                        <Text style={styles.infoText}>Clear history anytime</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Tips Section */}
                        <View style={styles.tipsCard}>
                            <LinearGradient
                                colors={['#ffffff', '#f8f9fb'] as [string, string]}
                                style={styles.tipsGradient}
                            >
                                <View style={styles.tipsHeader}>
                                    <Text style={styles.tipsIcon}>💡</Text>
                                    <Text style={styles.tipsTitle}>Pro Tips</Text>
                                </View>
                                <View style={styles.tipsList}>
                                    <View style={styles.tipItem}>
                                        <Text style={styles.tipBullet}>🎯</Text>
                                        <Text style={styles.tipText}>
                                            Frequently searched restaurants will appear at the top
                                        </Text>
                                    </View>
                                    <View style={styles.tipItem}>
                                        <Text style={styles.tipBullet}>📍</Text>
                                        <Text style={styles.tipText}>
                                            Location-based searches help you discover nearby gems
                                        </Text>
                                    </View>
                                    <View style={styles.tipItem}>
                                        <Text style={styles.tipBullet}>⏰</Text>
                                        <Text style={styles.tipText}>
                                            History shows the most recent 50 searches
                                        </Text>
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
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
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
        fontSize: 20,
        marginRight: 12,
        width: 24,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 15,
        color: '#6b7280',
        flex: 1,
        lineHeight: 22,
    },
    tipsCard: {
        marginBottom: 24,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 6,
    },
    tipsGradient: {
        padding: 24,
        borderRadius: 20,
    },
    tipsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    tipsIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    tipsList: {
        gap: 12,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tipBullet: {
        fontSize: 16,
        marginRight: 12,
        width: 20,
        marginTop: 2,
    },
    tipText: {
        fontSize: 15,
        color: '#6b7280',
        flex: 1,
        lineHeight: 22,
    },
}); 