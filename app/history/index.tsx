import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.content}>
                    {/* Empty State */}
                    <ThemedView style={styles.emptyState}>
                        <ThemedText style={styles.emptyIcon}>📱</ThemedText>
                        <ThemedText type="subtitle" style={styles.emptyTitle}>
                            No Search History
                        </ThemedText>
                        <ThemedText style={styles.emptyText}>
                            Your recent searches will appear here. Start searching for restaurants
                            to build your search history!
                        </ThemedText>
                    </ThemedView>

                    {/* Info Section */}
                    <ThemedView style={styles.infoSection}>
                        <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
                            Search History Features
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • Quick access to recent searches
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • See previously viewed restaurants
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • Clear history anytime
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
    content: {
        padding: 24,
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        marginBottom: 32,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        textAlign: 'center',
        marginBottom: 12,
    },
    emptyText: {
        textAlign: 'center',
        opacity: 0.7,
        lineHeight: 22,
        fontSize: 16,
    },
    infoSection: {
        padding: 20,
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
    },
    infoTitle: {
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        opacity: 0.8,
        marginBottom: 6,
    },
}); 