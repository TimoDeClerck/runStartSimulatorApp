import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function start() {
    const router = useRouter()
    const [firstNum, setFirstNum] = useState<number>(0)
    const [secondNum, setSecondNum] = useState<number>(0)
    const [error, setError] = useState("")
    const processFirstNum = (inputString: string) => {
        setFirstNum(parseInt(inputString))
    }
    const processSecondNum = (inputString: string) => {
        setSecondNum(parseInt(inputString))
    }
    const handleSubmit = () => {
        if (!firstNum || !secondNum) {
            setError("You have to fill in all the input fields")
            console.log("You have to fill in all the input fields")
            return;
        }
        else {
            router.push({
                pathname: "/startClock",
                params: { firstNum: firstNum, secondNum: secondNum }
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/")}
                >
                    <Text
                        style={{ fontSize: 25 }}
                    >
                        Go to homepage
                    </Text>
                </TouchableOpacity>
                <Text>Current setup:</Text>
                <Text>"On your marks" min of 20sec max of {firstNum}sec "Set" max of {secondNum}sec "Go"</Text>
                <Text>
                    Seconds between "On your marks" & "Set"
                </Text>
                <TextInput
                    style={styles.text_input}
                    keyboardType="decimal-pad"
                    onChangeText={processFirstNum}
                    placeholder="Min of 21"
                ></TextInput>

                <Text>
                    Seconds between "Set" & "Go"
                </Text>
                <TextInput
                    style={styles.text_input}
                    keyboardType="decimal-pad"
                    onChangeText={processSecondNum}
                ></TextInput>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text
                        style={{ fontSize: 25 }}
                    >
                        Begin
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "grey"
    },
    text_input: {
        width: 50,
        outlineWidth: 1,
        outlineColor: "black",
        padding: 2,
        margin: 5,
    },
    button: {
        outlineWidth: 2,
        outlineColor: "black",
        padding: 15,
        textAlignVertical: "center",
    }
})