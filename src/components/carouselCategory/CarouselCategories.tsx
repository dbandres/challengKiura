import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../../store/slice/categoriesSlice";
import { RootState } from "../../store/store";
import {
  img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12
  , img13, img14, img15, img16, img17, img18, img19, img20
} from "../../assets/categories/png/index"
import { color } from '../../theme/theme';
import { useState } from "react";
import { fetchCategoryProducts, fetchProducts } from "../../store/slice/getProductsSlice";

const CarouselCategories = () => {

  const [select, setSelect] = useState<Boolean>(false)
  const [indice, setIndice] = useState<Number>()
  const dispatch = useDispatch()

  const imagesArray = [
    img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ];

  const categories = useSelector(selectAllCategories);
  const status = useSelector((state: RootState) => state.categories.status);

  const handleCategory = (categorie: string, index: number) => {
    console.log("Categoría seleccionada:", categorie, index);
    dispatch(fetchCategoryProducts(categorie))
    setSelect(true)
    setIndice(index)
  }

  const resetFilter = () =>{
    dispatch(fetchProducts())
    setSelect(false)
    setIndice(NaN)
  }

  return (
    <View style={{ height: 130, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ height: 30, width: '90%', justifyContent: "space-between", display: "flex", flexDirection: "row" }}>
        <Text style={{color:color.third}}>
          Categorias
        </Text>
        <TouchableOpacity onPress={resetFilter} disabled={!select}>
          <Text style={{color:color.third}}>
            Ver todo
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={{ width: '98%'}}>
        {
          categories && select === false ?
            categories.map((categorie, index) => (
              <TouchableOpacity style={styles.containesScroll} key={index} onPress={() => handleCategory(categorie, index)}>
                <Image
                  source={imagesArray[index]}
                  style={{ width: 35, height: 35 }}
                />
                <Text style={{ fontSize: 10, fontWeight: '500', color:color.third }}>
                  {categorie}
                </Text>
              </TouchableOpacity>
            ))
            :
            categories && select === true ?
              <TouchableOpacity style={styles.containesScroll}>
                <Image
                  source={imagesArray[indice]}
                  style={{ width: 35, height: 35 }}
                />
                <Text style={{ fontSize: 10, fontWeight: '500' , color:color.third}}>
                  {categories[indice]}
                </Text>
              </TouchableOpacity>
              :
              null
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containesScroll: {
    borderColor: color.second,
    width: 80,
    height: 70,
    justifyContent: "center",
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1.5
  }
})

export default CarouselCategories;