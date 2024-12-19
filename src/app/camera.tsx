import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import { Link, router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const cameraRef = useRef<CameraView>(null);

  const toggleCameraFacing = () =>
    setFacing((prev) => (prev === "back" ? "front" : "back"));

  const takePicture = async () => {
    // if (!cameraRef.current?._onCameraReady) return;
    // const res = await cameraRef.current?.recordAsync();
    const res = await cameraRef.current?.takePictureAsync();
    setPicture(res);
  };

  useEffect(() => {
    if (!permission) return;
    const { granted, canAskAgain } = permission;
    if (!granted && canAskAgain) requestPermission();
  }, [permission]);

  if (!permission?.granted) return <ActivityIndicator />;

  if (picture)
    return (
      <View>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: picture.uri }}
        />

        <MaterialIcons
          name="close"
          onPress={() => setPicture(undefined)}
          size={35}
          color="white"
          style={styles.close}
        />
      </View>
    );
  return (
    <View>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mirror
        animateShutter={false}
        mode="video"
      >
        <View style={styles.footer}>
          <View />
          <Pressable style={styles.recordButton} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={24}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      <MaterialIcons
        name="close"
        style={styles.close}
        size={30}
        onPress={() => router.back()}
        color="white"
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
  },
});
