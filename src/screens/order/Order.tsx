import { Text, View } from "react-native"
import MyTabs from "../../routes/MyTabs";
import { color } from "../../theme/theme";




const Order = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{height:50, backgroundColor:color.second, justifyContent:'center', alignItems:'center'}}>
        <Text style={{ fontWeight: "800", fontSize: 18 }}>
          Orden de compra
        </Text>
      </View>
      <MyTabs/>
    </View>
  )
}

export default Order;