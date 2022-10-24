import { useContext, useLayoutEffect, useState } from "react";
import GameContext from "../store/GameContext";
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';
import PlayerList from '../components/PlayerList';

export default function CreateScreen({ navigation }) {
    const [once, setOnce] = useState(true);
    const { sessionID, openSession } = useContext(GameContext);

    useLayoutEffect(() => {
        if (once) {
            openSession();
            setOnce(false);
        }
    }, [once]);
    
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.InfoContainer}>
                <Text style={styles.infoText}>Your session code is:</Text>
                <Text style={styles.codeText}>{sessionID}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={() => navigation.navigate("PickQsScreen")}>
                    Choose questions
                </TextBtn>
            </View>
            <PlayerList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    InfoContainer: {
        padding: 15,
        marginTop: 30,
        alignContent: 'center',
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.PURPLE,
        textAlign: 'center',
    },
    codeText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: Colors.PURPLE,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
});