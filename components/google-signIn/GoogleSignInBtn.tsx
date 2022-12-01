import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {onGoogleButtonPress} from './index';

const GoogleSignInBtn = () => {
  return (
    <GoogleSigninButton
      style={{width: 192, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('sign in with google'))
          .catch(e => console.log(e))
      }
    />
  );
};

export default GoogleSignInBtn;
