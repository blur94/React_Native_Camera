import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Dimensions } from "react-native";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

interface Props {
  videoSource: string;
}

export default function VideoScreen({ videoSource }: Props) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    // player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => (isPlaying ? player.pause() : player.play())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
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
});
