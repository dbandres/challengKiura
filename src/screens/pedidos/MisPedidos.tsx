import { Alert, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/store';
import Card from "./Card";
import { removeAll } from "../../store/slice/addMisPedidos";
import { color } from "../../theme/theme";



const MisPedidos = () => {

  const pedidos = useSelector((state: RootState) => state.addProducto)
  const dispatch = useDispatch()

  const finalizarCompra = () =>{
    dispatch(removeAll())
    Alert.alert(
      'Su compra ha sido finalizada con éxito!',
      'Le estaremos enviando toda la informacion a su correo electronico.'
    )
  }

  return (
    <>
      {
        pedidos.products.length !== 0 ?
          <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
            {
              pedidos.products.map((producto, index) => (
                <Card
                  key={index}
                  producto={producto}
                />
              ))
            }
            <TouchableOpacity style={{ backgroundColor: color.primary, width: 150, height: 40, justifyContent: "center", alignItems: 'center', borderRadius: 20 }} onPress={finalizarCompra}>
              <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16 }}>
                Finalizar compra
              </Text>
            </TouchableOpacity>
          </View>
          :
          <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10 }}>
            <Text>
              No hay productos en su Orden de compra.
            </Text>
          </View>
      }
    </>
  )
}

export default MisPedidos;