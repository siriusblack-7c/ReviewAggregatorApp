import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: string;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    style,
    textStyle,
    icon
}: ButtonProps) {
    const { theme } = useTheme();

    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles[size]];

        switch (variant) {
            case 'primary':
                baseStyle.push({ backgroundColor: theme.primary });
                break;
            case 'secondary':
                baseStyle.push({ backgroundColor: theme.surface });
                break;
            case 'outline':
                baseStyle.push({
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.primary
                });
                break;
        }

        if (disabled) {
            baseStyle.push(styles.disabled);
        }

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseStyle = [styles.text, styles[`${size}Text`]];

        switch (variant) {
            case 'primary':
                baseStyle.push({ color: theme.textInverse });
                break;
            case 'secondary':
                baseStyle.push({ color: theme.text });
                break;
            case 'outline':
                baseStyle.push({ color: theme.primary });
                break;
        }

        if (disabled) {
            baseStyle.push(styles.disabledText);
        }

        return baseStyle;
    };

    return (
        <Pressable
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled}
        >
            <ThemedText style={[getTextStyle(), textStyle]}>
                {icon && `${icon} `}{title}
            </ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Sizes
    small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    // Variants
    primary: {
        backgroundColor: '#007AFF',
    },
    secondary: {
        backgroundColor: '#F2F2F7',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    disabled: {
        backgroundColor: '#8E8E93',
        opacity: 0.5,
    },

    // Text styles
    text: {
        fontWeight: '600',
    },
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },

    // Text variants
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#000000',
    },
    outlineText: {
        color: '#007AFF',
    },
    disabledText: {
        color: '#FFFFFF',
    },
}); 