import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContextProvider } from './store/GameContext';
import WelcomeScreen from './screens/WelcomeScreen';
import CreateScreen from './screens/CreateScreen';
import PickQsScreen from './screens/PickQsScreen';
import HostWaitScreen from './screens/HostWaitScreen';
import HostCCScreen from './screens/HostCCScreen';
import HostQuizScreen from './screens/HostQuizScreen';
import JoinScreen from './screens/JoinScreen';
import WaitingScreen from './screens/WaitingScreen';
import AnswerScreen from './screens/AnswerScreen';
import ClientConvoScreen from './screens/ClientConvoScreen';
import ClientQuizScreen from './screens/ClientQuizScreen';
import Colors from './styles/Colors';

export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <>
      <StatusBar style='dark'/>
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="WelcomeScreen" 
            screenOptions={{ 
              contentStyle: {backgroundColor: Colors.XLIGHT_BLUE}, 
              headerStyle: {backgroundColor: Colors.XLIGHT_BLUE}, 
            }} 
          >
            <Stack.Screen 
              name="WelcomeScreen" 
              component={WelcomeScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="CreateScreen" 
              component={CreateScreen} 
              options={{ title: "Lobby" }} 
            />
            <Stack.Screen 
              name="PickQsScreen" 
              component={PickQsScreen} 
              options={{ title: "Pick Questions" }} 
            />
            <Stack.Screen 
              name="HostWaitScreen" 
              component={HostWaitScreen} 
              options={{ title: "Answering Period" }} 
            />
            <Stack.Screen 
              name="HostCCScreen" 
              component={HostCCScreen} 
              options={{ title: "Conversation Period" }} 
            />
            <Stack.Screen 
              name="HostQuizScreen" 
              component={HostQuizScreen} 
              options={{ title: "Quiz" }} 
            />
            <Stack.Screen 
              name="JoinScreen" 
              component={JoinScreen} 
              options={{ title: "Join a session" }} 
            />
            <Stack.Screen 
              name="WaitingScreen" 
              component={WaitingScreen} 
              options={{ title: "Waiting Room" }} 
            />
            <Stack.Screen 
              name="AnswerScreen" 
              component={AnswerScreen} 
              options={{ title: "Answer your Question" }} 
            />
            <Stack.Screen 
              name="ClientConvoScreen" 
              component={ClientConvoScreen} 
              options={{ title: "Talk with your peers!" }} 
            />
            <Stack.Screen 
              name="ClientQuizScreen" 
              component={ClientQuizScreen} 
              options={{ title: "Quiz Time!" }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </>
  );
}
