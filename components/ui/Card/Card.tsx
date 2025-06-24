import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';
import { StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: number;
    margin?: number;
    shadow?: boolean;
    borderRadius?: number;
}

export function Card({
    children,
    style,
    padding = 16,
    margin = 0,
    shadow = true,
    borderRadius = 12
}: CardProps) {
    const { theme } = useTheme();

    const cardStyle = [
        {
            backgroundColor: theme.cardBackground,
            padding,
            margin,
            borderRadius,
        },
        shadow && styles.shadow,
        style,
    ];

    return (
        <ThemedView style={cardStyle}>
            {children}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
}); 