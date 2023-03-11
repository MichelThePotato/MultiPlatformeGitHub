import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useCameraDevices, Camera } from 'react-native-vision-camera'

import { CameraRoll } from '@react-native-camera-roll/camera-roll';



const NoCameraFound = () => {
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Text>No camra found</Text>
    </View>;
};

const CameraScreen = () => {
    const camera = useRef(null);

    const devices = useCameraDevices()
    const device = devices.back

    const requestSavePermission = async () => {
        if (Platform.OS !== 'android') return true;

        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        if (permission == null) return false;
        let hasPermission = await PermissionsAndroid.check(permission);
        if (!hasPermission) {
            const permissionRequestResult = await PermissionsAndroid.request(
                permission,
            );
            hasPermission = permissionRequestResult === 'granted';
        }
        return hasPermission;
    };

    const onTakePicture = async () => {
        console.log('on take picture');

        const hasPermission = await requestSavePermission();
        if (!hasPermission) {
            Alert.alert(
                'Permission denied!',
                'Vision Camera does not have permission to save the media to your camera roll.',
            );
            return;
        }
        try {
            // const snapshot = await camera.current.takeSnapshot({
            //   quality: 85,
            //   skipMetadata: true,
            // });
            // console.log(snapshot);
            const photo = await camera.current.takePhoto({
                flash: 'on',
            });

            await CameraRoll.save(`file://${photo.path}`, {
                type: 'photo',
            });
            console.log(photo);
        } catch (e) {
            console.log(e);
        }
    };


    if (device == null) return <NoCameraFound />;

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignContent: 'center' }}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                preset="medium"
                photo={true}
            />
            <Button
                title="Take Picture"
                style={styles.captureButton}
                onPress={onTakePicture}
            />
        </View>
    );
};


export default CameraScreen

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        captureButton: {
            alignSelf: 'center',
            margin: 20,
        },
    });