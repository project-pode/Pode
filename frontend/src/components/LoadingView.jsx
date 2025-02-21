import { View } from "react-native";

/**
 * LoadingView component
 * 
 * This component renders a loading view with the typical pode background color
 * It can be used to indicate that data is being loaded or a process is ongoing.
 * 
 * @returns {JSX.Element} The rendered component
 */
const LoadingView = () => {
    return (
        <View testID="test" style={{
            backgroundColor: "rgba(127,222,255,1)",
        }}>
        </View>
    );
};

export default LoadingView;