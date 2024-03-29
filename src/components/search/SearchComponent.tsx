import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { color, globalStyles } from "../../theme/theme";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchSearchProducts } from "../../store/slice/getProductsSlice";

const SearchComponent = () => {

  const [searchValue, setSearchValue] = useState<string>('');
  const dispach = useDispatch()

  const handleInputChange = (text: string) => {
    setSearchValue(text); 
    if(text === ''){
      dispach(fetchProducts())
    }
  };

  const handleSearch = () => {
    console.log('Valor de búsqueda:', searchValue);
    dispach(fetchSearchProducts(searchValue))
  };

  return (
    <View style={globalStyles.searchStyle}>
      <TextInput
        placeholder="Buscar..."
        style={globalStyles.inputStyle}
        placeholderTextColor={color.third}
        value={searchValue} 
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.touchable} onPress={handleSearch}>
        <Image
          source={require("../../assets/search.png")}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  touchable:{ 
    position: 'absolute', 
    right: 30, 
    width:40, 
    height:40, 
    justifyContent:"center", 
    alignItems:'center' }
})

export default SearchComponent;