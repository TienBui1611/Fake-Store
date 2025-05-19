// src/screens/ShoppingCartScreen.js (updated)
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { Card, Button, Image, Icon, Divider } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  checkout,
  syncCart
} from '../redux/cartSlice';

const ShoppingCartScreen = () => {
  const { items, totalQuantity, totalAmount, loading } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // Sync cart with server when items change
  useEffect(() => {
    if (items.length > 0) {
      dispatch(syncCart(items));
    }
  }, [items, dispatch]);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseItemQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseItemQuantity(id));
  };

  const handleCheckout = async () => {
    Alert.alert(
      'Confirm Checkout',
      'Are you sure you want to place this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Checkout',
          onPress: async () => {
            const resultAction = await dispatch(checkout());
            
            if (checkout.fulfilled.match(resultAction)) {
              Alert.alert('Success', 'Your order has been placed successfully');
            } else if (resultAction.payload) {
              Alert.alert('Checkout Failed', resultAction.payload);
            }
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.itemRow}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <View style={styles.quantityContainer}>
            <Button
              icon={<Icon name="remove" color="white" size={16} />}
              buttonStyle={styles.quantityButton}
              onPress={() => handleDecreaseQuantity(item.id)}
            />
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Button
              icon={<Icon name="add" color="white" size={16} />}
              buttonStyle={styles.quantityButton}
              onPress={() => handleIncreaseQuantity(item.id)}
            />
          </View>
          
          <Text style={styles.totalPrice}>
            Total: ${item.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );

  // Empty cart view
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" type="material" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your shopping cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cart Summary */}
      <Card containerStyle={styles.summaryCard}>
        <Text style={styles.summaryText}>
          Total Items: {totalQuantity}
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.totalText}>
          Total: ${totalAmount.toFixed(2)}
        </Text>
      </Card>

      {/* Cart Items */}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      
      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <Button
          title="Check Out"
          icon={<Icon name="shopping-bag" color="white" />}
          buttonStyle={styles.checkoutButton}
          loading={loading}
          onPress={handleCheckout}
          disabled={items.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 25,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginTop: 20,
  },
  summaryCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#4da6ff',
  },
  summaryText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  divider: {
    backgroundColor: 'white',
    height: 1,
    marginVertical: 8,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    paddingBottom: 80, // Make room for checkout button
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  itemRow: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 15,
    backgroundColor: '#007bff',
  },
  quantity: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 5,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    borderRadius: 30,
    paddingVertical: 12,
  },
});

export default ShoppingCartScreen;