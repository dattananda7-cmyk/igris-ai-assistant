import { StyleSheet } from 'react-native';
import { colors, glassStyles } from './colors';
import { typography } from './typography';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  glassCard: glassStyles.glassContainer,
  glassButto: glassStyles.glassButton,
  heading: typography.h1,
  subheading: typography.h3,
  bodyText: typography.body1,
  caption: typography.caption,
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default globalStyles;
