import {PermissionsAndroid} from 'react-native';
const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return err;
  }
};

export {requestPermission};
