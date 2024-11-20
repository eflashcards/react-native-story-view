import React from 'react';
import { GradientBackground } from 'react-native-story-view';
import { GradientProps } from './types';

const Gradient = ({ userStories, story, progressIndex }: GradientProps) => {
  const gradientProps = userStories?.stories?.[progressIndex || 0]?.gradient;
  if (gradientProps) {
    return <GradientBackground {...gradientProps} />;
  }
  return null;
};

export default Gradient;
