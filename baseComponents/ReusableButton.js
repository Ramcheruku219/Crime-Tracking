import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const ReusableButton = ({ label, onPress, isLoading, style }) => {
  return (
    <Animatable.View 
      animation={isLoading ? 'pulse' : 'fadeIn'}
      duration={1000}
      style={[styles.buttonContainer, style]}>
      <TouchableOpacity onPress={onPress} disabled={isLoading} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{label}</Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReusableButton;
