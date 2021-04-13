import {PermissionsAndroid} from 'react-native';

const permission =  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(permission);

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return err;
  }
};

export {requestPermission};
