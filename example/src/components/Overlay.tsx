import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../theme';
import { OverlayType } from './types';

const Overlay = ({
  item: { link, previewLink = "View More ...", }
}: OverlayType) => {
  if (link) {
    <TouchableOpacity
      style={styles.overlayView}
      onPress={() => {
        if (link) {
          Linking.openURL(link);
        }
      }}>
      <Text style={styles.overlayText}>{previewLink}</Text>
    </TouchableOpacity>;
  }
  return null;
};

export default Overlay;

const styles = StyleSheet.create({
  overlayView: {
    padding: 10,
    backgroundColor: Colors.darkGrey,
    borderRadius: 10
  },
  overlayText: {
    color: Colors.white
  }
});
