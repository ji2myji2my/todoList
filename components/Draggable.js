// Draggable.js
import React from 'react';
import { Platform } from 'react-native';

import DraggableForMobile from './DraggableForMobile';
import DraggableForWeb from './DraggableForWeb';

const Draggable = (props) => {
  if (Platform.OS === 'web') {
    return <DraggableForWeb {...props} />;
  } else {
    return <DraggableForMobile {...props} />;
  }
};

export default Draggable;
