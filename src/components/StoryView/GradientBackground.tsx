import React from 'react';
import LinearGradient, {
  type LinearGradientProps,
} from 'react-native-linear-gradient';

const GradientBackground = ({ ...otherProps }: LinearGradientProps) => {
  return <LinearGradient {...otherProps} />;
};

export default GradientBackground;
