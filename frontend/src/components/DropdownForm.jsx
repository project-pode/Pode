import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import theme from "../theme";

const DropdownForm = ({ options, selectedAnswer, setSelectedAnswer }) => {
    // Format options for SelectList (it requires array of objects with `key` and `value`)
    const formattedOptions = options.map((option, index) => ({
        key: index.toString(),
        value: option,
    }));

    return (
        <View style={theme.whiteContainerInDropdownForm}>
            <Text>
                What is the value of a after running this code?
            </Text>
            <View style={theme.pinkContainer}>
                <Text>Diiba daaba bobbel dobbel
                Diiba daaba bobbel dobbel
                Diiba daaba bobbel dobbel
                </Text>
            </View>
            <View>
                <SelectList
                    setSelected={(value) => setSelectedAnswer(value)}
                    data={formattedOptions}
                    placeholder="Choose answer here"
                    search={false}
                    boxStyles={{
                        height: 50,
                        marginVertical: 10,
                        backgroundColor: 'white',
                        borderColor: '#ccc',
                        borderRadius: 5,
                    }}
                    dropdownStyles={{
                        backgroundColor: 'white',
                        borderColor: '#ccc',
                        borderRadius: 5,
                    }}
                />
            </View>
        </View>
    );
};

export default DropdownForm;
