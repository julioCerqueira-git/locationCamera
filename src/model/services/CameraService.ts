import type { CameraCapturedPicture, CameraView } from "expo-camera";

export class CameraService {
  async capture(
    cameraRef: React.RefObject<CameraView | null>
  ): Promise<CameraCapturedPicture | null> {
    if (!cameraRef?.current) return null;

    const result = await cameraRef.current.takePictureAsync({ quality: 1 });
    return result ?? null;
  }
}
