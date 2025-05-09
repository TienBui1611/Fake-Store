// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from '@rneui/themed';
import { Icon, Badge } from '@rneui/themed';
import { useSelector } from 'react-redux';

// Screens
import CategoryScreen from './src/screens/CategoryScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Products stack navigator
const ProductsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Category">
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

// Cart badge component
const CartBadge = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  
  return totalQuantity > 0 ? (
    <Badge
      value={totalQuantity}
      status="error"
      containerStyle={{ position: 'absolute', top: -4, right: -4 }}
    />
  ) : null;
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Products" 
        component={ProductsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" type="material" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Shopping Cart" 
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="shopping-cart" type="material" color={color} size={size} />
              <CartBadge />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;