import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import SearchComponent from "../../components/search/SearchComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slice/categoriesSlice";
import CarouselCategories from "../../components/carouselCategory/CarouselCategories";
import Productos from "../../components/productos/Productos";
import { fetchProducts, getProducts } from "../../store/slice/getProductsSlice";
import { color } from "../../theme/theme";

const Home = () => {

  const dispatch = useDispatch();
  const productos = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts())
  }, []);
  

  return (
    <View style={{ flex: 1 }}>
      <View>
        <SearchComponent />
      </View>
      <View>
        <CarouselCategories />
      </View>
      <ScrollView>
        {
          productos.status === 'loading' ?
          <ActivityIndicator
            size='large' color={color.second}
          />
          :
           productos.products ?
            productos.products.map((producto, index) => (
              <Productos
                key={index}
                producto={producto}
              />
            ))
            :
            null
        }
      </ScrollView>
    </View>
  )
}

export default Home;