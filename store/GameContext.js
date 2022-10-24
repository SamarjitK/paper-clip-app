import { createContext, useState } from "react";
import { createSession, setQuestions, setPhase, getAnswer, getQuestion } from "../util/https";

const GameContext = createContext();

export function ContextProvider({ children }) {
    const [sessionID, setSessionID] = useState();
    const [playerName, setPlayerName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [playerList, setPlayerList] = useState([]);

    async function openSession() {
        const id = await createSession();
        setSessionID(id);
    }

    async function startSession(questions) {
        const tempList = await setQuestions(sessionID, questions);
        setPhase(sessionID,1);
        setPlayerList(tempList);
    }

    async function createQuiz() {
        const tempList = [];
        for(let i = 0; i<playerList.length; i++){
            const question = await getQuestion(sessionID, playerList[i]);
            const answer = await getAnswer(sessionID, playerList[i]);
            const choices = ["","","",""];
            choices[0] = playerList[i];
            for(let j = 1; j<4;j++){
                choices[j] = playerList[(i+j) % playerList.length()];
            }
            choices.sort();
            tempList.push({
                question: question,
                answer: answer,
                choices: choices,
                correct: PlayerList[i]
            });
        }
        return tempList;
    }

    async function createPlayer(session, name) {
        setSessionID(session);
        setPlayerName(name);
    }

    async function deletePlayer() {
        setSessionID(-1);
        setPlayerName("");
    }

    return (
        <GameContext.Provider 
            value={{ 
                sessionID, playerList, playerName, question, answer,
                setSessionID, setPlayerList, setPlayerName, setQuestion, setAnswer,
                openSession, startSession, createPlayer, deletePlayer, createQuiz,
            }} 
        >
            {children}
        </GameContext.Provider>
    );
}


export default GameContext;