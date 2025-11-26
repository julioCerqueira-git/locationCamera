import { useEffect, useState } from "react";
import { MyPhoto } from "../model/entities/MyPhoto";
import { getPhotos, subscribe } from "../model/repositories/photoRepository";

export function usePhotoListViewModel() {
  const [photos, setPhotos] = useState<MyPhoto[]>(() =>
    [...getPhotos()].sort((a, b) => b.timestamp - a.timestamp)
  );

  useEffect(() => {
    const unsub = subscribe(() => {
      setPhotos([...getPhotos()].sort((a, b) => b.timestamp - a.timestamp));
    });
    return unsub;
  }, []);

  return { photos } as const;
}
