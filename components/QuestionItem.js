import {useState} from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

export default function QuestionItem({ q, toggleSelect }) {
    const [selected, setSelected] = useState(false);

    function toggle() {
        toggleSelect(q);
        setSelected((prev) => !prev);
    }

    return (
        <View style={styles.btnContainer} >
            <Pressable style={[styles.btn, selected && styles.selected]} onPress={toggle}>
                <Text style={styles.text}>{q}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 15,
        maxWidth: 380,
        borderWidth: 2,
        borderColor: Colors.LIGHT_PURPLE,
    },
    btnContainer: {
        margin: 5,
    },
    selected: {
        backgroundColor: Colors.LIGHT_PURPLE,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    }
});