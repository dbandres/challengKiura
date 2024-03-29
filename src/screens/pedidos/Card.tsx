import { Image, Text, TouchableOpacity, View } from "react-native"
import { globalStyles } from "../../theme/theme"
import { useDispatch } from "react-redux"
import { removeProduct } from "../../store/slice/addMisPedidos"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../routes/MyStack"

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


const Card: React.FC<ProductosProps> = ({producto}) =>{

  const navigation = useNavigation<NavigationProp<RootStackParams>>()
  const dispatch = useDispatch()

  const deleteItem = () =>{
    dispatch(removeProduct(producto.id))
  }

  const goToDetails = () =>{
    navigation.navigate('Details', {productId: producto.id, nameProduct:producto.title})
  }

  console.log('esto es card: ',producto);
  

  return(
    <TouchableOpacity style={globalStyles.cardContainer} onPress={goToDetails}>
      <View style={{width:'30%', height:120, justifyContent:"center", alignItems:"center"}}>
        <Image
          source={{uri: producto.thumbnail}}
          style={{width:"100%", height:115, borderTopLeftRadius:10, borderBottomLeftRadius:10}}
        />
      </View>
      <View style={{justifyContent:'center', alignItems:"center", width:'70%'}}>
        <Text style={{ fontWeight: '700', fontSize: 17 }}>
          {producto.title}
        </Text>
        <Text>
        {producto.description}
        </Text>
        <Text style={{ fontWeight: '800', fontSize: 25 }}> $
          {
            (producto.price - (producto.price * (producto.discountPercentage / 100))).toFixed(2)
          }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Card