import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { RootStackParams } from "../../routes/MyStack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, selectProductId } from "../../store/slice/productById";
import { color, globalStyles } from "../../theme/theme";
import { addProduct, resetMessage } from "../../store/slice/addMisPedidos";
import { RootState } from "../../store/store";

const { width } = Dimensions.get('screen')

const Details = () => {

  const product = useSelector(selectProductId)
  const dispatch = useDispatch()
  const [imgSelect, setImgSelect] = useState<string>()

  const { productId, nameProduct } = useRoute<RouteProp<RootStackParams, 'Details'>>().params
  const mensaje = useSelector((state: RootState) => state.addProducto.message)

  const navigation = useNavigation()

  useEffect(() => {
    dispatch(fetchProductById(productId))
    navigation.setOptions({
      title: nameProduct
    })
    
  }, [])

  useEffect(()=>{
    dispatch(resetMessage())
    if(mensaje !== null){
      Alert.alert(
        mensaje,
      )
    }
  },[mensaje])

  const handleImg = (imgUrl: string) => {
    setImgSelect(imgUrl)
  }

  const agregarProducto = () => {
    if (product.product !== null) {
      dispatch(addProduct(product.product));
    } else {
      console.error('El producto es nulo');
    }
  };
  
console.log(product);


  const imagesRender = () => {
    return (
      <View style={{ display: "flex", flexDirection: 'row', height: 140, justifyContent: "center", alignItems: 'center' }}>
        {
          product.product?.images.slice(0, 4).map((img, index) => (
            <TouchableOpacity key={index} style={{ marginLeft: 10, width: 85, height: 110, borderWidth: 1, justifyContent: 'center', alignItems: "center" }} onPress={() => handleImg(img)}>
              <Image
                source={{ uri: img }}
                style={{ width: 83, height: 109, resizeMode: 'stretch' }}
              />
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }


  return (
    <View style={{ flex: 1 }}>
      {
        product.status === 'loading' ?
          <ActivityIndicator
            size='large' color={color.second}
          />
          :
          <View style={{ flex: 1 }}>
            <View style={{ height: '60%' }}>
              <View>
                <Image
                  source={{ uri: imgSelect === undefined ? product.product?.thumbnail : imgSelect }}
                  style={{ width: width, height: '100%', resizeMode: 'stretch' }}
                />
              </View>
            </View>
            <View style={globalStyles.detailInfo}>
              <View style={{ height: 70, marginTop: 20, width: "90%", justifyContent: "space-between", flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ fontWeight: '700', fontSize: 17 }}>
                    {product.product?.title}
                  </Text>
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 7, alignItems: "center" }}>
                    <Image
                      source={require('../../assets/star.png')}
                      style={{ width: 15, height: 15, marginRight: 5 }}
                    />
                    <Text style={{ fontWeight: "800", fontSize: 14 }}>
                      {(product.product?.rating)?.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={{ width: 90, justifyContent: 'center', alignItems: "center" }}>
                  <Text style={{ fontWeight: "800", fontSize: 14 }}>
                    {product.product?.stock} - unidades
                  </Text>
                  <Text>
                    En Stock
                  </Text>
                </View>
              </View>
              {
                imagesRender()
              }
              <View style={{ width: '90%' }}>
                <Text>
                  {product.product?.description}
                </Text>
              </View>
              <View style={{ width: '90%', height: 70, justifyContent: 'space-between', alignItems:"center", flexDirection:'row' }}>
                <View>
                  <Text style={{ textDecorationLine: 'line-through', fontSize: 12 }}>
                    $ {product.product?.price}
                  </Text>
                  <Text style={{ fontWeight: '800', fontSize: 25 }}>
                    $ {(product.product?.price - (product.product?.price * (product.product?.discountPercentage / 100))).toFixed(2)} <Text style={{ color: color.primary, fontSize: 11 }}> {Math.round(product.product?.discountPercentage)}% OFF</Text>
                  </Text>
                </View>
                <View style={{height: 30}}>
                  <TouchableOpacity onPress={agregarProducto} style={{backgroundColor:color.primary, width:90, height:40, borderRadius:20, justifyContent:"center", alignItems:'center'}}>
                    <Text style={{color:color.third, fontWeight:'700', fontSize:15}}>
                      Comprar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
      }
    </View>
  )
}

export default Details;