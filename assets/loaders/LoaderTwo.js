import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const LoaderTwo = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={{
          0: { translateX: -screenWidth / 2, scale: 0.5 },  // Start off-screen to the left, small size
          0.5: { translateX: 0, scale: 1.5 },               // In the middle, larger size
          1: { translateX: screenWidth / 2, scale: 0.5 },   // End off-screen to the right, small size
        }}
        iterationCount="infinite"
        duration={3000}
        easing="linear"
        style={styles.carContainer}
      >
        <MaterialIcons name="toys" size={50} color="green" />
      </Animatable.View>
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
});

export default LoaderTwo;
