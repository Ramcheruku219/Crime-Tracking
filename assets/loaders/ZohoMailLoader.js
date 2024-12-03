import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import VectorIcon from '../../baseComponents/VectorIcon';

const ZohoMailLoader = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="rotate"
        iterationCount="infinite"
        duration={1000}
        style={styles.circle}
      >
        <VectorIcon type="MaterialCommunityIcons"name="email-outline" size={50} color="#FF5733" />
        {/* <VectorIcon type="Feather" name="loader" size={50} color="black" /> */}
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',  // White background like Zoho Mail
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FF5733',  // You can use a Zoho Mail-like color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ZohoMailLoader;
