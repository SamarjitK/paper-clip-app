import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import { CommonActions } from '@react-navigation/native';
import Colors from '../styles/Colors';
import { wait, REFRESH_RATE } from "../util/refresh";
import TextBtn from '../components/TextButton';
import { setAnswer as setAns, getAnswer, getPhase, getQuestion } from '../util/https';

export default function AnswerScreen({ navigation, route }) {
    const [ans, setAnsState] = useState("");
    const { sessionID, playerName, playerList, question, answer,
        setSessionID, setPlayerName, setPlayerList, setQuestion, setAnswer } = useContext(GameContext);

    function save() {
        setAns(sessionID, playerName, ans);
    }

    useLayoutEffect(() => {
        setSessionID(route.params.sessionID);
        setPlayerName(route.params.playerName);
        setPlayerList(route.params.playerList);
        setQuestion(route.params.question);
        setAnswer(route.params.answer);
    }, [route])

    async function checkPhase(){
        const phase = await getPhase(sessionID);
        if(phase === 2){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name : 'ClientConvoScreen',
                           params : { sessionID, playerName, playerList, question, answer }}]
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
            <View style={styles.inputContainer}>
                <Text style={styles.question}>
                    {question}
                </Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={setAnsState}
                    value={ans}
                    multiline={true}
                    placeholder="Answer here"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={save}>Save</TextBtn>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        padding: 15,
        marginTop: 30,
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        height: 65,
        width: 350,
        marginVertical: 5,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.LIGHT_GRAY,
        fontSize: 20,
        textAlignVertical: 'top',
    },
    input: {
        margin: 10,
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PURPLE,
    },
    buttonContainer: {
        marginTop: 20,
    },
});