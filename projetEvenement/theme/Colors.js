// export const colors = {
//   light: {
//     themeColor: '#FFFFFF',
//     white: '#000000',
//     sky: '#DE5E69',
//     gray: 'gray',
//     ...commonColor,
//   },
// };

/**
 * couleurs en commun avec light et dark theme
 */
const commonColor = {
  colors: {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    activeColor: '#DE5E69',
    deactiveColor: '#DE5E6950',
    boxActiveColor: '#DE5E6940',
  },
};

/**
 * couleur pour light theme
 */
const light = {
  colors: {
    themeColor: '#FFFFFF',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    ...commonColor.colors,
  },
};

/**
 * couleur pour dark theme
 */
const dark = {
  colors: {
    themeColor: '#000000',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    ...commonColor.colors,
  },
};

export default {light, dark};
