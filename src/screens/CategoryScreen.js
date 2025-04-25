// src/screens/CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('ProductList', { category: item })}
    >
      <Text style={styles.buttonText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, backgroundColor: '#eee', marginBottom: 10, borderRadius: 8 },
  text: { fontSize: 18, textTransform: 'capitalize' },
  button: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0077cc',
    textTransform: 'capitalize',
  }
});

export default CategoryScreen;
