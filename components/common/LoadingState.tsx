import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
    const { theme } = useTheme();
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        // Rotation animation
        const rotateAnimation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        );

        pulseAnimation.start();
        rotateAnimation.start();

        return () => {
            pulseAnimation.stop();
            rotateAnimation.stop();
        };
    }, [pulseAnim, rotateAnim]);

    const pulseScale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
    });

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={theme.gradientPrimary}
                style={styles.backgroundGradient}
            >
                <View style={styles.contentContainer}>
                    <LinearGradient
                        colors={[theme.cardBackground, theme.surface]}
                        style={styles.loadingCard}
                    >
                        <View style={styles.animationContainer}>
                            {/* Rotating outer ring */}
                            <Animated.View
                                style={[
                                    styles.outerRing,
                                    {
                                        transform: [{ rotate: rotateInterpolate }],
                                    },
                                ]}
                            >
                                <View style={styles.ringSegment1} />
                                <View style={styles.ringSegment2} />
                                <View style={styles.ringSegment3} />
                            </Animated.View>

                            {/* Pulsing center icon */}
                            <Animated.View
                                style={[
                                    styles.centerIcon,
                                    {
                                        transform: [{ scale: pulseScale }],
                                    },
                                ]}
                            >
                                <Text style={styles.iconText}>🔍</Text>
                            </Animated.View>
                        </View>

                        <Text style={[styles.loadingTitle, { color: theme.text }]}>{message}</Text>
                        <Text style={[styles.loadingSubtitle, { color: theme.textSecondary }]}>
                            Please wait while we find the best restaurants for you
                        </Text>

                        {/* Loading dots */}
                        <View style={styles.dotsContainer}>
                            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
                            <Animated.View
                                style={[
                                    styles.dot,
                                    {
                                        opacity: pulseAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.3],
                                        }),
                                    },
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.dot,
                                    {
                                        opacity: pulseAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.5, 1],
                                        }),
                                    },
                                ]}
                            />
                        </View>
                    </LinearGradient>
                </View>
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    loadingCard: {
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 12,
        minWidth: 280,
    },
    animationContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    outerRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    ringSegment1: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#667eea',
    },
    ringSegment2: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#f093fb',
    },
    ringSegment3: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4facfe',
    },
    centerIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 24,
    },
    loadingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 8,
    },
    loadingSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#667eea',
    },
}); 