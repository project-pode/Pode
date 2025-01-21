import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Image} from 'react-native';

const FeedbackPopUp = ({ visible, message, onClose, isAnswerCorrect}) => {
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 2000); // 2000 milliseconds = 2 seconds
        }

        return () => clearTimeout(timer);
    }, [visible])

    const popUpStyle =
        isAnswerCorrect ? styles.popUpCorrect : styles.popUpIncorrect;

    const popUpMessageStyle =
        isAnswerCorrect ? styles.popUpMessageCorrect : styles.popUpMessageIncorrect;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose} // Prevent error if the back button is pressed
        >
            <View style={styles.overlay}>
                <View style={popUpStyle}>
                <Text style={popUpMessageStyle}>{message}</Text>
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
    popUpCorrect: {
        margin: 20,
        padding: 30,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
    },
    popUpMessageCorrect: {
        color: "#4A8055",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },
    popUpIncorrect: {
        margin: 20,
        padding: 30,
        backgroundColor: "#dc8484",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#804a4a",
    },
    popUpMessageIncorrect: {
        color: "#804a4a",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },

});

export default FeedbackPopUp;
