import { Pressable, View, StyleSheet, Text } from 'react-native';
import Colors from '../styles/Colors';
import { getSecondary } from './btn';

export default function OutlineBtn({ children, onPress, color }) {
    const custom = {
        borderColor: color,
    }

    const pressedStyle = {
        borderColor: getSecondary(color),
    }

    const font = {
        color: color,
    }

    return (
        <View style={[styles.btnContainer]}>
            <Pressable
                onPress={onPress}
                style={ ({pressed}) => [styles.btn, custom, pressed && pressedStyle] }
            >
                <Text style={[styles.buttonText, font]}>{children}</Text>
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
        borderWidth: 2,
        height: 65,
        width: 200,
    },
    btnContainer: {
        margin: 10,
        borderRadius: 15,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
    },
});