import * as Location from "expo-location";

export class LocationService {
  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status == "granted";
    } catch {
      return false;
    }
  }

  async getCurrentLocation() {
    return await Location.getCurrentPositionAsync({});
  }
}
