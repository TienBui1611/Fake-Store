# 🛒 FakeStore  
A React Native e-commerce application with Redux state management, featuring product browsing, shopping cart functionality, user authentication, and Fake Store API integration.

## 🚀 How to Run This React Native App in VS Code with Android Studio

### ✅ Prerequisites  
Make sure the following are installed on your machine:

- [Node.js 18.x or higher](https://nodejs.org/)  
- [Android Studio](https://developer.android.com/studio)  
- [Visual Studio Code](https://code.visualstudio.com/)  
- [Git](https://git-scm.com/)  
- [Java Development Kit (JDK 11)](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)

---

### 🛠️ Steps to Run the Project

1. **Clone the Repository**  
   ```bash
   git clone <your-repository-url>
   cd Fake-Store
   ```

2. **Open the Project in VS Code**  
   ```bash
   code .
   ```

3. **Install Node.js Dependencies**  
   Run the following command in the VS Code terminal:
   ```bash
   npm install
   ```

4. **Install React Native CLI Globally**  
   ```bash
   npm install -g @react-native-community/cli
   ```

5. **Set Up Android Development Environment**  
   
   **Android Studio Setup:**
   - Install Android Studio with default settings
   - Open Android Studio → `Tools` → `SDK Manager`
   - Install Android SDK (API level 33 or higher)
   - Install Android SDK Build-Tools
   - Install Android Emulator

6. **Configure Environment Variables**  
   Add the following to your system PATH:
   ```bash
   ANDROID_HOME = C:\Users\{username}\AppData\Local\Android\Sdk
   ```
   
   Add to PATH:
   ```bash
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin  
   %ANDROID_HOME%\platform-tools
   ```

7. **Create Android Virtual Device (AVD)**  
   - Open Android Studio
   - Go to `Tools` → `AVD Manager`
   - Click `Create Virtual Device`
   - Choose a device (recommended: Pixel 4)
   - Select system image (Android API 33+)
   - Click `Finish` and start the emulator

8. **Install Recommended VS Code Extensions**  
   Install these extensions for better development experience:
   - **React Native Tools** (Microsoft)
   - **ES7+ React/Redux/React-Native snippets**
   - **Prettier - Code formatter**
   - **ESLint**

9. **Start the Metro Bundler**  
   In VS Code terminal, run:
   ```bash
   npm start
   ```

10. **Run the App on Android**  
    Open a new terminal in VS Code and run:
    ```bash
    npm run android
    ```
    or
    ```bash
    npx react-native run-android
    ```

11. **View the App**  
    The app should automatically open on your Android emulator. If not, you can manually open it from the app drawer.

---

### 🔧 Development Workflow in VS Code with Android Studio

- **Open Terminal:** `Ctrl + `` ` ``
- **Start Metro:** `npm start`
- **Run Android:** `npm run android` (in new terminal)
- **Hot Reload:** Press `R` twice in Metro terminal
- **Reload App:** `Ctrl + M` on Android emulator → `Reload`
- **Debug:** `Ctrl + M` → `Debug` → Chrome DevTools

---

### 📁 Project Structure

```
Fake-Store/
├── 📱 App.js                    # Main app component & navigation
├── 🎯 index.js                  # App entry point
├── 📦 package.json              # Dependencies & scripts
├── 🗂️ src/
│   ├── 📱 screens/              # All app screens
│   │   ├── 🔐 auth/            # Authentication (Sign In/Up)
│   │   ├── 📋 CategoryScreen.js
│   │   ├── 📦 ProductListScreen.js
│   │   ├── 📄 ProductDetailScreen.js
│   │   ├── 🛒 ShoppingCartScreen.js
│   │   ├── 📋 OrdersScreen.js
│   │   ├── 👤 UserProfileScreen.js
│   │   └── 🚀 SplashScreen.js
│   ├── 🏪 redux/               # State management
│   │   ├── 🏬 store.js         # Redux store
│   │   ├── 🔐 authSlice.js     # Authentication state
│   │   ├── 🛒 cartSlice.js     # Shopping cart state
│   │   └── 📋 orderSlice.js    # Orders state
│   ├── 🌐 services/            # API integration
│   │   └── 📡 api.js           # Fake Store API calls
│   └── 🎨 assets/              # Images & static files
└── 📱 android/                  # Android-specific files
```

---

### 🔥 Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android Studio emulator  
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm test` - Run test suite
- `npm run lint` - Check code quality

---

### 🛠️ Troubleshooting

**🚫 Metro bundler port conflict:**
```bash
npx react-native start --reset-cache
```

**🚫 Android build fails:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**🚫 Package installation issues:**
```bash
rm -rf node_modules
npm install
```

**🚫 Android Studio emulator won't start:**
- Enable virtualization in BIOS
- Disable Hyper-V (Windows)
- Increase emulator RAM allocation in AVD Manager
- Restart Android Studio and try again

**🚫 App crashes on startup:**
```bash
npx react-native run-android --reset-cache
```

---

### 🐛 VS Code Debugging Setup

1. Install **React Native Tools** extension
2. Go to `Run and Debug` panel (`Ctrl + Shift + D`)
3. Select "Debug Android" configuration  
4. Set breakpoints in your code
5. Press `F5` to start debugging session

---

### 🌐 API Integration

This app integrates with [Fake Store API](https://fakestoreapi.com/) to provide:
- ✅ Product catalog browsing
- ✅ Category filtering  
- ✅ User authentication simulation
- ✅ Shopping cart management
- ✅ Order history tracking

---

### 🎯 Features

- 🔐 **User Authentication** - Sign in/up with form validation
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- 📱 **Product Catalog** - Browse products with detailed views
- 📋 **Categories** - Filter products by category
- 📦 **Order Management** - View order history
- 👤 **User Profile** - Manage account information
- 🔄 **State Management** - Redux for consistent app state
- 📱 **Responsive Design** - Optimized for mobile devices

---

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

### 📄 License

This project is for educational purposes and learning React Native development.

---

### 🆘 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are properly installed
3. Verify Android emulator is running
4. Check React Native documentation for platform-specific issues
