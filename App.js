import React, { useState } from 'react';
import { Image } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import NavSetup from './routes/NavSetup';


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {

  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const load = async () => {
    const imageAssets = cacheImages([
        require('./assets/login-screen-bg.png'),
        require('./assets/mylogo.png')
      ]);

    const fontAssets = cacheFonts([
      FontAwesome.font,
      Ionicons.font,
      {'ShipporiAntique-Regular': require('./assets/fonts/ShipporiAntique-Regular.ttf')},
      {'ShipporiAntiqueB1-Regular': require('./assets/fonts/ShipporiAntiqueB1-Regular.ttf')},
    ]);
    return await Promise.all([...imageAssets, ...fontAssets]);
  }
  
  const handleLoadingError = error => {
    console.warn(error);
  }
  
  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
  }

  if(isLoadingComplete) {
    return (
      <Provider store={store}>
        <NavSetup />
      </Provider>
    );
  }

  return (
    <AppLoading 
      startAsync={load}
      onError={handleLoadingError}
      onFinish={handleFinishLoading}
    />
  );
  
}

