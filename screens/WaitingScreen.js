import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { removePlayer, getPhase, getQuestion } from "../util/https";
import { wait, REFRESH_RATE } from "../util/refresh";
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import PlayerList from '../components/PlayerList';
import OutlineBtn from '../components/OutlineBtn';

export default function WaitingScreen({ navigation, route }) {
    const { sessionID, playerName, deletePlayer, setQuestion, playerList, question, answer,
        setSessionID, setPlayerName, setPlayerList, setAnswer } = useContext(GameContext);
    
    async function leave() {
        console.log(playerName);
        await removePlayer(sessionID, playerName);
        await deletePlayer();
        navigation.navigate("WelcomeScreen");
    }
    
    async function checkPhase(){
        const phase = await getPhase(sessionID);
        console.log(phase);
        if(phase === 1){
            setQuestion(await getQuestion(sessionID, playerName));
            const que = await getQuestion(sessionID, playerName);
            setQuestion(que);
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ 
                    name : 'AnswerScreen', 
                    params : { sessionID, playerName, playerList, question: que, answer }
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
    // Working code:
    // setInterval(checkPhase, REFRESH_RATE);
    
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.InfoContainer}>
                <Text style={styles.infoText}>Your session code is:</Text>
                <Text style={styles.codeText}>{sessionID}</Text>
            </View>
            <PlayerList />
            <View style={styles.buttonContainer}>
                <OutlineBtn color={Colors.RED} onPress={leave}>
                    LEAVE SESSION
                </OutlineBtn>
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