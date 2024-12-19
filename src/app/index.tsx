import { Link, useNavigation, Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function HomePage() {
  const navigation = useNavigation();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     navigation.setOptions({ headerShown: false });
  //   }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

      <Text style={{ fontSize: 20, fontWeight: "500" }}>Home Page</Text>
      <Text style={{ fontSize: 15, fontWeight: "500" }}>Count: {count}</Text>

      <Link href="/image-1">Image 1</Link>
      <Link href="/image-2">Image 2</Link>
      <Link href="/image-3">Image 3</Link>

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
