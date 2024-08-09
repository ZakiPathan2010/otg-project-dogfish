// REACT //
import { useRef } from "react";

// REACT NATIVE //
import { StyleSheet } from "react-native";

// PLUGINS //
import { WebView } from "react-native-webview";

// CONTEXTS //
import { useAuthenticationContext } from "@/contexts/Auth.context";

// CONSTANTS //
import Constants from "expo-constants";
import { setDataStorage } from "@/services/storage.service";
import { LocalStorageKeys } from "@/enums/local-storage";

export default function Page() {
  // Define Contexts
  const { loginUser } = useAuthenticationContext();

  // Define Ref's
  const webViewRef = useRef<WebView>(null);

  setDataStorage(LocalStorageKeys.AUTH_TOKEN, '');

  // Helper Functions

  /** This function runs when every Webpage in the Webview Loads */
  const onWebPageLoadEnd = () => {
    // Inject JavaScript to retrieve data from Local Storage
    webViewRef.current?.injectJavaScript(`
       (function() {
        // Get data from Local Storage
        const data = localStorage.getItem('authToken');
        alert(data);
        // If data exists, then send it to Parent React Native
        if(data){
          window.ReactNativeWebView.postMessage(data);
        }
    })();
        `);
  };

  /** This function is called whenever the Webview sends out data */
  const onMessage = (event: any) => {
    // Handle the data received from the WebView
    const token = event.nativeEvent.data;
    // Login the User
    loginUser(token);
  };

  // Use Effects and Use Focus Effects

  return (
    <WebView
      ref={webViewRef}
      style={styles.container}
      source={{ uri: "https://abhayamin.com/otg-keycloak/login.html?v=1.0.0" }}
      onLoadEnd={onWebPageLoadEnd}
      onMessage={onMessage}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    height: "100%",
    width: "100%",
  },
});
