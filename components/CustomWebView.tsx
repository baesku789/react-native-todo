import React from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';

interface NewNavState {
  url?: string;
  title?: string;
  loading?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

const CustomWebView = () => {
  let webview = null;

  const handleWebViewNavigationStateChange = ({url}: NewNavState) => {
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      webview.stopLoading();
    }
  };

  return (
    <View className={'w-full border-1 border-black h-300'}>
      <WebView
        ref={ref => (webview = ref)}
        source={{uri: 'https://www.naver.com/'}}
        onNavigationStateChange={handleWebViewNavigationStateChange}
      />
    </View>
  );
};

export default CustomWebView;
