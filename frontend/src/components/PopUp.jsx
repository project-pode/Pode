import { View, Text, Pressable, Modal } from 'react-native';
import theme from '../themes/PopUpTheme';


const PopUp = ({ visible, message, onConfirm, onCancel, confirmText = "Yes" }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={theme.overlay}>
                <View style={theme.popup}>
                    <Text style={theme.message}>{message}</Text> {/* This is the message that will be displayed in the popup */}
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
                </View>
            </View>
        </Modal>
    );
};

export default PopUp;