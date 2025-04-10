import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  Animated,
  View,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  autoFocus,
  ...props
}) => {
  const labelPosition = useRef(
    new Animated.Value(value || autoFocus ? 1 : 0)
  ).current;
  const [isFocused, setIsFocused] = useState(autoFocus || false);

  const animateLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 3],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onFocus={() => animateLabel(1)}
        onBlur={() => !value && animateLabel(0)}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 6,
    color: '#343a40',
    fontWeight: 600,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,

    fontSize: 16,
    paddingLeft: 6,
  },
});

export default FloatingLabelInput;
