import { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { checkSessionId, attemptAddPlayer } from "../util/https";
import GameContext from "../store/GameContext";
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';
import PlayerList from '../components/PlayerList';

export default function JoinScreen({ navigation }) {
    const [roomCode, setRoomCode] = useState("");
    const [name, setName] = useState("");
    const { createPlayer } = useContext(GameContext);

    async function join() {
        const checkSession = await checkSessionId(roomCode);
        if(checkSession === 0){
            if(await attemptAddPlayer(roomCode,name)){
                // all good! go to next screen
                createPlayer(roomCode, name);
                navigation.navigate("WaitingScreen");
            }else{
                // name is already taken
                Alert.alert(
                    "Name is taken",
                    "Please enter a different name",
                    [{
                        text: "OK",
                        onPress: () => {
                            setName("");
                        },
                        style: 'default'
                    }]
                );
            }
        }else if(checkSession === 1){
            // session is not active
            Alert.alert(
                "Session Closed",
                "This session is not accepting any new players",
                [{
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("WelcomeScreen");
                    },
                    style: 'default'
                }]
            );
        }else{
            // session id is not valid
            Alert.alert(
                "Invalid Session ID",
                "Please enter a valid session ID",
                [{
                    text: "OK",
                    onPress: () => {
                        setRoomCode("")
                    },
                    style: 'default'
                }]
            );
        }
    }
    
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <Text style={styles.label}>Room code:</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={setRoomCode}
                        value={roomCode}
                        placeholder="XXX-XXX (Do not include the dash)"
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={setName}
                        value={name}
                        placeholder="Enter your name"
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={join}>Join session</TextBtn>
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
    },
    input: {
        margin: 10,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PURPLE,
    },
    buttonContainer: {
        marginTop: 20,
    },
});