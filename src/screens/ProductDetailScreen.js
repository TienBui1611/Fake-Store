// src/screens/ProductDetailScreen.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add to Shopping Cart" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#2a9d8f',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default ProductDetailScreen;
