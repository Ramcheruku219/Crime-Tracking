import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AwesomeTextInput = ({ placeholder, iconName, secureTextEntry, logoIcon, onLogoPress, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={styles.inputContainer}>
      {iconName && <Ionicons name={iconName} size={20} color="#4caf50" style={styles.icon} />}
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={isPasswordVisible}
        placeholderTextColor="#888"
        {...props}
      />
      
     
      {logoIcon && (
        <TouchableOpacity onPress={onLogoPress ? onLogoPress : togglePasswordVisibility} style={styles.icon}>
          <Ionicons name={logoIcon} size={20} color="#4caf50" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AwesomeTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#4caf50',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
});
