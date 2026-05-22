import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter()
  const [count, setCount] = useState(0)

  return (
    <View
      style={styles.container}
    >
      {/*<Text>{count}</Text>
      <TouchableOpacity
        onPress={() => setCount(count + 1)}
      >
        <Text>Increase</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCount(0)}
      >
        <Text>Reset</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity
        onPress={() => router.push("/start")}
      >
        <Text
          style={styles.button_text}
        >
          Start simulator
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/interval")}
      >
        <Text
          style={styles.button_text}
        >
          Interval trainer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    fontSize: 50,
    outlineColor: "black",
    outlineWidth: 3,
    margin: 30,
    padding: 3,
  }
})