import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import DrawerScreen from "./screens/DrawerScreens";
import Profile from "./screens/Profile";
import MapScreen from "./screens/MapScreen";
import { Image } from "react-native";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerRight:()=>(
          <Image source={require("./assets/new-logo.png")} style={{height:35,width:120,marginRight:10}}/>
        )
      }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
