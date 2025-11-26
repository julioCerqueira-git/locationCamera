# 📸 locationCamera

Aplicativo desenvolvido com React Native + Expo que permite tirar fotos, salvar cada imagem junto com a localização atual do dispositivo e exibir tudo em uma lista mantida em memória.

---

## 📑 Sumário
- Descrição
- Tecnologias usadas
- Arquitetura (MVVM)
  - Responsabilidades por camada
  - Fluxo de dados
- Estrutura do projeto
- Permissões necessárias
- Como executar
- Melhorias futuras

---

## 📝 Descrição
locationCamera é um app simples e modularizado seguindo o padrão MVVM. Ele demonstra:
- Captura de fotos com a API do Expo Camera;
- Captura da localização atual com expo-location;
- Armazenamento temporário das fotos e metadados em uma lista em memória;
- Interface construída com Gluestack UI;
- Navegação com Expo Router.

Observação: no momento as fotos não são persistidas em disco/base de dados — a persistência pode ser adicionada como melhoria futura.

---

## 🛠 Tecnologias usadas
- React Native
- Expo
- expo-camera
- expo-location
- expo-router
- TypeScript
- MVVM (Model–View–ViewModel)
- gluestack-ui/themed
- React Hooks

---

## 🧩 Arquitetura: MVVM
O projeto segue o padrão Model–View–ViewModel para garantir separação de responsabilidades, testabilidade e manutenção facilitada.

### Responsabilidades por camada

- View (Telas / UI)
  - Implementadas com Gluestack UI.
  - Exibem dados, recebem eventos do usuário e fazem navegação.
  - Não contêm regras de negócio.
  - Exemplos: CameraScreen.tsx, PhotoListScreen.tsx

- ViewModel
  - Camada intermediária que liga View ↔ Model.
  - Mantém estado da UI (lista de fotos, permissões, estados de carregamento).
  - Contém lógica de captura de foto e obtenção de localização.
  - Exemplos: useCameraViewModel.ts, usePhotoListViewModel.ts

- Model
  - Define estruturas de dados usadas pela aplicação.
  - Exemplo: MyPhoto.ts (uri, latitude, longitude, timestamp)

---

## 🔄 Fluxo de dados (exemplo)
1. Usuário toca em "Capturar".
2. A View chama o ViewModel (ex.: capturePhoto()).
3. O ViewModel aciona a câmera e obtém a URI da imagem.
4. O ViewModel solicita a localização atual via expo-location.
5. O ViewModel monta um objeto MyPhoto (uri, latitude, longitude, timestamp).
6. O ViewModel atualiza a lista photos[] (em memória) no estado.
7. A View observa o estado e re-renderiza a lista automaticamente.

---

## 📂 Estrutura do projeto (adaptada para Expo + React Native + MVVM)
Exemplo de organização recomendada:

```
src/
├─ app/
│  ├─ _layout.tsx                # Layout principal do Expo Router
│  ├─ index.tsx                  # Tela inicial (CameraScreen ou Home)
│  ├─ PhotoListScreen.tsx        # Tela de listagem de fotos
│
├─ model/
│  ├─ entities/
│  │   └─ MyPhoto.ts             # Entidade que representa uma foto + localização
│  │
│  ├─ repositories/
│  │   └─ photoRepository.ts     # Repositório: armazena e recupera fotos (em memória)
│  │
│  ├─ services/
│  │   ├─ CameraService.ts       # Lógica de captura de foto
│  │   └─ LocationService.ts     # Lógica de captura de localização
│
├─ view/
│  ├─ components/
│  │   └─ PhotoListItem.tsx      # Componente para exibir item da lista de fotos
│
├─ viewmodel/
│  ├─ useCameraViewModel.ts      # ViewModel da câmera
│  └─ usePhotoListViewModel.ts   # ViewModel da lista de fotos


```

Observações:
- Estrutura leve e direta.
- Cada camada com responsabilidades bem separadas.

---

## 🔐 Permissões necessárias

No Expo / app.json (ou app.config.js) e em tempo de execução, solicite as permissões:

Câmera (plugin expo-camera):
```json
{
  "expo": {
    "plugins": ["expo-camera"]
  }
}
```

Permissões Android (exemplo em app.json):
```json
{
  "expo": {
    "android": {
      "permissions": ["CAMERA", "ACCESS_FINE_LOCATION"]
    }
  }
}
```

Além disso, solicite permissões em tempo de execução via APIs do Expo (Permissions API / requests do expo-camera e expo-location).

---

## ▶ Como executar

1. Instale dependências:
```bash
npm install
# ou
yarn
```

2. Inicie o Metro/Expo:
```bash
npx expo start
```

3. Abra no dispositivo físico (recomendado):
- A câmera geralmente requer dispositivo real.
- A localização precisa de GPS real ou um simulador que suporte localização.

4. Conceda as permissões quando solicitado.
