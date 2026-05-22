import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function interval() {
    const router = useRouter()

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => router.push("/")}
            >
                <Text>
                    Go to homepage
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
        backgroundColor: "grey"
    }
})