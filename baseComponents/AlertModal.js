import React from "react";
import { Modal, View, Text, TouchableOpacity, Vibration, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("window");

export const AlertModal = ({
  content,
  setContent,
  animationType = "slide",
  modalStyle = {},
  containerStyle = {},
  textStyle = {},
  buttonStyle = {},
  buttonTextStyle = {},
  duration = 500,
  animation = {
    from: { rotateY: "0deg" },
    to: { rotateY: "360deg" },
  },
  easing = "ease-out",
  vibrateDuration = 500,
}) => {
  const { title, msg, show, ok, color, vibration,customHeight=0.15} = content;

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={show}
      onRequestClose={() => setContent({ ...content, show: false })}
      onShow={() => {
        if (vibration) {
          Vibration.vibrate(vibrateDuration);
        }
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 50,
          backgroundColor: "rgba(0,0,0,0.5)",
          ...modalStyle,
        }}
      >
        <Animatable.View
          animation={animation}
          easing={easing}
          iterationCount={1}
          duration={duration}
          style={{
            minHeight: height *customHeight,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            ...containerStyle,
          }}
        >
          {title && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                ...textStyle,
              }}
            >
              {title}
            </Text>
          )}
          <Text style={{ textAlign: "center", ...textStyle }}>{msg}</Text>
          <TouchableOpacity
            onPress={() => {
              if (typeof ok === "function") {
                ok();
              }
              setContent({ ...content, show: false });
            }}
            style={{
              minHeight: 30,
              width: "40%",
              alignSelf: "center",
              backgroundColor: color || "#cc3300",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              paddingVertical: 10,
              ...buttonStyle,
            }}
          >
            <Text style={{ color: "#fff", ...buttonTextStyle }}>Ok</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
};

export const ConfirmModal = ({
  content,
  setContent,
  animationType = "slide",
  modalStyle = {},
  containerStyle = {},
  textStyle = {},
  buttonStyle = {},
  buttonTextStyle = {},
  duration = 500,
  animation = {
    from: { rotateY: "0deg" },
    to: { rotateY: "360deg" },
  },
  easing = "ease-out",
  vibrateDuration = 500,
}) => {
  const { title, msg, show, onYes, onNo, colorYes = "#28a745", colorNo = "#dc3545", vibration } = content;

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={show}
      onRequestClose={() => setContent({ ...content, show: false })}
      onShow={() => {
        if (vibration) {
          Vibration.vibrate(vibrateDuration);
        }
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 50,
          backgroundColor: "rgba(0,0,0,0.5)",
          ...modalStyle,
        }}
      >
        <Animatable.View
          animation={animation}
          easing={easing}
          iterationCount={1}
          duration={duration}
          style={{
            minHeight: height * 0.15,
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            ...containerStyle,
          }}
        >
          {title && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                ...textStyle,
              }}
            >
              {title}
            </Text>
          )}
          <Text style={{ textAlign: "center", ...textStyle }}>{msg}</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (typeof onYes === "function") {
                  onYes();
                }
                setContent({ ...content, show: false });
              }}
              style={{
                minHeight: 30,
                flex: 1,
                marginHorizontal: 5,
                backgroundColor: colorYes,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                ...buttonStyle,
              }}
            >
              <Text style={{ color: "#fff", ...buttonTextStyle }}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (typeof onNo === "function") {
                  onNo();
                }
                setContent({ ...content, show: false });
              }}
              style={{
                minHeight: 30,
                flex: 1,
                marginHorizontal: 5,
                backgroundColor: colorNo,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                ...buttonStyle,
              }}
            >
              <Text style={{ color: "#fff", ...buttonTextStyle }}>No</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
};

