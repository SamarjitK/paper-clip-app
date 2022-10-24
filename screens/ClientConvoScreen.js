import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useContext, useLayoutEffect, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import { wait, REFRESH_RATE } from "../util/refresh";
import TextBtn from '../components/TextButton';
import { getPhase } from '../util/https';

export default function ClientConvoScreen({ navigation, route }) {
    const { sessionID, playerName, playerList, question, answer,
        setSessionID, setPlayerName, setPlayerList, setQuestion, setAnswer } = useContext(GameContext);

    useLayoutEffect(() => {
        setSessionID(route.params.sessionID);
        setPlayerName(route.params.playerName);
        setPlayerList(route.params.playerList);
        setQuestion(route.params.question);
        setAnswer(route.params.answer);
    }, [route])

    async function checkPhase(){
        const phase = await getPhase(sessionID);
        console.log(phase);
        if(phase === 3){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ 
                    name : 'ClientQuizScreen',
                    params: { sessionID, playerName, playerList, question, answer }
                }]
            })
            navigation.dispatch(resetAction); 
        }
    }

    useEffect(() => {
        let interval = setInterval(checkPhase, REFRESH_RATE);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.InfoContainer}>
                <Text style={styles.infoText}>
                    Talk to the people around you to find out
                    more about them!
                </Text>
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
});