import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ScreenBackground = ({ children }) => {
  return (
    <LinearGradient colors={['#a8edea', '#fed6e3']} style={styles.container}>
      {/* Background Layers */}
      <Animatable.View
        animation="slideInDown"
        iterationCount="infinite"
        duration={10000}
        easing="ease-in-out"
        style={[styles.layer, styles.layer1]}
      >
        <FontAwesome5 name="globe" size={80} color="rgba(0, 150, 255, 0.15)" />
      </Animatable.View>

      <Animatable.View
        animation="slideInUp"
        iterationCount="infinite"
        duration={12000}
        easing="ease-in-out"
        style={[styles.layer, styles.layer2]}
      >
        <FontAwesome5 name="map-marker-alt" size={100} color="rgba(255, 87, 51, 0.15)" />
      </Animatable.View>

      <Animatable.View
        animation="slideInRight"
        iterationCount="infinite"
        duration={14000}
        easing="ease-in-out"
        style={[styles.layer, styles.layer3]}
      >
        <FontAwesome5 name="compass" size={90} color="rgba(255, 195, 0, 0.15)" />
      </Animatable.View>

      {/* Foreground Layer Icons with Pulsing */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={3000}
        style={[styles.iconContainer, styles.iconTopLeft]}
      >
        <FontAwesome5 name="route" size={50} color="#FF5722" />
      </Animatable.View>

      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={3500}
        style={[styles.iconContainer, styles.iconBottomRight]}
      >
        <FontAwesome5 name="satellite" size={50} color="#8BC34A" />
      </Animatable.View>

      {children}
    </LinearGradient>
  );
};

export default ScreenBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer1: {
    top: -100,
    left: -50,
    width: width * 1.5,
    height: height * 1.5,
  },
  layer2: {
    bottom: -100,
    right: -70,
    width: width * 1.5,
    height: height * 1.5,
  },
  layer3: {
    top: 50,
    right: 100,
    width: width * 1.2,
    height: height * 1.2,
  },
  iconContainer: {
    position: 'absolute',
  },
  iconTopLeft: {
    top: 50,
    left: 30,
  },
  iconBottomRight: {
    bottom: 50,
    right: 30,
  },
});
