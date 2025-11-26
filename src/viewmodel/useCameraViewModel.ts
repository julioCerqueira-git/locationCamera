import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { MyPhoto } from "../model/entities/MyPhoto";
import { addPhoto } from "../model/repositories/photoRepository";
import { CameraService } from "../model/services/CameraService";
import { LocationService } from "../model/services/LocationService";

export function useCameraViewModel() {
  const cameraService = new CameraService();
  const locationService = new LocationService();

  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");

  const [permission, requestPermission] = useCameraPermissions();
  const [locationGranted, setLocationGranted] = useState<boolean>(false);

  function toggleCameraFacing() {
    setFacing((prev) => (prev == "back" ? "front" : "back"));
  }

  async function checkLocationPermission() {
    const granted = await locationService.requestPermission();
    setLocationGranted(granted);
  }

  async function capturePhoto() {
    const result = await cameraService.capture(cameraRef);
    if (!result?.uri) return;

    let latitude: number | null = null;
    let longitude: number | null = null;

    if (locationGranted) {
      try {
        const loc = await locationService.getCurrentLocation();
        latitude = loc.coords.latitude;
        longitude = loc.coords.longitude;
      } catch {}
    }

    const newPhoto: MyPhoto = {
      uri: result.uri,
      latitude,
      longitude,
      timestamp: Date.now(),
    };

    addPhoto(newPhoto);
  }

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return {
    cameraRef,
    facing,
    permission,
    locationGranted,
    requestPermission,
    toggleCameraFacing,
    capturePhoto,
  } as const;
}
