import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MisPedidos from '../screens/pedidos/MisPedidos';
import Vender from '../screens/vender/Vender';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mis pedidos" component={MisPedidos} />
      <Tab.Screen name="Vender" component={Vender} />
    </Tab.Navigator>
  );
}

export default MyTabs;