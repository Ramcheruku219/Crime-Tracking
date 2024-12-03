import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dash}>------</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.date}>31</Text>
      </View>
    </View>
  );
}

export default CustomLogo;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    padding: 5,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    width: '100%',
  },
  dash: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
