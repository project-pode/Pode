import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DropdownForm = ({ options, selectedAnswer, setSelectedAnswer }) => {
    return (
        <View>
            <Text>Select an answer:</Text>
            <Picker
                selectedValue={selectedAnswer}
                onValueChange={(itemValue) => setSelectedAnswer(itemValue)}
                style={{ height: 50, width: 200, marginVertical: 10 }}
            >
                <Picker.Item label="Select an option..." value="" />
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
            </Picker>
        </View>
    );
};

export default DropdownForm;
