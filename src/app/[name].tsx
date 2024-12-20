import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { VideoScreen } from "../components/VideoDisplay";
import { getMediaType } from "../utils/media";

export default function ImagePage() {
  const { name } = useLocalSearchParams();
  const [permission, requestPermission] = MediaLibrary.usePermissions();
  const fullURI = `${FileSystem.documentDirectory}${name}`;

  const saveMedia = async () => {
    if (permission?.status !== "granted") return requestPermission();

    try {
      await MediaLibrary.createAssetAsync(fullURI);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {getMediaType(name as string) === "image" && (
        <Image
          source={{ uri: fullURI }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      {getMediaType(name as string) === "video" && (
        <VideoScreen videoSource={fullURI} />
      )}
      <Stack.Screen
        options={{
          title: `Media`,
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <MaterialIcons
                name="delete"
                size={26}
                color="crimson"
                onPress={() => {
                  FileSystem.deleteAsync(fullURI);
                  router.back();
                }}
              />
              <MaterialIcons
                name="save"
                size={26}
                color="dimgray"
                onPress={saveMedia}
              />
            </View>
          ),
        }}
        getId={({ params }) => String(`${params?.name}${Date.now()}`)}
      />
    </View>
  );
}
