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
            <Text style = {theme.exerciseQuestion}>
                What is the value of a after running this code?
            </Text>
            <View style={theme.pinkContainerInDropdownView}>
                <Text style = {theme.exerciseFont}>
                    a = 1 {"\n"}
                    b = 4 {"\n"}
                    b = a + b {"\n"}
                    a = b + 2
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
                        marginVertical: 20,
                        backgroundColor: '#E6E6E6',
                        borderColor: '#ccc',
                        borderRadius: 50,
                    }}
                    dropdownStyles={{
                        backgroundColor: 'white',
                        borderColor: '#ccc',
                        borderRadius: 0,
                    }}
                />
            </View>
        </View>
        
    );
};

export default DropdownForm;
