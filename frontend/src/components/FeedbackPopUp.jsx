import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const FeedbackPopUp = ({ visible, message, onClose }) => {
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 3000); // 3000 milliseconds = 3 seconds
        }

        return () => clearTimeout(timer);
    }, [visible]);

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose} // Prevent error if the back button is pressed
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default FeedbackPopUp;
