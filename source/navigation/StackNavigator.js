import {createStackNavigator} from "@react-navigation/stack"
import LoginScreen from "../screens/LoginScreen"
import HomeScreen from "../screens/HomeScreen"
import ModalScreen from "../screens/ModalScreen"
import MatchScreen from "../screens/MatchScreen"
import MessageScreen from "../screens/MessageScreen"
import ChatScreen from "../screens/ChatScreen"

const stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen name={"LoginScreen"} component={LoginScreen}/>
            <stack.Screen name={"HomeScreen"} component={HomeScreen}/>
            <stack.Screen name={"ChatScreen"} component={ChatScreen}/>
            <stack.Screen name={"MessageScreen"} component={MessageScreen}/>
        </stack.Navigator>
    )
}

export default StackNavigator;