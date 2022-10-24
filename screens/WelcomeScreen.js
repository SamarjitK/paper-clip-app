import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import CommonStyles from '../styles/CommonStyles';
import Colors from '../styles/Colors';
import TextBtn from '../components/TextButton';

function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={CommonStyles.screen}>
            <View style={styles.LogoContainer}>
                <Text style={styles.title}>Paperclip.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TextBtn color={Colors.PURPLE} onPress={() => navigation.navigate("JoinScreen")}>
                    Join a session
                </TextBtn>
                <TextBtn color={Colors.PURPLE} onPress={() => navigation.navigate("CreateScreen")}>
                    Start a session
                </TextBtn>
            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    LogoContainer: {
        padding: 15,
        marginTop: 180,
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: Colors.PURPLE,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 200,
    },
});