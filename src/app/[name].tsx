import { Link, useLocalSearchParams, Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImagePage() {
  const { name } = useLocalSearchParams();
  const { setParams } = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "500" }}>
        Image Page: {name}
      </Text>

      <Text
        onPress={() => {
          setParams({ name: "Updated" });
        }}
      >
        Update the title
      </Text>

      <Link href="/image-1">Image 1</Link>
      <Link href="/image-2">Image 2</Link>
      <Link href="/image-3">Image 3</Link>

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>

      <Stack.Screen
        options={{ title: `Image: ${name}` }}
        getId={({ params }) => String(Date.now())}
      />
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
});
