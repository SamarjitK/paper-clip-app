
import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { fetchPlayers } from "../util/https";
import GameContext from "../store/GameContext";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../styles/Colors';
import { wait, REFRESH_RATE } from "../util/refresh";


export default function PlayerList() {
    const [players, setPlayers] = useState([]);
    const { sessionID } = useContext(GameContext);
    const [once, setOnce] = useState(true);

    // Fetches and updates players for session
    async function updatePlayers() {
        const playersLocal = await fetchPlayers(sessionID);
        setPlayers(playersLocal);
    }

    // If selected is changed, then news will be updated
    useLayoutEffect(() => {
        wait(REFRESH_RATE).then(() => updatePlayers());
    });
    
    return (
        <View style={styles.outerContainer}>
            <Text style={styles.text}>Joined:</Text>
            <ScrollView style={styles.innerContainer}>
                {players && players.map((name, index) => 
                    <Text key={index} style={styles.listItem}>{name}</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        width: "90%",
        marginTop: 15,
        padding: 10,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.PURPLE,
        marginVertical: 5,
    },
    listItem: {
        fontSize: 20,
        color: Colors.PURPLE,
        marginVertical: 10,
    },
});