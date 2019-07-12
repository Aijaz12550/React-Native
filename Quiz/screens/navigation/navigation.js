
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer,createDrawerNavigator } from "react-navigation";
import * as Routes from './index'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Face: {
    screen: Routes.Face
  },
  Quiz:{
    screen:Routes.Quiz
  }
  
});

export default createAppContainer(AppNavigator);