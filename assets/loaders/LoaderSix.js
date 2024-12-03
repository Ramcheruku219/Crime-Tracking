import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Animatable from "react-native-animatable";

const LoaderSix = () => {
  // Array of letters to animate
  const letters = ["L", "O", "A", "D", "I", "N", "G"];

  // Define unique animations for each letter
  const animations = [
    {
      from: { translateX: -100, translateY: 0, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From left
    {
      from: { translateX: -50, translateY: -50, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From top left
    {
      from: { translateX: 0, translateY: -100, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From top
    {
      from: { translateX: 50, translateY: -50, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From top right
    {
      from: { translateX: 100, translateY: 0, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From right
    {
      from: { translateX: 50, translateY: 50, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From bottom right
    {
      from: { translateX: 0, translateY: 100, scale: 0 },
      to: { translateX: 0, translateY: 0, scale: 1 },
    }, // From bottom
  ];

  return (
    <View style={styles.container}>
      {letters.map((letter, index) => (
        <Animatable.View
          key={index}
          animation={{
            from: animations[index].from,
            to: animations[index].to,
          }}
          iterationCount="infinite"
          duration={2000}
          delay={index * 100}
          style={styles.letterContainer}
        >
          <Text style={styles.letterText}>{letter}</Text>
        </Animatable.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // Arrange letters in a row
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  letterContainer: {
    marginHorizontal: 5, // Spacing between letters
  },
  letterText: {
    fontSize: 40, // Increase font size for emphasis
    fontWeight: "bold",
    color: "#3498DB", // Change to a nice blue color
  },
});

export default LoaderSix;
