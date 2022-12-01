import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();
  console.log(`idToken ${idToken}`);

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  console.log(`googleCredential ${googleCredential}`);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};
