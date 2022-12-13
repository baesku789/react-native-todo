/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createContext, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GoogleSignInBtn from './components/google-signIn/GoogleSignInBtn';
import TodoContainer from './components/todo/TodoContainer';
import {WebView} from 'react-native-webview';
import CustomWebView from './components/CustomWebView';

export const AuthContext = createContext<FirebaseAuthTypes.User | null>(null);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      '1023915973562-gk908j36kp5atn21t9s8r5ut986oktu5.apps.googleusercontent.com',
  });

  const onAuthStateChanged = useCallback(
    user => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView>
        <GoogleSignInBtn />
      </SafeAreaView>
    );
  }

  const {email} = user as FirebaseAuthTypes.User;

  return (
    <AuthContext.Provider value={user}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View className={'p-20 w-screen'}>
          <Text className={'text-20'}>{email}님</Text>
          <TodoContainer />
        </View>
        {/*<View className={'mt-100'}>*/}
        {/*  <CustomWebView />*/}
        {/*</View>*/}
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

export default App;
