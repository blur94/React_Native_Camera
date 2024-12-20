import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  videoSource: string;
  styles?: Record<string, string | number>;
}

export function VideoScreen({ videoSource }: Props) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.contentContainer, { backgroundColor: "dimgray" }]}
    >
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => (isPlaying ? player.pause() : player.play())}
        />
      </View>
    </SafeAreaView>
  );
}

export function VideoDisplay({ videoSource, styles }: Props) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    // player.play();
  });

  return (
    <VideoView
      style={styles}
      player={player}
      allowsFullscreen={false}
      // allowsPictureInPicture
      nativeControls={false}
    />
  );
}

export const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 50,
    marginTop: 40,
  },
  video: {
    // width: 350,
    // height: 275,

    height: Dimensions.get("window").height / 1.4,
    // aspectRatio: 1,
    width: Dimensions.get("window").width,
  },
  controlsContainer: {
    padding: 10,
  },
});
