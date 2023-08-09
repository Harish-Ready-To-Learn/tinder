import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./source/navigation/StackNavigator";
import { AuthProvider } from "./source/hooks/useAuth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
