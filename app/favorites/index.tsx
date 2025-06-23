import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ThemedView style={styles.content}>
                    {/* Empty State */}
                    <ThemedView style={styles.emptyState}>
                        <ThemedText style={styles.emptyIcon}>⭐</ThemedText>
                        <ThemedText type="subtitle" style={styles.emptyTitle}>
                            No Favorites Yet
                        </ThemedText>
                        <ThemedText style={styles.emptyText}>
                            Start exploring restaurants and save your favorites here.
                            You'll be able to quickly access them anytime!
                        </ThemedText>
                    </ThemedView>

                    {/* Info Section */}
                    <ThemedView style={styles.infoSection}>
                        <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
                            How to Add Favorites
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • Search for restaurants you love
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • Tap the star icon to save them
                        </ThemedText>
                        <ThemedText style={styles.infoText}>
                            • Access them quickly from this page
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