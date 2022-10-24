import { Text, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';
import Btn from './btn';

export default function TextBtn({ children, onPress, color, disable, h, w, textSize }) {
    const custom = {
        fontSize: textSize ? textSize : 24,
        color: getTextColor(color),
    };

    return (
        <Btn onPress={onPress} color={color} disable={disable} h={h} w={w} >
            <Text style={[styles.buttonText, custom]}>{children}</Text>
        </Btn>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

function getTextColor(buttonColor) {
    if ([Colors.BLACK, Colors.BLUE, Colors.DARK_BLUE, Colors.PURPLE].includes(buttonColor)) {
        return Colors.WHITE;
    } else {
        return Colors.BLACK;
    }
}