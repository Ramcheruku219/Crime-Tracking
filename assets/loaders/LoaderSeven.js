import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoaderSeven = () => {
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

  return (
    <View style={styles.container}>
      {letters.map((letter, index) => (
        <Animatable.Text
          key={index}
          style={styles.letterText}
          animation="fadeIn"
          duration={1000}
          delay={index * 200}
          iterationCount="infinite"
          useNativeDriver
          onAnimationEnd={() => {
            // Change animation direction after the fadeIn
            const randomDirection = Math.random() > 0.5 ? 'fadeOutLeft' : 'fadeOutRight';
            this.refs[letter].animation(randomDirection, 1000);
          }}
        >
          {letter}
        </Animatable.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  letterText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#8E44AD',
    marginHorizontal: 5,
  },
});

export default LoaderSeven;
