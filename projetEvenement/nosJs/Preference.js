import {StyleSheet, Text, View, Switch, useColorScheme} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useTheme} from '@react-navigation/native';
import RadioButtonRN from 'radio-buttons-react-native';
import Storage, {getColorsPreferences, saveColorsPreferences, setIsEnabledNotifStorage, getIsEnabledNotifStorage} from './Storage';
import Colors from '../theme/Colors';

const Preference = () => {
  // const colors = useTheme().colors;
  // const styles = getStyles(colors);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  const [isEnabledNotif, setIsEnabledNotif] = useState(false);

  const [themeValue, setThemeValue] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();

  const data = [
    {
      label: 'Light Mode',
      value: 'light',
    },
    {
      label: 'Dark Mode',
      value: 'dark',
    },
    {
      label: 'System Default',
      value: 'default',
    },
  ];

  const themeOperations = theme => {
    switch (theme) {
      case 'dark':
        setTheme(theme, false);
        setInitialValue(2);
        return;
      case 'light':
        setTheme(theme, false);
        setInitialValue(1);
        return;
      case 'default':
        setTheme(themes, true);
        setInitialValue(3);
        return;
    }
  };

  const getAppTheme = useCallback(async () => {
    const theme = await getColorsPreferences('Theme');
    const isDefault = await getColorsPreferences('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback(async (theme, isDefault) => {
    saveColorsPreferences('Theme', theme);
    saveColorsPreferences('IsDefault', isDefault);
    setThemeValue(theme);
  }, []);

  useEffect(() => {
    async function loadSwitch() {
      setIsEnabledNotif(await getIsEnabledNotifStorage("isNotifEnabled"));
    }
    loadSwitch();
    getAppTheme();
  }, [getAppTheme]);

  async function toggleSwitchNotification() {
    setIsEnabledNotif(previousStateNotif => !previousStateNotif)
    await setIsEnabledNotifStorage("isNotifEnabled", !isEnabledNotif);
  }

  const styles = getStyles(themeValue);

  return (
    <View style={styles.container}>
      <View style={styles.containerOptions}>
        <Text>Settings</Text>
        <View style={styles.item}>
          <Text style={styles.pourText}>Notification : </Text>
          <Switch onValueChange={toggleSwitchNotification} value={isEnabledNotif}></Switch>
        </View>
        <View style={styles.item}>
          <Text style={styles.pourText}>Dark theme : </Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
        </View>

        <RadioButtonRN
          data={data}
          selectedBtn={e => themeOperations(e?.value)}
          initial={initialValue}
          activeColor={Colors[themeValue]?.activeColor}
          deactiveColor={Colors[themeValue]?.deactiveColor}
          boxActiveBgColor={Colors[themeValue]?.boxActiveColor}
          boxDeactiveBgColor={Colors[themeValue]?.themeColor}
          textColor={Colors[themeValue]?.white}></RadioButtonRN>
      </View>
    </View>
  );
};

export default Preference;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: Colors[theme]?.themeColor,
      flex: 1,
    },
    containerOptions: {
      padding: 10,

      borderRadius: 15,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 15,
      alignItems: 'center',
    },
    pourText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: Colors[theme]?.white,
    },
  });

// const getStyles = colors =>
//   StyleSheet.create({
//     container: {
//       padding: 15,
//     },
//     containerOptions: {
//       padding: 10,
//       backgroundColor: colors.card,
//       borderRadius: 15,
//     },
//     item: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingBottom: 15,
//       alignItems: 'center',
//     },
//     pourText: {
//       fontWeight: 'bold',
//       fontSize: 20,
//       color: colors.text,
//     },
//   });
