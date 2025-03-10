import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

interface DropdownFormProps {
    options: string[];
    setSelectedAnswer: (answer: string) => void;
}

/**
 * DropdownForm component
 * 
 * This component renders a dropdown form using the `SelectList` component from `react-native-dropdown-select-list`.
 * This is used in the "simple" exercise type in which users choose their answer from a dropdown
 * 
 * @param {Array} props.options - The list of options to be displayed in the dropdown
 * @param {Function} props.setSelectedAnswer - Function to set the selected answer
 * 
 * @returns {JSX.Element} The rendered component
 */
const DropdownForm = ({ options, setSelectedAnswer }: DropdownFormProps) => {
    // Format options for SelectList (it requires array of objects with `key` and `value`)
    const formattedOptions = options.map((option, index) => ({
        key: index.toString(),
        value: option,
    }));

    return (
        <View>
            <View style={{ alignItems: "center" }}>
                <SelectList
                    setSelected={(key: string) => {
                        // Map the key back to the corresponding value
                        const selectedOption = formattedOptions.find(item => item.key === key)?.value;
                        setSelectedAnswer(selectedOption || "");
                    }}
                    data={formattedOptions}
                    placeholder="Choose answer here"
                    search={false}
                    boxStyles={{
                        width: 260,
                        height: 60,
                        marginVertical: 0,
                        backgroundColor: '#E6E6E6',
                        borderColor: '#E6E6E6',
                        borderRadius: 50,
                        marginTop: 0,
                        marginBottom: 0,
                    }}
                    inputStyles={{
                        alignSelf: "center",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: "Cousine", // Apply font to the input text
                        fontSize: 16,
                        color: 'rgba(75,113,123,1)',
                    }}
                    dropdownTextStyles={{
                        fontWeight: "bold",
                        fontFamily: "Cousine", // Apply font to dropdown options
                        fontSize: 16,
                        color: 'rgba(75,113,123,1)',
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
