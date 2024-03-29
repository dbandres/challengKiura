import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import Order from "../screens/order/Order";
import { Image } from "react-native";
import { color } from "../theme/theme";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const Tab = createBottomTabNavigator()

const Navigator = () => {

  const pedidos = useSelector((state: RootState) => state.addProducto)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{height:55, paddingBottom:5},
        tabBarLabelStyle:{fontSize:14},
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.third
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={Home} 
        options={{headerShown:false, 
          tabBarIcon: ({focused})=>(focused ? 
          <Image source={require("../assets/tabIcons/ic_menu_home_select.png")} /> : 
          <Image source={require("../assets/tabIcons/ic_menu_home.png")} />)}}
      />
      <Tab.Screen 
        name="Orden de compra" 
        component={Order} 
        options={{headerShown:false, 
          tabBarIcon: ({focused})=>(focused && pedidos.products.length === 0 ? 
          <Image source={require("../assets/tabIcons/ic_menu_pesanan_select.png")} /> : 
          !focused && pedidos.products.length === 0 ? 
          <Image source={require("../assets/tabIcons/ic_menu_pesanan.png")} />:
          focused && pedidos.products.length !== 0 ? 
          <Image source={require("../assets/tabIcons/ic_menu_pesanan_si.png")} />
          :
          <Image source={require("../assets/tabIcons/ic_menu_pesanan_no.png")} />
          )}}
      />
    </Tab.Navigator>
  )
}

export default Navigator;