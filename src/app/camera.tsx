import { MaterialIcons } from "@expo/vector-icons";
import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PictureView from "../components/PictureView";

export interface Video {
  uri: string;
}

export default function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [video, setVideo] = useState<Video>();
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const toggleCameraFacing = () =>
    setFacing((prev) => (prev === "back" ? "front" : "back"));

  const takePicture = async () => {
    // if (!cameraRef.current?._onCameraReady) return;
    // const res = await cameraRef.current?.recordAsync();
    const res = await cameraRef.current?.takePictureAsync();
    setPicture(res);
  };

  const takeVideo = async () => {
    try {
      if (!cameraRef.current) return;

      setRecording(true);
      const res = await cameraRef.current.recordAsync();

      setVideo(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!permission) return;
    const { granted, canAskAgain } = permission;
    if (!granted && canAskAgain) requestPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  useEffect(() => {
    if (!micPermission) return;

    const { granted, canAskAgain } = micPermission;
    if (!granted && canAskAgain) requestMicPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micPermission]);

  if (!permission?.granted) return <ActivityIndicator />;

  if (picture || video)
    return (
      <PictureView
        picture={picture}
        setPicture={setPicture}
        video={video}
        setVideo={setVideo}
      />
    );

  // if (video)
  //   return (
  //     <View
  //       style={{
  //         height: "100%",
  //         width: "100%",
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <VideoScreen videoSource={video.uri} />

  //       <MaterialIcons
  //         name="close"
  //         onPress={() => setVideo(undefined)}
  //         size={35}
  //         color="white"
  //         style={styles.close}
  //       />
  //     </View>
  //   );
  return (
    <View>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mirror={mode === "picture"}
        animateShutter={false}
        mode={mode}
        flash="auto"
      >
        <View style={styles.footer}>
          <MaterialIcons
            name="switch-camera"
            size={30}
            color="white"
            onPress={() =>
              setMode((prev) => (prev === "picture" ? "video" : "picture"))
            }
          />

          {mode === "picture" ? (
            <MaterialIcons
              name="camera"
              size={50}
              color="black"
              onPress={takePicture}
              style={styles.recordButton}
            />
          ) : (
            <MaterialIcons
              name={recording ? "square" : "fiber-manual-record"}
              size={recording ? 30 : 50}
              color="red"
              onPress={() => {
                if (!recording) {
                  takeVideo();
                } else {
                  setRecording(false);
                  cameraRef.current?.stopRecording();
                }
              }}
              style={[
                styles.recordButton,
                recording && {
                  paddingInlineStart: 10,
                  paddingBlockStart: 10,
                },
              ]}
            />
          )}

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
    padding: "auto",
  },
});
