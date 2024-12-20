import React, { Dispatch, SetStateAction } from "react";
import { View, Image, StyleSheet, Button, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { Video } from "../app/camera";
import { VideoScreen } from "./VideoDisplay";

interface Props {
  picture: CameraCapturedPicture | undefined;
  setPicture: Dispatch<SetStateAction<CameraCapturedPicture | undefined>>;
  setVideo: Dispatch<SetStateAction<Video | undefined>>;
  video: Video | undefined;
}

export default function PictureView({
  picture,
  setPicture,
  video,
  setVideo,
}: Props) {
  const saveFile = async (uri?: string) => {
    if (!uri) return;
    const fileName = path.parse(uri).base;

    await FileSystem.copyAsync({
      from: uri,
      to: `${FileSystem.documentDirectory}${fileName}`,
    });

    setPicture(undefined);
    setVideo(undefined);
    router.back();
  };
  return (
    <View style={{ flex: 1 }}>
      {picture && (
        <Image
          style={{ flex: 1, width: "100%" }}
          source={{ uri: picture?.uri }}
        />
      )}

      {video && <VideoScreen videoSource={video.uri} />}

      <View style={{ padding: 10 }}>
        <SafeAreaView edges={["bottom"]}>
          <Button
            title="Save"
            onPress={() => saveFile(picture?.uri || video?.uri)}
          />
        </SafeAreaView>
      </View>

      <MaterialIcons
        name="close"
        onPress={() => {
          setPicture(undefined);
          setVideo(undefined);
        }}
        size={35}
        color="white"
        style={styles.close}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
  close: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  recordButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "white",
    padding: "auto",
  },

  video: {
    // width: 350,
    // height: 275,
    height: Dimensions.get("window").height / 1.5,
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
});
