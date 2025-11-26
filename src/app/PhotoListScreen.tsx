import { Text, VStack } from "@gluestack-ui/themed";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhotoListItem } from "../view/components/PhotoListItem";
import { usePhotoListViewModel } from "../viewmodel/usePhotoListViewModel";

export default function PhotoListScreen() {
  const { photos } = usePhotoListViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} p="$6" bg="$backgroundLight0">
        <Text fontSize="$2xl" fontWeight="$bold" mb="$6" color="$textDark900">
          Fotos Capturadas
        </Text>

        <FlatList
          data={photos}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => <PhotoListItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </SafeAreaView>
  );
}
