import { MyPhoto } from "../entities/MyPhoto";

/**
 * "Repositório" global que atualiza a lista de fotos sem precisar botar a tela em foco;
 * Não fiz utilização do useFocusEffect pra testar;
 * chat me sugeriu este método e apliquei pra aprender 
 */

let photos: MyPhoto[] = [];
let listeners: (() => void)[] = [];

export function getPhotos(): MyPhoto[] {
  return photos;
}

export function addPhoto(photo: MyPhoto) {
  photos = [photo, ...photos];
  notify();
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l != listener);
  };
}

function notify() {
  listeners.forEach((l) => {
    try {
      l();
    } catch {
    
    }
  });
}
