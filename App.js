import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from './redux/store';
import AuthRoutes from './routes/AuthRoutes';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Provider>
  );
}

