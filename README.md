# 🛒 FakeStore  

A React Native e-commerce application with Redux state management, featuring product browsing, shopping cart functionality, user authentication, and Fake Store API integration.

## 🚀 How to Run This React Native App in VS Code with Android Studio

### ✅ Prerequisites  

Make sure the following are installed on your machine:

- [Node.js 18.x or higher](https://nodejs.org/)  
- [Android Studio](https://developer.android.com/studio)  
- [Visual Studio Code](https://code.visualstudio.com/)  
- [Git](https://git-scm.com/)

---

### 🛠️ Steps to Run the Project

1. **Open the Project in VS Code**  

2. **Install Node.js Dependencies**  
   Run the following command in the VS Code terminal:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install React Native CLI Globally**  

   ```bash
   npm install -g @react-native-community/cli
   ```

4. **Set Up Android Development Environment**  

   **Android Studio Setup:**
   - Install Android Studio with default settings, adding it to your system PATH (check the relevant checkbox)
   - Open Android Studio → `Tools` → `SDK Manager`
   - Install Android SDK (API level 33 or higher)
   - Install Android SDK Build-Tools
   - Install Android Emulator``

5. **Create Android Virtual Device (AVD)**  
   - Open Android Studio
   - Go to `Tools` → `AVD Manager`
   - Click `Create Virtual Device`
   - Choose a device (recommended: Pixel 4)
   - Select system image (Android API 33+)
   - Click `Finish` and start the emulator

6. **Install the backend API server**  

   ```bash
   git clone https://github.com/LarryAtGU/fake-store-server
   ```

7. **Go directly to that server**  

   ```bash
   cd fake-store-server
   ```

8. **Install Node.js Dependencies**  

   ```bash
   npm install
   ```

9. **Start the backend API server**  

   ```bash
   npm start
   ```

10. **Run the App on Android**  
    Open a new terminal in VS Code and run:

    ```bash
    npm start
    ```

    and then click on `a`
