import { Box, HStack, Image, Text } from "@gluestack-ui/themed";
import React from "react";
import { MyPhoto } from "../../model/entities/MyPhoto";

export function PhotoListItem({ item }: { item: MyPhoto }) {
  return (
    <Box
      bg="$backgroundLight0"
      borderRadius="$lg"
      p="$4"
      mb="$4"
      hardShadow="2"
      borderWidth={1}
      borderColor="$backgroundLight200"
    >
      <HStack alignItems="center" space="md">
        <Image
          source={{ uri: item.uri }}
          alt="Foto"
          width={70}
          height={70}
          borderRadius={10}
          bg="$backgroundLight300"
        />

        <Box flex={1}>
          <Text fontWeight="$bold" mb="$1" color="$textDark900" fontSize="$md">
            Foto Capturada
          </Text>

          {item.latitude != null && item.longitude != null ? (
            <Text color="$textDark700" fontSize="$sm">
              Lat: {item.latitude.toFixed(6)} Lon: {item.longitude.toFixed(6)}
            </Text>
          ) : (
            <Text color="$textDark500" fontSize="$sm">
              Sem localização
            </Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
}
