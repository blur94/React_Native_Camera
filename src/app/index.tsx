import { Link, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { getMediaType, MediaType } from "../utils/media";
import { VideoDisplay } from "../components/VideoDisplay";

interface Media {
  name: string;
  uri: string;
  type: MediaType;
}

export default function HomePage() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [count, setCount] = useState(0);
  const [images, setImages] = useState<Media[]>([]);

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) return;
    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );

    setImages(
      files.map((file) => ({
        name: file,
        uri: `${FileSystem.documentDirectory}${file}`,
        type: getMediaType(file),
      }))
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  //   useEffect(() => {
  //     loadFiles();
  //   }, []);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Pressable
              onPress={() => setCount((c) => c + 1)}
              onLongPress={() => {
                intervalRef.current = setInterval(
                  () => setCount((c) => c + 1),
                  1000
                );
              }}
              onPressOut={() => {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              }}
            >
              <AntDesign name="pluscircle" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      <Text style={{ fontSize: 15, fontWeight: "500", marginBlock: 20 }}>
        Count: {count}
      </Text>

      <FlatList
        numColumns={3}
        data={images}
        // style={{ marginTop: 10 }}
        contentContainerStyle={{ gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <Link asChild href={`/${item.name}`}>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
              {item.type === "image" && (
                <Image
                  source={{ uri: item.uri }}
                  style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
                />
              )}

              {item.type === "video" && (
                <View
                  style={{
                    aspectRatio: 3 / 4,
                    borderRadius: 5,
                    maxWidth: "33.33%",
                    // flex: 1,
                  }}
                >
                  <VideoDisplay
                    styles={{ aspectRatio: 3 / 4, borderRadius: 5, flex: 1 }}
                    videoSource={item.uri}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        )}
        keyExtractor={({ name }) => name}
      />

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    borderRadius: 50,
    backgroundColor: "royalblue",
    padding: 15,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});

function LogoTitle() {
  return (
    <Image
      style={styles.image}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}
