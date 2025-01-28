import { View, Text, Pressable, StyleSheet, Modal } from 'react-native';


const PopUp = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.message}>{message}</Text> {/* This is the message that will be displayed in the popup */}
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default PopUp;