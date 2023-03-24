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
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
  activeColor: '#DE5E69',
  deactiveColor: '#DE5E6950',
  boxActiveColor: '#DE5E6940',
};

/**
 * couleur pour light theme
 */
const light = {
  themeColor: '#FFFFFF',
  white: '#000000',
  sky: '#DE5E69',
  gray: 'gray',
  ...commonColor,
};

/**
 * couleur pour dark theme
 */
const dark = {
  themeColor: '#000000',
  white: '#FFFFFF',
  sky: '#831a23',
  gray: 'white',
  ...commonColor,
};

export default {light, dark};
