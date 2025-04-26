// src/screens/CategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const categoryTitles = {
  "electronics": "Electronics",
  "jewelery": "Jewelery", // small typo fix too ("Jewelry" is correct English spelling)
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
};

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', { category });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerButton}>Categories</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.categoryButton}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryText}>
                {categoryTitles[category] || category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  headerButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '90%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c5fbb',
    textAlign: 'center',
  },
});

export default CategoryScreen;
