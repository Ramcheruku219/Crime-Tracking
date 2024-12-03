import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoaderThree = () => {
  return (
    <View style={styles.container}>
      {/* First dot */}
      <Animatable.View
        animation={{
          0: { translateY: 0, scale: 1 },
          0.5: { translateY: -15, scale: 1.5 },
          1: { translateY: 0, scale: 1 },
        }}
        iterationCount="infinite"
        duration={1000}
        style={[styles.dot, { backgroundColor: '#FF5733' }]} // Orange color dot
      />
      {/* Second dot */}
      <Animatable.View
        animation={{
          0: { translateY: 0, scale: 1 },
          0.5: { translateY: -15, scale: 1.5 },
          1: { translateY: 0, scale: 1 },
        }}
        iterationCount="infinite"
        duration={1000}
        delay={200} // Delay for a smooth bounce effect
        style={[styles.dot, { backgroundColor: '#33C3FF' }]} // Blue color dot
      />
      {/* Third dot */}
      <Animatable.View
        animation={{
          0: { translateY: 0, scale: 1 },
          0.5: { translateY: -15, scale: 1.5 },
          1: { translateY: 0, scale: 1 },
        }}
        iterationCount="infinite"
        duration={1000}
        delay={400} // Delay for the third bounce
        style={[styles.dot, { backgroundColor: '#33FF57' }]} // Green color dot
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5, // Makes the dots round
    marginHorizontal: 5,
  },
});

export default LoaderThree;
