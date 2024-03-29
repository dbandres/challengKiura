
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addProductoPost, postProduct } from '../../store/slice/addProduct';
import { color } from '../../theme/theme';

interface ProductForm {
  brand: string;
  category: string;
  description: string;
  discountPercentage: string;
  id: string;
  images: string;
  price: string;
  rating: string;
  stock: string;
  thumbnail: string;
  title: string;
}

interface categoriaProps {
  categoria?: string;
}

const Form: React.FC<categoriaProps> = ({ categoria }) => {

  const dispatch = useDispatch()

  const [formData, setFormData] = useState<ProductForm>({
    brand: '',
    category: '',
    description: '',
    discountPercentage: '',
    id: '',
    images: '',
    price: '',
    rating: '',
    stock: '',
    thumbnail: '',
    title: '',
  });

  const handleInputChange = (field: keyof ProductForm, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // campos requeridos
    const requiredFields: (keyof ProductForm)[] = ['title', 'brand', 'description', 'discountPercentage', 'thumbnail', 'price', 'rating', 'stock'];

    // verificamos si todos estan completos
    let allFieldsFilled = true;
    for (const field of requiredFields) {
      if (!formData[field]) {
        allFieldsFilled = false;
        break;
      }
    }

    // sino, mandamos un alert 
    if (!allFieldsFilled) {
      Alert.alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    // hacemos el dispatch de la funcion post
    dispatch(postProduct(formData))
  };

  useEffect(() => {
    if (categoria) {
      setFormData({
        ...formData,
        category: categoria
      })
    }
  }, [categoria])

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titulo"
        value={formData.title}
        onChangeText={(text) => handleInputChange('title', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={formData.brand}
        onChangeText={(text) => handleInputChange('brand', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => handleInputChange('description', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Descuento"
        keyboardType='numeric'
        value={formData.discountPercentage}
        onChangeText={(text) => handleInputChange('discountPercentage', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType='numeric'
        value={formData.price}
        onChangeText={(text) => handleInputChange('price', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        keyboardType='numeric'
        value={formData.rating}
        onChangeText={(text) => handleInputChange('rating', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType='numeric'
        value={formData.stock}
        onChangeText={(text) => handleInputChange('stock', text)}
        placeholderTextColor={color.third}
      />
      <TextInput
        style={styles.input}
        placeholder="Url Imagen"
        value={formData.thumbnail}
        onChangeText={(text) => handleInputChange('thumbnail', text)}
        placeholderTextColor={color.third}
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:color.third
  },
});

export default Form;
