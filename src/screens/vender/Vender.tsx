import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import {
  img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12
  , img13, img14, img15, img16, img17, img18, img19, img20
} from "../../assets/categories/png/index"
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../store/slice/categoriesSlice";
import { useEffect, useState } from "react";
import { color } from "../../theme/theme";
import Form from "./Form";
import { addProductoPost } from "../../store/slice/addProduct";
import Productos from "../../components/productos/Productos";


const { width } = Dimensions.get('window');
const itemWidth = width / 5;

const Vender = () => {

  const [select, setSelect] = useState<Boolean>(false)
  const [indice, setIndice] = useState<Number>()
  const [cateSelect, setCateSelect] = useState<string>()

  const categories = useSelector(selectAllCategories);
  const nuevoProducto = useSelector(addProductoPost)

  const imagesArray = [
    img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ];

  const handleCategory = (categorie: string, index: number) => {
    console.log("Categoría seleccionada:", categorie, index);
    setSelect(true)
    setIndice(index)
    setCateSelect(categorie)
  }

  const resetFilter = () => {
    setSelect(false)
    setIndice(NaN)
  }

  useEffect(() => {
    setSelect(false)
    setIndice(NaN)
  }, [nuevoProducto.newProducto])


  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {
          nuevoProducto.newProducto !== null ?
            <Text style={{ paddingHorizontal: 10, paddingVertical: 10, color:color.third }}>
              Mis productos:
            </Text>
            :
            null
        }
        {
          nuevoProducto.loading === false && nuevoProducto.newProducto !== null ?
            <Productos
              producto={nuevoProducto.newProducto}
            />
            :
            nuevoProducto.loading === true && nuevoProducto.newProducto === null ?
              <ActivityIndicator
                size='large' color={color.second}
              />
              :
              null
        }
      </View>
      {
        select === false ?
          <Text style={{ paddingHorizontal: 10, paddingVertical: 10,  color:color.third}}>
            Elija la categoria:
          </Text>
          : null
      }
      <View style={styles.container}>
        {categories && select === false
          ? categories.map((categorie, index) => (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index}
              onPress={() => handleCategory(categorie, index)}
            >
              <Image source={imagesArray[index]} style={styles.image} />
              <Text style={styles.text}>{categorie}</Text>
            </TouchableOpacity>
          ))
          : categories && select === true && (
            <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
              <View style={{ height: 120, width: '100%' }}>
                <TouchableOpacity style={styles.itemContainer}>
                  <Image source={imagesArray[indice]} style={styles.image} />
                  <Text style={styles.text}>{categories[indice]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContaines}>
                  <Text style={{ fontWeight: '500', fontSize: 13, color: '#FFFFFF' }} onPress={resetFilter}>
                    Borrar categoria
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 550, width: '100%' }}>
                <Form
                  categoria={cateSelect}
                />
              </View>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: color.second,
    height: 70,
    justifyContent: 'center'
  },
  image: {
    width: 35,
    height: 35,
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    color:color.third
  },
  btnContaines: {
    backgroundColor: color.second,
    width: 110,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
});

export default Vender;