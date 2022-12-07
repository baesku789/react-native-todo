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
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GoogleSignInBtn from './components/google-signIn/GoogleSignInBtn';
import TodoList from './components/TodoList';

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

  const {displayName} = user as FirebaseAuthTypes.User;

  return (
    <AuthContext.Provider value={user}>
      <SafeAreaView className={'p-10 w-screen'}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text style={styles.sectionTitle}>{displayName}님</Text>
        <TodoList />
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
