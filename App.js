import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from "./source/navigation/StackNavigator"

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

