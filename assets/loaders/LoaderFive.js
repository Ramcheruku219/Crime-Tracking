import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoaderFive = () => {
  return (
    <View style={styles.container}>
      {/* First expanding circle */}
      <Animatable.View
        animation={{
          0: { opacity: 1, scale: 0 },
          1: { opacity: 0, scale: 2 },
        }}
        iterationCount="infinite"
        duration={1200}
        easing="ease-out"
        style={styles.circle}
      />
      {/* Second expanding circle with slight delay */}
      <Animatable.View
        animation={{
          0: { opacity: 1, scale: 0 },
          1: { opacity: 0, scale: 2 },
        }}
        iterationCount="infinite"
        duration={1200}
        delay={400} // Slight delay for the ripple effect
        easing="ease-out"
        style={[styles.circle, { backgroundColor: '#33C3FF' }]} // Blue circle
      />
      {/* Third expanding circle with more delay */}
      <Animatable.View
        animation={{
          0: { opacity: 1, scale: 0 },
          1: { opacity: 0, scale: 2 },
        }}
        iterationCount="infinite"
        duration={1200}
        delay={800} // Further delay for ripple effect
        easing="ease-out"
        style={[styles.circle, { backgroundColor: '#33FF57' }]} // Green circle
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF5733', // Initial color of the first circle
  },
});

export default LoaderFive;
