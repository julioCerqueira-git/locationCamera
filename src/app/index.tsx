import { Box, Button, HStack, Text, VStack } from "@gluestack-ui/themed";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraViewModel } from "../viewmodel/useCameraViewModel";

export default function CameraScreen() {
  const {
    cameraRef,
    facing,
    permission,
    locationGranted,
    requestPermission,
    toggleCameraFacing,
    capturePhoto,
  } = useCameraViewModel();

  if (!permission) return <Box />;

  // PERMISSÃO DA CÂMERA
  if (!permission.granted) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          px="$6"
          bg="$backgroundLight0"
        >
          <Text fontSize="$lg" color="$textDark900" textAlign="center">
            Precisamos de permissão para usar sua câmera
          </Text>

          <Button
            mt="$6"
            size="lg"
            action="primary"
            onPress={requestPermission}
          >
            <Text color="$white">Conceder permissão</Text>
          </Button>
        </VStack>
      </SafeAreaView>
    );
  }

  // PERMISSÃO DA LOCALIZAÇÃO
  if (!locationGranted) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <VStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          px="$6"
          bg="$backgroundLight0"
        >
          <Text fontSize="$lg" color="$textDark900" textAlign="center">
            Precisamos de permissão para obter sua localização
          </Text>

          <Button
            mt="$6"
            size="lg"
            action="primary"
            onPress={requestPermission}
          >
            <Text color="$white">Conceder permissão</Text>
          </Button>
        </VStack>
      </SafeAreaView>
    );
  }

  // --- TELA PRINCIPAL
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="$black">
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

        {/* Barra inferior flutuante */}
        <HStack
          position="absolute"
          bottom="$10"
          left="$0"
          right="$0"
          px="$10"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            size="lg"
            borderRadius="$full"
            bg="$backgroundLight50"
            onPress={toggleCameraFacing}
            px="$4"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontSize="$3xl"
              color="$textDark900"
              textAlign="center"
              lineHeight={34} 
              mt={-5}
            >
              ↺
            </Text>
          </Button>

          <Button
            onPress={capturePhoto}
            bg="$white"
            width={80}
            height={80}
            borderRadius={999}
            p="$0"
            hardShadow="5"
          >
            <Box
              width={64}
              height={64}
              bg="$white"
              borderRadius={999}
              borderWidth={4}
              borderColor="$backgroundLight400"
            />
          </Button>

          <Button
            size="lg"
            borderRadius="$full"
            bg="$backgroundLight50"
            px="$4"
            onPress={() => router.push("/PhotoListScreen")}
          >
            <Text
              fontSize="$2xl"
              color="$textDark900"
              textAlign="center"
              lineHeight={34} 
              mt={-5}
            >
              📁
            </Text>
          </Button>
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
