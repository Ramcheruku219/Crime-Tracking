import React, { useState } from "react";
import { View, Button, Image, Text, Alert, StyleSheet, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import VectorIcon from "./VectorIcon";

const CameraPicker = ({ onImagePicked }) => {
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Camera access is required to take photos."
      );
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      let temp={
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
        name:result.assets[0].fileName,
      }
      onImagePicked(temp);
    }
  };

  return (
    <View >
      {/* <Button title="Take a Photo" onPress={takePhoto} /> */}
      <Text style={{color:'#b35900',fontWeight:'bold',marginBottom:10}}>Attach File</Text>
      {image ? (
        <Pressable onPress={takePhoto} style={styles.container}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <Text style={{color:"green"}}>Image captured successfully</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.container,{paddingLeft:60}]}
          onPress={takePhoto}
        >
            <Text>Capture a picture</Text>
            <VectorIcon type="MaterialIcons" name="photo-camera" size={50} color="#b35900" 
            style={{position:"absolute",top:-25,right:10}}
            />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    flexDirection:"row",
    justifyContent:"space-between",
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:2,
    borderRadius:10,
    borderColor:"#b35900",
    padding:10,
    alignItems:"center",
    minHeight:130,
  },
  previewContainer: {
    marginTop: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default CameraPicker;
