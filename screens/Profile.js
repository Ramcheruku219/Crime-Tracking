import { StyleSheet, Text, View, ActivityIndicator, Animated, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = ({ navigation }) => {
  const [inspectorInfo, setInspectorInfo] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getUser = async () => {
    const userDet = await AsyncStorage.getItem('UserProfile');
    const parseDet = JSON.parse(userDet);
    setInspectorInfo(parseDet);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirm',
      'Do you want to Logout ?',
      [
        { text: 'Cancel', onPress: () => { console.log("you are exit")}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: async() => {
            try {
              await AsyncStorage.removeItem("UserProfile");
              navigation.navigate("Login")
            } catch (error) {
              console.log("Can't Logout")
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    getUser();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View colors={['#00416A', '#E4E5E6']} style={styles.background}>
      {inspectorInfo ? (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="police-badge" size={80} color="#fff" />
          </View>
          <Text style={styles.name}>{inspectorInfo.name}</Text>

          <View style={styles.card}>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>ID:</Text>
              <Text style={styles.detailText}>{inspectorInfo.departmentuserid}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Mobile:</Text>
              <Text style={styles.detailText}>{inspectorInfo.phone_number}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailText}>{inspectorInfo.email}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    padding: 20,
    marginBottom: 15,
    elevation: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
