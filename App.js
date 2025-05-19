// App.js (updated)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { ThemeProvider } from '@rneui/themed';
import { Icon, Badge } from '@rneui/themed';
import { View, Alert } from 'react-native';
import { useSelector } from 'react-redux';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();

// Auth navigator (Sign In / Sign Up)
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

// Products stack navigator
const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator initialRouteName="Category">
      <ProductsStack.Screen name="Category" component={CategoryScreen} />
      <ProductsStack.Screen name="ProductList" component={ProductListScreen} />
      <ProductsStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </ProductsStack.Navigator>
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

// Orders badge component
const OrdersBadge = () => {
  const newOrdersCount = useSelector(state => state.orders.newOrdersCount);

  return newOrdersCount > 0 ? (
    <Badge
      value={newOrdersCount}
      status="error"
      containerStyle={{ position: 'absolute', top: -4, right: -4 }}
    />
  ) : null;
};

// Tab Navigator
const TabNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleAuthPrompt = () => {
    Alert.alert(
      'Authentication Required',
      'Please sign in to access this feature',
      [{ text: 'OK' }]
    );
  };

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
        component={ProductsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-bag" type="material" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              handleAuthPrompt();
            }
          },
        })}
      />
      <Tab.Screen
        name="My Cart"
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="shopping-cart" type="material" color={color} size={size} />
              <CartBadge />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              handleAuthPrompt();
            }
          },
        })}
      />
      <Tab.Screen
        name="My Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="receipt" type="material" color={color} size={size} />
              <OrdersBadge />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              handleAuthPrompt();
            }
          },
        })}
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" type="material" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              handleAuthPrompt();
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

// Main App component with redux wrapper
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;