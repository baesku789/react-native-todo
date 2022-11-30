import {Button} from 'react-native';
import {onGoogleButtonPress} from './index';

const GoogleSignInBtn = () => {
  return (
    <Button
      title={'Google Sign-In'}
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Sign in with Google'))
      }
    />
  );
};

export default GoogleSignInBtn;
