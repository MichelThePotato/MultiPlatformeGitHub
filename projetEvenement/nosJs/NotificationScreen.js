import PushNotification from 'react-native-push-notification';
import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const pushNotif = message => {
  PushNotification.createChannel(
    {
      channelId: 'specialid', // (required)
      channelName: 'Special messasge', // (required)
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.localNotification({
    channelId: 'specialid', //his must be same with channelid in createchannel
    title: 'Voici Une Notification',
    message: message,
  });
};

const NotificationScreen = () => {
  return (
    <View>
      <Button title="Notification" onPress={() => pushNotif('yoo')}></Button>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
