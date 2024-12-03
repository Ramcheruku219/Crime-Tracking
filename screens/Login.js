import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenBackground from '../baseComponents/ScreenBackground';
import AwesomeTextInput from '../baseComponents/AwesomeTextInput';
import * as Animatable from 'react-native-animatable';
import ReusableButton from '../baseComponents/ReusableButton';
import { endApi } from '../config/endApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = () => {
  //   setIsLoading(true);
  //   console.log('Logging in with:', email, password);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     navigation.navigate("DrawerScreen")
  //   }, 2000);
  // };

  const getUser = async () => {
    const user = await AsyncStorage.getItem('UserProfile');
    if (user) {
      navigation.navigate('DrawerScreen');
      return;
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const response = await fetch(endApi.getDepartmentUsers(email));
        const dataJson = await response.json();
        console.log(dataJson)
        if (dataJson.length > 0) {
          if (password === dataJson[0].password) {
            await AsyncStorage.setItem('UserProfile', JSON.stringify(dataJson[0]));
            Alert.alert('Login',"Login successfully ")
            setPassword("")
            setEmail("");
            setTimeout(() => {
              navigation.navigate("DrawerScreen")
              setIsLoading(false);
            }, 1500);
          } else {
            Alert.alert('Login',"You have entered the wrong password!")
            // alert('You have entered the wrong password!');
          }
        } else {
          Alert.alert('Login',"You have entered the wrong password!")
        }
      } catch (error) {
        console.log(error)
        Alert.alert('Login',"Login failed. Please try again.")
        // alert('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Login',"Please Enter username and password!")
      // alert('Please Enter username and password!');
    }
  };

  return (
    <ScreenBackground styles={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
          <Animatable.Image
            animation="zoomIn"
            duration={2000}
            iterationCount={1}
            source={require("../assets/new-logo.png")}
            style={styles.logo}
          />

          <AwesomeTextInput
            placeholder="Enter your email"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
          />

          <AwesomeTextInput
            placeholder="Enter your password"
            iconName="lock-closed-outline"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            logoIcon="eye-outline"
          />

          <ReusableButton
            label="Log In"
            onPress={handleLogin}
            isLoading={isLoading} // Pass the loading state
          />

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signupLink}>
            <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </ScreenBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 100,
  },
  logo: {
    // position: 'absolute',
    // top: 60,
    width: 255,
    height: 80,
    alignSelf: 'center',
    marginBottom: 100,
  },
  signupLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupText: {
    color: '#020202',
    fontSize: 16,
  },
});
