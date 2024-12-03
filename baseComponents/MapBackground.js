import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const MapBackGround = ({ children }) => {
  return (
    <LinearGradient
      colors={['rgba(111, 255, 255, 0.1)', 'rgba(255, 133, 111, 0.1)', 'rgba(224, 224, 111, 0.6)']}  // Transparent sky blue at top, white in middle, and light gray at bottom
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

export default MapBackGround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
