import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Zocial,
  SimpleLineIcons,
  Octicons,
  Fontisto,
  Ionicons,
  MaterialIcons,
  Entypo,
  Feather,
  EvilIcons
} from "@expo/vector-icons";

const VectorIcon = (props) => {
  const { type, name, size, color, onPress, style } = props;
  return (
    <View style={[{justifyContent:"center",alignItems:"center"},style]}>
      {type === "FontAwesome5" ? (
        <FontAwesome5 name={name} size={size} color={color} onPress={onPress} />
      ) : 
      type === "FontAwesome6" ? (
        <FontAwesome6 name={name} size={size} color={color} onPress={onPress} />
      ) :
      type === "FontAwesome" ? (
        <FontAwesome name={name} size={size} color={color} onPress={onPress} />
      ) : type === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      ) : type === "Feather" ? (
        <Feather name={name} size={size} color={color} onPress={onPress} />
      ) : type === "SimpleLineIcons" ? (
        <SimpleLineIcons
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      ) : type === "Octicons" ? (
        <Octicons name={name} size={size} color={color} onPress={onPress} />
      ) : type === "Ionicons" ? (
        <Ionicons name={name} size={size} color={color} onPress={onPress} />
      ) : type === "Zocial" ? (
        <Zocial name={name} size={size} color={color} onPress={onPress} />
      ) : type === "Entypo" ? (
        <Entypo name={name} size={size} color={color} onPress={onPress} />
      ) : type === "MaterialIcons" ? (
        <MaterialIcons
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      ) : type === "Fontisto" ? (
        <Fontisto name={name} size={size} color={color} onPress={onPress} />
      ) : type === "EvilIcons" ? (
        <EvilIcons name={name} size={size} color={color} onPress={onPress} />
      ) : type === "AntDesign" ? (
        <AntDesign name={name} size={size} color={color} onPress={onPress} />
      ) : (
        console.warn("proper type not found")
      )}
    </View>
  );
};

export default VectorIcon;

const styles = StyleSheet.create({});
