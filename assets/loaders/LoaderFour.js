import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoaderFour = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={{
          0: { rotate: '0deg', scale: 1, opacity: 0.5 },
          0.5: { rotate: '180deg', scale: 1.3, opacity: 1 },
          1: { rotate: '360deg', scale: 1, opacity: 0.5 },
        }}
        iterationCount="infinite"
        duration={1200}
        easing="linear"
        style={styles.square}
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
  square: {
    width: 50,
    height: 50,
    backgroundColor: '#FF5733',
    borderRadius: 5,
  },
});

export default LoaderFour;
