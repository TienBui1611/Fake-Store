// src/screens/ProductDetailScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Button, Image, Icon } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
    Alert.alert(
      'Added to Cart',
      `${product.title} has been added to your cart.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card containerStyle={styles.headerCard}>
        <Text style={styles.headerText}>Product Details</Text>
      </Card>

      <Card containerStyle={styles.imageCard}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </Card>

      <Text style={styles.title}>{product.title}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}><Text style={styles.bold}>Rate:</Text> {product.rating?.rate ?? 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Count:</Text> {product.rating?.count ?? 'N/A'}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Price:</Text> ${product.price.toFixed(2)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Back"
          icon={<Icon name="arrow-back" color="white" />}
          onPress={() => navigation.goBack()}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Add to Cart"
          icon={<Icon name="add-shopping-cart" color="white" />}
          onPress={handleAddToCart}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
      </View>

      <Text style={styles.descriptionTitle}>Description:</Text>
      <Card containerStyle={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fff', paddingBottom: 40 },
  headerCard: {
    backgroundColor: '#4da6ff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  imageCard: {
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4da6ff',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoText: {
    color: '#000',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  descriptionBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
  },
});

export default ProductDetailScreen;