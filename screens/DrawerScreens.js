import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DashBoard from './DashBoard';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          marginTop: "50%",
          width: 250,
          height: "40%",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="DashBoard" component={DashBoard} />
    </Drawer.Navigator>
  );
}

export function CustomDrawerContent(props) {
  useEffect(() => {
    fetchAllData()
  }, [])
const [userData,setUserData]=useState("")
const clearAllData = async () => {
  Alert.alert(
    'Confirm',
    'Do you want to Logout ?',
    [
      { text: 'Cancel', onPress: () => { console.log("you are exit")}, style: 'cancel' },
      {
        text: 'Logout',
        onPress: async() => {
          try {
            await AsyncStorage.clear();
            props.navigation.navigate("Login")
          } catch (error) {
            console.log("Can't Logout")
          }
        },
      },
    ],
    { cancelable: true }
  );
};
const fetchAllData = async () => {
  try {
    let data1 = await AsyncStorage.getItem('UserProfile');
    const data = JSON.parse(data1)
    console.log(data)
    setUserData(data);
  } catch (error) {
    alert("can't fetch user data")
  }
};
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        {
          userData.profilePictureUrl?
          <Image source={{uri: userData.profilePictureUrl}} style={styles.profileImage} />
          : userData.profilepicture?
          <Image source={{uri: userData.profilepicture}} style={styles.profileImage} />
          :<MaterialIcons name="account-circle" size={80} color="#555" />
        }
        
        <Text style={styles.profileText}>{userData.name||"Welcome"}</Text>
      </View>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('DashBoard')}
        icon={() => <MaterialIcons name="dashboard" size={24} color="black" />}
      />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => clearAllData()}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    alignSelf: "center"
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
  },
  profileImage:{
    height:80,
    width:80,
    borderRadius:100,
  }
});
