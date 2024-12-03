import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, Text, Image, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import { HtmlContent } from "../baseComponents/HtmlContent";
import MapBackGround from "../baseComponents/MapBackground";
import VectorIcon from "../baseComponents/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import LocationInfo from "../baseComponents/LocationInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
const MapScreen = (props) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  let locationInterval=useRef(null)
  const mapRef = useRef(null);
  const [inspectorInfo, setInspectorInfo] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Crime Tracking",
      headerStyle: {
        backgroundColor: "#e6e6ff",
      },
    });
  }, [navigation]);
  const getUser = async () => {
    const userDet = await AsyncStorage.getItem('UserProfile');
    const parseDet = JSON.parse(userDet);
    setInspectorInfo(parseDet);
  };





  useEffect(() => {
    getUser()
    fetchLocation(); 
    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
    };
  }, []);
  
  
  
  const debouncedInjectLocation = (coords, params) => {
    if (mapRef.current) {
      const jsCode = `window.MapController(${JSON.stringify(coords)});`;
      mapRef.current.injectJavaScript(jsCode);
    }
  };
  const updateStaticLocation = () => {
    if (mapRef.current) {
      const jsCode = `window.updateStaticLocation(${JSON.stringify(props.route.params)});`;
      mapRef.current.injectJavaScript(jsCode);
    }
  };

  const locationHasChanged = (updatedLocation) => {
    return (
      updatedLocation.speed  > 0.3 
    );
  };
  const fetchLocation = async () => {
    const result = await LocationInfo();
    if (result?.status === "granted") {
      setLocation(result.location);
      debouncedInjectLocation(result.location); 
      updateStaticLocation()
      // Set up interval for continuous location checks
      locationInterval.current = setInterval(async () => {
        const updatedResult = await LocationInfo();
        if (updatedResult?.status === "granted") {
          const updatedLocation = updatedResult.location;
          if (locationHasChanged(updatedLocation)) {
            console.log("Location updated:", updatedLocation);
            setLocation(updatedLocation);
            debouncedInjectLocation(updatedLocation);
          }
        }
      }, 5000);
    }
  };
  const spotCrimeLocation=()=>{
    
    if (mapRef.current) {
      const jsCode = `window.spotCrimeLocation(${JSON.stringify(props.route.params)});`;
      mapRef.current.injectJavaScript(jsCode);
    }
  }
  const spotPoliceLocation=async()=>{
    const result = await LocationInfo();
    const updatedLocation = result.location;
    if (mapRef.current) {
      const jsCode = `window.spotCrimeLocation(${JSON.stringify(updatedLocation)});`;
      mapRef.current.injectJavaScript(jsCode);
    }
  }
  const handleReceiveDataFromHtml = (e) => {
    const receivedData = JSON.parse(e.nativeEvent.data);
    console.log(receivedData, "Received Data");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: "70%" }}>
        <WebView
          ref={mapRef}
          // source={HtmlContent}
          source={require("../baseComponents/tast.html")}
          onMessage={handleReceiveDataFromHtml}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheMode="LOAD_CACHE_ELSE_NETWORK"
          originWhitelist={["*"]}
          style={{ flex: 1 }}
          onLoad={() => console.log("WebView content loaded")}
          startInLoadingState={true}
          renderLoading={() => <Text>Loading Map...</Text>}
        />
        <View style={{position:"absolute",bottom:10,left:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10}}>
          <Pressable onPress={()=>spotPoliceLocation()} style={{backgroundColor:"#fff",width:60,height:60,borderRadius:50,elevation:5,justifyContent:"space-between",alignItems:"center"}}>
            <Image source={require("../assets/police.png")} style={{width:45,height:50}}/>
          </Pressable>
          <Pressable onPress={()=>spotCrimeLocation()}style={{backgroundColor:"#fff",width:60,height:60,borderRadius:50,elevation:5,justifyContent:"space-between",alignItems:"center"}}>
            <Image source={require("../assets/crime.png")} style={{width:45,height:50}}/>
          </Pressable>
        </View>
      </View>

      <MapBackGround style={{ height: "30%" }}>
        <View style={{ height: "80%", elevation: 5 }}>
          <View style={styles.crimeHeading}>
            <Text style={styles.crimeHeadingText}>Crime information</Text>
            <VectorIcon type="Octicons" name="info" size={30} color="#ff6600" />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View style={{ width: "65%", padding: 10 }}>
              <View style={{ gap: 1 }}>
                <Text style={styles.infoHeading}>Register By</Text>
                <Text>{props.route.params.registerby}</Text>
              </View>
              <View style={{ gap: 1 }}>
                <Text style={styles.infoHeading}>Crime Remarks</Text>
                <Text>{props.route.params.crimeremarks}</Text>
              </View>
            </View>
            <View style={{ width: "35%", borderWidth: 2, padding: 4, borderRadius: 5 }}>
              <Image source={{ uri: props.route.params.image }} style={{ height: "70%" }} />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.crimeHeading,
            { elevation: 0, height: "20%", backgroundColor: "#e6ecff" },
          ]}
        >
          <Text style={styles.crimeHeadingText}>
            Mr. {inspectorInfo &&inspectorInfo.name} <Text style={{ fontSize: 10 }}>(officer)</Text>
          </Text>
          <Text>Speed: {location?.speed &&location.speed.toFixed(2)>1? location.speed.toFixed(2) : "0"} m/s</Text>
          <Image source={require("../assets/police.png")} style={{ height: 50, width: 50 }} />
        </View>
      </MapBackGround>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  crimeHeading: {
    flexDirection: "row",
    backgroundColor: "#cce7ff",
    fontWeight: "700",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    paddingVertical: 5,
    elevation: 2,
    alignItems: "center",
  },
  crimeHeadingText: {
    fontSize: 18,
    color: "#4d79ff",
  },
  infoHeading: {
    color: "#33a0ff",
    fontSize: 12,
  },
});
