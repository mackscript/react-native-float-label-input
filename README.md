# react-native-float-label-input

A customizable React Native input component with a floating label animation.

## Installation

```sh
npm install @mackscript/react-native-float-label-input
```

## Usage

```tsx
import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import FloatingLabelInput from '@mackscript/react-native-float-label-input';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView>
      <View style={{ margin: 20 }}>
        <FloatingLabelInput
          label='Full Name'
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <FloatingLabelInput
          label='Email'
          value={formData.email}
          keyboardType='email-address'
          onChangeText={(text) => handleChange('email', text)}
        />
        <FloatingLabelInput
          label='Phone Number'
          value={formData.phone}
          keyboardType='phone-pad'
          onChangeText={(text) => handleChange('phone', text)}
        />
      </View>
    </SafeAreaView>
  );
}
```

## Props

| Prop            | Type                  | Default     | Description                                                                    |
| --------------- | --------------------- | ----------- | ------------------------------------------------------------------------------ |
| `label`         | `string`              | `undefined` | The label text displayed above the input field.                                |
| `labelColor`    | `string`              | `#212529`   | Color of the floating label.                                                   |
| `editable`      | `boolean`             | `true`      | Whether the input is editable.                                                 |
| `borderColor`   | `string`              | `#212529`   | Border color of the input field.                                               |
| `inputFontSize` | `number`              | `14`        | Font size of the input text.                                                   |
| `labelFontSize` | `number`              | `16`        | Font size of the floating label.                                               |
| `multiline`     | `boolean`             | `false`     | Allows multiple lines of input.                                                |
| `keyboardType`  | `KeyboardTypeOptions` | `default`   | Defines the keyboard type (`"default"`, `"numeric"`, `"email-address"`, etc.). |

## Features

- Floating label animation when focusing or typing
- Customizable styles
- Supports different keyboard types
- Supports multiline input

## License

MIT
