import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const PermissionScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (requestCameraPermission) navigation.navigate('CameraScreen');
  }, []);

  return (
    <View>
      <Text>PermissionScreen</Text>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({});
