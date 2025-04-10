import React from 'react';
import { Platform } from 'react-native';
import ListWrapperForMobile from './ListWrapperForMobile';
import ListWrapperForWeb from './ListWrapperForWeb';

export default function CrossPlatformListWrapper(props) {
  if (Platform.OS === 'web') {
    return <ListWrapperForWeb {...props} />;
  } else {
    return <ListWrapperForMobile {...props} />;
  }
}
