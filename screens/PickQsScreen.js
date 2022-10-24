import { useContext, useLayoutEffect, useState } from "react";
import GameContext from "../store/GameContext";
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';
import { getQuestions } from "../util/questions";
import QuestionItem from "../components/QuestionItem";

export default function PickQsScreen({ navigation }) {
    const [once, setOnce] = useState(true);
    const [selected, setSelected] = useState([]);
    const [questions, setQuestions] = useState([]);
    const { startSession, sessionID, playerName, question, answer, playerList } = useContext(GameContext);

    function toggleSelection(q) {
        if (selected.includes(q)) {
            setSelected((prev) => prev.filter((item) => item !== q));
        } else {
            setSelected((prev) => [...prev, q]);
        }
    }

    useLayoutEffect(() => {
        if (once) {
            setQuestions(getQuestions(10));
            setOnce(false);
        }
    }, [once])

    function startGame() {
        startSession(selected);
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ 
                name : 'HostWaitScreen', 
                params : { sessionID, playerName, playerList, question, answer }
            }]
        })
        navigation.dispatch(resetAction); 
    }
    
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <ScrollView style={styles.listGroup}>
                {questions.map((q, i) => <QuestionItem key={i} q={q} toggleSelect={toggleSelection} />)}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={startGame}>
                    Start game!
                </TextBtn>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listGroup: {
        borderRadius: 15,
        height: 650,
        padding: 5,
        width: 400,
        margin: 10,
    },
    text: {
        fontSize: 15,
    },
    buttonContainer: {
        margin: 10,
    },
});