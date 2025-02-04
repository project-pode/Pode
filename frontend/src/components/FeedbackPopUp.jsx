import React, { useEffect } from 'react';
import { View, Text, Modal} from 'react-native';
import theme from '../themes/FeedbackPopUpTheme'

const FeedbackPopUp = ({ visible, message, onClose, isAnswerCorrect}) => {
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                onClose();
            }, 1500); // 1500 milliseconds = 1.5 seconds
        }

        return () => clearTimeout(timer);
    }, [visible]);

    const popUpStyle =
        isAnswerCorrect ? theme.popUpCorrect : theme.popUpIncorrect;

    const popUpMessageStyle =
        isAnswerCorrect ? theme.popUpMessageCorrect : theme.popUpMessageIncorrect;

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose} // Prevent error if the back button is pressed
        >
            <View style={theme.overlay}>
                <View style={popUpStyle}>
                <Text style={popUpMessageStyle}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};


export default FeedbackPopUp;
