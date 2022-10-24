import { Pressable, View, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

export default function Btn({ children, onPress, color, disable, h, w }) {
    const custom = {
        backgroundColor: !!color ? color: Colors.WHITE,
        // if h, w not given, defaults to normal size of 52x360 or
        // 40x125 if small
        height: !!h ? h : 65,
        width: !!w ? w : 300,
    }

    // Color of the button when it is being pressed
    // Changes to the secondary color
    const pressedStyle = {
        backgroundColor: getSecondary(color),
    }

    return (
        <View style={[styles.btnContainer, disable && styles.disabled]}>
            <Pressable
                disabled={!!disable}
                onPress={onPress}
                style={ ({pressed}) => [styles.btn, custom, pressed && pressedStyle] }
            >
                {children}
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
    },
    btnContainer: {
        margin: 10,
        borderRadius: 15,
    },
    disabled: {
        opacity: 0.5,
    },
});

/**
 * Gets the secondary color of the given color from Colors.js
 * @param color - color to get the secondary for
 * @returns secondary color (from Color.js)
 */
export function getSecondary(color) {
    switch (color) {
        case Colors.PURPLE:
            return Colors.LIGHT_PURPLE;
        case Colors.DARK_BLUE:
            return Colors.BLUE;
        case Colors.BLUE:
            return Colors.LIGHT_BLUE;
        case Colors.RED:
            return Colors.PINK;
        default:
            return Colors.GRAY3;
    }
}