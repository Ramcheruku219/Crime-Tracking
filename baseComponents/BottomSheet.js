import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';
import Modal from 'react-native-modal';

const { height: windowHeight } = Dimensions.get('window');

const ReusableBottomSheet = ({ renderContent, snapHeight = windowHeight * 0.5 ,renderHeader,closeWindow=false}) => {
  const [isVisible, setIsVisible] = useState(false);

  const openSheet = () => {
    setIsVisible(true);
  };

  const closeSheet = () => {
    setIsVisible(false);
  };
 useEffect(()=>{
  setIsVisible(false);
 },[closeWindow])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const backHandler = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       handleBackPress
  //     );

  //     return () => {
  //       backHandler.remove();
  //     };
  //   }, [])
  // );

  // const handleBackPress = () => {
  //   closeSheet()
  //   return true;
  // };

  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackdropPress={closeSheet}
        onSwipeComplete={closeSheet}
        swipeDirection="down"
        style={styles.modal}
      >

        <View style={[styles.sheetContainer, { height: snapHeight }]}>
          {renderContent && renderContent()}
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={openSheet}>
        {/* <Text style={styles.buttonText}>Open Bottom Sheet</Text> */}
        {renderHeader && renderHeader()}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor:"#b55d04",
    borderTopWidth:10,
    padding: 20,
  },
  button: {
    // backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 20,
    // alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReusableBottomSheet;
