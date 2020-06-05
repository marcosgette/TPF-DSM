import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {    
    borderBottomWidth: 15,
    borderColor: '#caf0f8'
  }
};

export default Card;
