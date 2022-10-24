import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';
import { wait, REFRESH_RATE } from "../util/refresh";
import { setAnswer, getAnswer } from '../util/https';
import QuestionItem from '../components/QuestionItem';

export default function ClientQuizScreen({ navigation, route }) {
    const [selected, setSelected] = useState("");
    const [quizObj, setQuizObj] = useState();
    const { sessionID, playerName, playerList, question, answer, createQuiz,
        setSessionID, setPlayerName, setPlayerList, setQuestion, setAnswer } = useContext(GameContext);

    function submit() {
        // setAns(sessionID, playerName, ans);
        navigation.navigate("WelcomeScreen");
    }

    async function getQuiz() {
        const obj = await createQuiz();
        setQuizObj(obj);
        console.log(obj);
    }

    useLayoutEffect(() => {
        setSessionID(route.params.sessionID);
        setPlayerName(route.params.playerName);
        setPlayerList(route.params.playerList);
        setQuestion(route.params.question);
        setAnswer(route.params.answer);
        getQuiz();
    }, [route])

    async function checkPhase(){
        const phase = await getPhase(sessionID);
        if(phase === 2){
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name : 'AnswerScreen',
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

    function toggleSelection(q) {
        if (selected.includes(q)) {
            setSelected((prev) => prev.filter((item) => item !== q));
        } else {
            setSelected((prev) => [...prev, q]);
        }
    }
    
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.inputContainer}>
                <Text style={styles.question}>
                    {q}
                </Text> 
                <Text style={styles.question}>
                    {ans}
                </Text>
                <View style={styles.optionsContainer}>
                    {choices.map((item, i) => <QuestionItem q={item} key={i} toggleSelect={toggleSelection} />)}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={submit}>Submit</TextBtn>
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
    optionsContainer: {

    }
});

const q = "What is your favorite magical or mythological animal?";
const ans = "Unicorn";
const choices = ["Alex", "Rohith", "Samarjit", "Dubs"];