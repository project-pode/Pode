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
        <View>
            <Text style = {theme.exerciseQuestion}>
            What value is the value of a after running this code?
            </Text>
            
            <View style={theme.pinkContainerInDropdownView}>
                <Text style = {theme.exerciseFont}>
                    a = 1 {"\n"}
                    b = 4 {"\n"}
                    b = a + b {"\n"}
                    a = b + 2
                </Text>
            </View>
            <View style = {{alignItems: "center"}}>
                <SelectList
                    setSelected={(value) => setSelectedAnswer(value)}
                    data={formattedOptions}
                    placeholder="Choose answer here"
                    search={false}
                    
                    boxStyles={{
                        width: 260,
                        height: 60,
                        marginVertical: -10,
                        backgroundColor: '#E6E6E6',
                        borderColor: '#E6E6E6',
                        borderRadius: 50,
                        marginTop: 10,
                        marginBottom: 0,
                    }}
                    inputStyles={{
                        
                        alignSelf: "center",
                        textAlign: "center",
                        fontFamily: "AlfaSlabOne", // Apply font to the input text
                        fontSize: 16,
                        color: 'rgba(75,113,123,1)"',

                    }}
                    dropdownTextStyles={{
                        fontFamily: "AlfaSlabOne", // Apply font to dropdown options
                        fontSize: 16,
                        color: 'rgba(75,113,123,1)"',
                        letterSpacing: 0,
                    }}
                    dropdownStyles={{
                        
                        alignSelf: "center",
                        width: 160,
                        backgroundColor: '#E6E6E6',
                        borderColor: '#E6E6E6',
                        borderRadius: 25,
                        padding: 10,
                        marginTop: -20,
                        paddingBottom: -20,
                        
                    }}
                />
            </View>
        </View>
        
    );
};

export default DropdownForm;
