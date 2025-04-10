import React, { useState } from 'react';
import { TextInput, Animated, View, Text, StyleSheet } from 'react-native';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 6],
            }),
            fontSize: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', marginVertical: 12 },
  label: { position: 'absolute', left: 8, color: '#999' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingTop: 20,
    fontSize: 16,
  },
});

export default FloatingLabelInput;
