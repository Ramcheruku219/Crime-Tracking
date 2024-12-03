import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as Animatable from 'react-native-animatable';
import VectorIcon from './VectorIcon';

export const AttachFile = ({ animation, duration, delay, setFile = () => {}, title = "Attach File", logo, errorColor,value}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [show, setShow] = useState(false);
  const [isPickingDocument, setIsPickingDocument] = useState(false);
  const pickDocument = async () => {
    try {
      if (isPickingDocument) return;

      setIsPickingDocument(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*'],
        multiple: false,
      });

      if (result.canceled === true) {
        setShow(true);
      } else {
        setSelectedDocument(result.assets[0]); 
        setFile(result.assets[0]);
        // console.log(result)
      }
    } catch (error) {
      console.error('Error picking document:', error);
    } finally {
      setIsPickingDocument(false);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Info',
      "You Haven't Selected Anything",
      [{ text: 'OK', onPress: () => setShow(false) }]
    );
  };

  return (
    <Animatable.View 
      animation={animation}
      duration={duration}
      delay={delay * 300}
      style={{ paddingHorizontal: 5, marginTop: 10 }}
    >
      <Text style={{
        marginLeft: 8,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "500",
        color: '#b35900'
      }}>{title}</Text>

      <View
        style={{
          width: "auto",
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          borderColor: errorColor || "#b35900",
          borderTopWidth: 0,
          borderBottomWidth: 2,
          flexDirection: "row",
          minHeight: 120,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5
        }}
      >
        {selectedDocument || value? (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 ,}}>
            <Image
              source={{ uri:  selectedDocument?.uri || value?.uri }}
              style={{ height: 100, width: 100, marginLeft: 10, borderRadius: 5 }}
            />
            <Text style={{ marginLeft: 10, color: '#000', flex: 1,textAlign:"center" }}>
              {selectedDocument?.name || value.name }
            </Text>
          </View>
        ) : (
          <Text style={{ width: '80%', color: '#000', marginLeft: 10 }}>
            Choose File
          </Text>
        )}

        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginRight: 10,position:"absolute" ,top:-30,right:10}} onPress={pickDocument}>
        <VectorIcon type="Entypo" name="images" size={50} color="#b35900"/>
        </TouchableOpacity>
        {show && showAlert()}
      </View>
    </Animatable.View>
  );
};
