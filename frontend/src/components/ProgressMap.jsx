import { View, Image, Pressable, Text, ScrollView, Alert } from "react-native";
import theme from "../theme";
import { useState } from "react";


const ProgressMap = () => {
    const clouds = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14]; // Just a simple array to represent cloud images
    const [selectedCloud, setSelectedCloud] = useState(null);

    const handleCloudPress = (cloud) => {
        setSelectedCloud(cloud);
    };
    

    return (
      <View style={theme.blueContainer}>
        <ScrollView inverted>
          <View contentContainerStyle={theme.cloudContainer}>
            {clouds.map((cloud, index) => (
                <Pressable key={index} onPress={() => handleCloudPress(cloud)}>
                    <Image
                        source={require('../../assets/cloud.png')}
                        style={[
                            theme.cloudImage,
                            index % 2 === 0 ? theme.cloudLeft : theme.cloudRight,
                            selectedCloud === cloud && theme.selectedCloud
                        ]}
                     />
                </Pressable>
            ))}
          </View>
        </ScrollView>

        <Pressable
            style={[
                selectedCloud ? theme.greenButton : theme.greenButtonDeselected
            ]}
            onPress={() => {
                if (selectedCloud) {
                    Alert.alert('Debug', 'Start button pressed');
                }
            }}
            disabled={!selectedCloud}
            >
            <Text style={selectedCloud ? theme.greenButtonText : theme.greenButtonTextDeselected}>Start</Text>
        </Pressable>        
      </View>
    );
  };
  
  export default ProgressMap;