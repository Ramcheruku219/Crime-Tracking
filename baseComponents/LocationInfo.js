import * as Location from "expo-location";

export default async function LocationInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval:10,
            distanceInterval: 0.1,
          },
          (loc) => {
            resolve({ status, location: loc.coords });
          }
        );
      } else {
        reject(
          new Error(
            "Location Permission Required: Please enable location services to use this feature."
          )
        );
      }
    } catch (error) {
      // Handle any unexpected errors
      console.log("")
    }
  });
}
