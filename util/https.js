import axios from "axios"
import { BASE_URL } from "../server-conn.js";

// fetches a list of all players
export async function fetchPlayers(session) {
    const route = "get_player_list";
    const url = `${BASE_URL}${route}/${session}`;
    const response = await axios.get(url);
    return response.data;
}

// 0 if valid, 1 if inactive session, 2 if session_id doesn't exist
export async function checkSessionId(session) {
    const route = "verify_id";
    const url = `${BASE_URL}${route}/${session}`;
    const response = await axios.get(url);
    return parseInt(response.data);
}

// attempts to add player to session, if this fails, player name is already taken
export async function attemptAddPlayer(session, name) {
    const route = "store_player";
    const url = `${BASE_URL}${route}/${session}/${name}`;
    const response = await axios.get(url);
    if(response.data === "True"){
        return true;
    }
    return false;
}

export async function removePlayer(session, name) {
    const route = "remove_player";
    const url = `${BASE_URL}${route}/${session}/${name}`;
    console.log(name);
    const response = await axios.get(url);
    if(response.data === "True"){
        return true;
    }
    return false;
}

export async function createSession() {
    const route = "add_session_ID";
    const url = `${BASE_URL}${route}`;
    const response = await axios.get(url);
    return parseInt(response.data);
}

export async function setPhase(session,num) {
    const route = "set_phase";
    const url = `${BASE_URL}${route}/${session}/${num}`;
    const response = await axios.get(url);
    return parseInt(response.data);
}

export async function getPhase(session) {
    const route = "get_phase";
    const url = `${BASE_URL}${route}/${session}`;
    const response = await axios.get(url);
    return parseInt(response.data);
}

export async function setQuestions(session, questions) {
    // inactivate session
    const url = `${BASE_URL}deactivate/${session}`;
    await axios.get(url);
    // get player list
    const playerList = await fetchPlayers(session);
    // update questions for each player
    playerList.forEach(async player => {
        const question = questions[Math.floor(Math.random() * questions.length)];
        await axios.get(`${BASE_URL}update_question/${session}/${player}/${question}`);
    });
    return playerList;
}

export async function getQuestion(session, name) {
    const url = `${BASE_URL}get_question/${session}/${name}`;
    const response = await axios.get(url);
    return response.data;
}

export async function getAnswer(session, name) {
    const url = `${BASE_URL}get_answer/${session}/${name}`;
    const response = await axios.get(url);
    return response.data;
}

export async function setAnswer(session, name, answer) {
    const url = `${BASE_URL}update_answer/${session}/${name}/${answer}`;
    const response = await axios.get(url);
    return response.data
}