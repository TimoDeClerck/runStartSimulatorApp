import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TimerFase = 'LADEN' | 'FIRST_TIMER' | 'SECOND_TIMER' | 'DONE';

export default function startClock() {
    const router = useRouter()
    const { firstNum, secondNum } = useLocalSearchParams()
    const [teller1, setTeller1] = useState<number>(Math.floor(Math.random() * (parseInt(firstNum as string, 10) - 20 + 1)) + 20);
    const [teller2, setTeller2] = useState<number>(Math.floor(Math.random() * (parseInt(secondNum as string, 10) - 1 + 1)) + 1);
    const [fase, setFase] = useState<TimerFase>('LADEN');
    const [teller, setTeller] = useState<number>(teller1);

    const playAudio = async (bestand: any) => {
        try {
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

            const { sound } = await Audio.Sound.createAsync(bestand);
            await sound.playAsync();
        } catch (error) {
            console.log("Fout bij afspelen audio:", error);
        }
    };

    useEffect(() => {
        const startStartSchot = async () => {
            await playAudio(require('../assets/onYourMarks.wav'));

            setTeller(teller1);
            setFase('FIRST_TIMER');
        };
        startStartSchot();
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if ((fase === 'FIRST_TIMER' || fase === 'SECOND_TIMER') && teller > 0) {
            interval = setInterval(() => {
                setTeller((huidig) => huidig - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [fase, teller]);

    useEffect(() => {
        if (teller === 0) {
            if (fase === 'FIRST_TIMER') {
                playAudio(require('../assets/set.wav'));
                setTeller(teller2);
                setFase('SECOND_TIMER');
            }
            else if (fase === 'SECOND_TIMER') {
                playAudio(require('../assets/go.wav'));
                setFase('DONE');
            }
        }
    }, [teller, fase]);

    return (
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        outlineWidth: 2,
        outlineColor: "black",
        padding: 15,
        textAlignVertical: "center",
    }
})