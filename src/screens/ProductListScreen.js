// src/screens/ProductListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Text, Button, Image, Icon } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: category });
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <Card containerStyle={styles.card}>
        <View style={styles.itemRow}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>
              <Text style={{ fontWeight: 'bold' }}>Price:</Text> ${item.price.toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
      ) : (
        <>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <View style={styles.backButtonContainer}>
            <Button
              title="Back"
              onPress={() => navigation.goBack()}
              icon={<Icon name="arrow-back" color="white" />}
              buttonStyle={styles.backButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 12,
  },
});

export default ProductListScreen;
