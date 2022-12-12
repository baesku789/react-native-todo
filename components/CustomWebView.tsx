import React from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';

const CustomWebView = () => {
  return (
    <View className={'w-full border-1 border-black h-300'}>
      <WebView source={{uri: 'https://www.naver.com/'}} />
    </View>
  );
};

export default CustomWebView;
