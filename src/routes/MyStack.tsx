import { createStackNavigator } from '@react-navigation/stack';
import Details from '../screens/details/Details';
import Navigator from './Navigator';

export type RootStackParams = {
  Navigator: undefined,
  Details: {productId: number, nameProduct: string}
}

const Stack = createStackNavigator<RootStackParams>();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Navigator" component={Navigator} options={{headerShown:false}}/>
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default MyStack;