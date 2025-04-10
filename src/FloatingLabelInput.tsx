import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  Animated,
  View,
  StyleSheet,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';

interface FloatingLabelInputProps extends TextInputProps {
  label?: string;
  labelColor?: string;
  editable?: boolean;
  borderColor?: string;
  inputFontSize?: number;
  labelFontSize?: number;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  keyboardType,
  multiline = false,
  labelFontSize = 16,
  inputFontSize = 14,
  autoFocus,
  borderColor = '#212529',
  labelColor = '#212529',
  editable = true,
  ...props
}) => {
  const labelPosition = useRef(
    new Animated.Value(value || autoFocus ? 1 : 0)
  ).current;

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
            fontSize: labelFontSize,
            color: labelColor,
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 1],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        keyboardType={keyboardType}
        multiline={multiline}
        editable={editable}
        {...props}
        style={[
          styles.input,
          { borderColor: borderColor, fontSize: inputFontSize },
        ]}
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
    color: '#212529',
    fontWeight: 600,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 6,
    paddingLeft: 6,
  },
});

export default FloatingLabelInput;
