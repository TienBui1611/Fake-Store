# 🛒 FakeStore

<div align="center">
  <img src="src/assets/fake-store-logo.png" alt="FakeStore Logo" width="200"/>
  <br></br>

  ![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)
  ![Redux](https://img.shields.io/badge/Redux-Toolkit-purple.svg)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
</div>

---

## 📱 About

FakeStore is a full-featured e-commerce mobile application built with React Native and Redux state management. The app provides a seamless shopping experience with product browsing, cart management, user authentication, and order tracking functionality, all powered by the Fake Store API.

## ✨ Features

- 🔐 **User Authentication** - Sign up, sign in, and profile management
- 🛍️ **Product Catalog** - Browse products by categories with detailed views
- 🛒 **Shopping Cart** - Add, remove, and manage items in your cart
- 📦 **Order Management** - Track your orders and purchase history
- 🎨 **Modern UI** - Clean and intuitive user interface
- 🔄 **Redux State Management** - Centralized state management for optimal performance
- 📱 **Cross-Platform** - Works on both Android and iOS

## 🏗️ Project Structure

```
Fake-Store-App/
├── App.js                      # Main app component
├── index.js                    # App entry point
├── package.json                # Dependencies and scripts
├── assets/                     # App assets (icons, splash screens)
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── splash-icon.png
│   └── images/
│       └── splash-logo.png
└── src/                        # Source code
    ├── assets/                 # App-specific assets
    │   └── fake-store-logo.png
    ├── redux/                  # Redux store and slices
    │   ├── store.js           # Redux store configuration
    │   ├── authSlice.js       # Authentication state management
    │   ├── cartSlice.js       # Shopping cart state management
    │   └── orderSlice.js      # Order management state
    ├── screens/                # App screens/pages
    │   ├── auth/              # Authentication screens
    │   │   ├── SignInScreen.js
    │   │   └── SignUpScreen.js
    │   ├── SplashScreen.js    # App loading screen
    │   ├── CategoryScreen.js  # Product categories
    │   ├── ProductListScreen.js # Product listings
    │   ├── ProductDetailScreen.js # Product details
    │   ├── ShoppingCartScreen.js # Shopping cart
    │   ├── OrdersScreen.js    # Order history
    │   └── UserProfileScreen.js # User profile
    └── services/               # API services
        └── api.js             # API configuration and endpoints
```

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- [Node.js 18.x or higher](https://nodejs.org/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development - macOS only)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)
- [Git](https://git-scm.com/)

### 🛠️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd Fake-Store-App
   ```

2. **Install Dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install React Native CLI** (if not already installed)

   ```bash
   npm install -g @react-native-community/cli
   ```

4. **Set Up Development Environment**

   **For Android:**
   - Install Android Studio with default settings
   - Add Android Studio to your system PATH
   - Open Android Studio → `Tools` → `SDK Manager`
   - Install Android SDK (API level 33 or higher)
   - Install Android SDK Build-Tools and Android Emulator

5. **Set Up Virtual Device**

   **Android AVD:**
   - Open Android Studio → `Tools` → `AVD Manager`
   - Create a new Virtual Device (recommended: Pixel 4)
   - Select Android API 33+ system image
   - Start the emulator

### 🗄️ Backend Setup

1. **Clone and Set Up Backend Server**

   ```bash
   git clone https://github.com/LarryAtGU/fake-store-server
   cd fake-store-server
   npm install
   ```

2. **Start Backend Server**

   ```bash
   npm start
   ```

   > The server will run on `http://localhost:3000`

### 🏃 Running the App

1. **Start Metro Bundler**

   ```bash
   npm start
   ```

2. **Run on Android**

   ```bash
   # Press 'a' in the Metro terminal
   ```

## 🛠️ Built With

- **[React Native](https://reactnative.dev/)** - Mobile app framework
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management
- **[React Navigation](https://reactnavigation.org/)** - Navigation library
- **[Fake Store API](https://fakestoreapi.com/)** - Mock e-commerce API
