import { Image, Text, TouchableOpacity, View } from "react-native"
import { color, globalStyles } from "../../theme/theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../routes/MyStack";

interface Producto {
  id:number
  title: string
  price: number
  rating: number
  description: string
  discountPercentage: number
  stock: number
  brand: string
  thumbnail: string
}

interface ProductosProps {
  producto: Producto;
}

const Productos: React.FC<ProductosProps> = ({ producto }) => {
  
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  const goToDetails = () =>{
    navigation.navigate('Details', {productId: producto.id, nameProduct:producto.title})
  }

  return (
    <TouchableOpacity style={globalStyles.cardStyle} onPress={()=> goToDetails()}>
      <View style={{ width: 150, height: 90, justifyContent: "center", alignItems: 'center' }}>
        <Image
          source={{ uri: producto.thumbnail }}
          style={{ width: 150, height: 90, resizeMode: 'stretch' }}
        />
      </View>
      <View style={{ width: 250, height: 90, justifyContent:'center', paddingLeft:20}}>
        <Text style={{color:color.third, fontWeight:'700', fontSize:13}}>
          {producto.title}
        </Text>
        <Text style={{textDecorationLine:'line-through', fontSize:12, color:color.third}}>
          $ {producto.price}
        </Text>
        <Text style={{fontWeight:'700', color:color.third}}>
          $ {(producto.price - (producto.price * (producto.discountPercentage / 100))).toFixed(2)} <Text style={{color:color.primary, fontSize:11}}> {Math.round(producto.discountPercentage)}% OFF</Text>
        </Text>
        <View style={{display:'flex', flexDirection:"row", width:40, justifyContent:"space-between", left:180}}>
          <Text style={{fontWeight:'500', fontSize:12, color:color.third}}>
            {(producto.rating).toFixed(1)}
          </Text>
          <Image
            source={require('../../assets/star.png')}
            style={{width:15,height:15,}}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Productos;