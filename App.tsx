import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from "./redux/configureStore"
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <StatusBar />
          </PersistGate>
        </Provider>

      </SafeAreaProvider>
    );
  }
}
