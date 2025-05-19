// src/screens/OrdersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Button, Icon, Divider } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrder } from '../redux/orderSlice';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orders);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handlePay = async (orderId) => {
    const resultAction = await dispatch(updateOrder({
      orderID: orderId,
      isPaid: 1,
      isDelivered: 0
    }));
    
    if (updateOrder.fulfilled.match(resultAction)) {
      Alert.alert('Success', 'Order has been marked as paid');
    } else {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const handleReceive = async (orderId) => {
    const resultAction = await dispatch(updateOrder({
      orderID: orderId,
      isPaid: 1,
      isDelivered: 1
    }));
    
    if (updateOrder.fulfilled.match(resultAction)) {
      Alert.alert('Success', 'Order has been marked as delivered');
    } else {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  // Group orders by status
  const newOrders = orders.filter(order => order.is_paid === 0 && order.is_delivered === 0);
  const paidOrders = orders.filter(order => order.is_paid === 1 && order.is_delivered === 0);
  const deliveredOrders = orders.filter(order => order.is_delivered === 1);

  const renderOrderSection = (title, orderList, status) => {
    if (orderList.length === 0) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleExpand(`section_${status}`)}
        >
          <Text style={styles.sectionTitle}>{title}: {orderList.length}</Text>
          <Icon 
            name={expandedOrders[`section_${status}`] ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            type="material" 
            color="#007bff" 
          />
        </TouchableOpacity>

        {expandedOrders[`section_${status}`] && (
          <FlatList
            data={orderList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => renderOrderItem(item, status)}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    );
  };

  const renderOrderItem = (order, status) => {
    const isExpanded = expandedOrders[order.id];

    return (
      <Card containerStyle={styles.orderCard}>
        <TouchableOpacity
          style={styles.orderHeader}
          onPress={() => toggleExpand(order.id)}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.orderInfoText}>Order ID: {order.id}</Text>
            <Text style={styles.orderInfoText}>Items: {order.item_numbers}</Text>
            <Text style={styles.orderInfoText}>Total: ${order.total_price.toFixed(2)}</Text>
          </View>
          <Icon 
            name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            type="material" 
            color="#007bff" 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.orderDetails}>
            <Divider style={styles.divider} />
            
            {order.order_items.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.itemText}>Product ID: {item.prodID}</Text>
                <Text style={styles.itemText}>Price: ${item.price}</Text>
                <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
              </View>
            ))}
            
            {status === 'new' && (
              <Button
                title="Pay"
                icon={<Icon name="payment" color="white" size={16} />}
                buttonStyle={styles.payButton}
                onPress={() => handlePay(order.id)}
              />
            )}
            
            {status === 'paid' && (
              <Button
                title="Receive"
                icon={<Icon name="check-circle" color="white" size={16} />}
                buttonStyle={styles.receiveButton}
                onPress={() => handleReceive(order.id)}
              />
            )}
          </View>
        )}
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>You don't have any orders yet</Text>
        <Button
          title="Refresh"
          icon={<Icon name="refresh" color="white" />}
          onPress={() => dispatch(fetchOrders())}
          buttonStyle={styles.refreshButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      
      {renderOrderSection('New Orders', newOrders, 'new')}
      {renderOrderSection('Paid Orders', paidOrders, 'paid')}
      {renderOrderSection('Delivered Orders', deliveredOrders, 'delivered')}
      
      <Button
        title="Refresh Orders"
        icon={<Icon name="refresh" color="white" />}
        onPress={() => dispatch(fetchOrders())}
        buttonStyle={styles.refreshButton}
        containerStyle={styles.refreshButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4da6ff',
    textAlign: 'center',
    marginVertical: 15,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  listContainer: {
    paddingBottom: 10,
  },
  orderCard: {
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 8,
    padding: 0,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderInfoText: {
    fontSize: 15,
    marginBottom: 3,
  },
  orderDetails: {
    padding: 15,
  },
  divider: {
    marginVertical: 10,
  },
  orderItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
  },
  payButton: {
    backgroundColor: '#28a745',
    borderRadius: 30,
    marginTop: 10,
  },
  receiveButton: {
    backgroundColor: '#17a2b8',
    borderRadius: 30,
    marginTop: 10,
  },
  refreshButton: {
    backgroundColor: '#007bff',
    borderRadius: 30,
  },
  refreshButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default OrdersScreen;