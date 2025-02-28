import React, { useEffect } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import theme from '../themes/popUpTheme';

/**
 * PopUp component
 * 
 * This component renders a popup modal that can be used for feedback or confirmation.
 * It handles displaying messages, confirming actions, and closing the popup.
 * 
 * @param {Object} props - The component props
 * @param {boolean} props.visible - Determines if the popup is visible
 * @param {string} props.message - The message to display in the popup
 * @param {function} props.onClose - Function to call when the popup is closed (used in feedback)
 * @param {boolean} [props.isAnswerCorrect] - Determines whether to render correct or incorrect styles
 * @param {function} [props.onConfirm] - Function to call when the confirm button is pressed
 * @param {function} [props.onCancel] - Function to call when the cancel button is pressed (confirmation)
 * @param {string} [props.confirmText="Yes"] - Text to display on the confirm button
 * @param {string} props.type - The type of popup ("feedback" or "confirmation")
 * 
 * @returns {JSX.Element} The rendered component
 */
const PopUp = ({ 
    visible, 
    message, 
    onClose, 
    isAnswerCorrect, 
    onConfirm, 
    onCancel, 
    confirmText = "Yes", 
    type
}) => {
    useEffect(() => {
        let timer;
        if (visible && type === "feedback") {
            timer = setTimeout(() => {
                onClose();
            }, 1500); // 1500 milliseconds = 1.5 seconds
        }

        return () => clearTimeout(timer);
    }, [visible, type]);

    const popUpStyle =
        isAnswerCorrect ? theme.popUpCorrect : theme.popUpIncorrect;

    const popUpMessageStyle =
        isAnswerCorrect ? theme.popUpMessageCorrect : theme.popUpMessageIncorrect;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose || onCancel} // Prevent error if the back button is pressed
        >
            <Pressable style={theme.overlay} onPress={onClose || onCancel}>
                <Pressable style={type === "feedback" ? popUpStyle : theme.popup} 
                onPress={(e) => e.stopPropagation()} /* Prevent clicks inside the popup from propagating */>
                    <Text style={type === "feedback" ? popUpMessageStyle : theme.message}>{message}</Text>
                    {type === "confirmation" && (
                        <View style={theme.buttonContainer}>
                            <Pressable style={theme.button} onPress={onConfirm}>
                                <Text style={theme.buttonText}>{confirmText}</Text>
                            </Pressable>
                            {onCancel && (
                                <Pressable style={theme.button} onPress={onCancel}>
                                    <Text style={theme.buttonText}>No</Text>
                                </Pressable>
                            )}
                        </View>
                    )}
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default PopUp;