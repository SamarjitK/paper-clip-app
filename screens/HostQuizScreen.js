import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';

export default function HostQuizScreen({ navigation, route }) {
    const { sessionID, playerName, playerList, question, answer,
        setSessionID, setPlayerName, setPlayerList, setQuestion, setAnswer } = useContext(GameContext);

    useLayoutEffect(() => {
        setSessionID(route.params.sessionID);
        setPlayerName(route.params.playerName);
        setPlayerList(route.params.playerList);
        setQuestion(route.params.question);
        setAnswer(route.params.answer);
    }, [route]);

    function finish() {
        // TODO: ADD METHOD to update phase
        navigation.navigate("WelcomeScreen");
        // const resetAction = CommonActions.reset({
        //     index: 0,
        //     routes: [{ 
        //         name : 'FinalScreen', 
        //         params : { sessionID, playerName, playerList, question, answer }
        //     }]
        // })
        // navigation.dispatch(resetAction);
    }

    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.InfoContainer}>
                <Text style={styles.infoText}>
                    Wait for participants to finish their quizzes.
                    Then click the button below to display the results.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={finish}>
                    Close quiz
                </TextBtn>
            </View>
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
    buttonContainer: {
        marginTop: 20,
    },
});