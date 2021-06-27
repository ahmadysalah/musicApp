import React from 'react';
import { Input } from 'react-native-elements';

import styles from './style';

const TextInput = ({
  value,
  label,
  placeholder,
  style,
  onChange,
  isSecure,
  type,
  number,
  maxLength,
  ref,
  isError,
  containerStyle,
  disabled,
  onFocus,
  RightIcon,
  LeftIcon,
  numberOfLines,
  multiline,
  onTouch,
  returnKey,
  labelStyle,
  boxStyle,
  submit,
  inputColor = 'white',
  keyboardType,
  autoCompleteType,
}) => (
  <Input
    value={value}
    label={label}
    // type of keyboard will use in the text input
    keyboardType={keyboardType || number ? 'number-pad' : 'default'}
    onChangeText={(newValue) => onChange(newValue)}
    placeholder={placeholder}
    inputContainerStyle={[
      styles.containerStyle,
      containerStyle,
      { marginHorizontal: -18 },
    ]}
    style={[
      styles.inputStyle,
      isError && { borderColor: 'red' },
      { backgroundColor: inputColor },
      style,
    ]}
    textContentType={type}
    labelStyle={[styles.label, { fontFamily: 'NotoSansRegular' }, labelStyle]}
    // this secure for password
    secureTextEntry={isSecure}
    maxLength={maxLength}
    // IOS sometime don't have return in keyboard for old versions
    returnKeyType={returnKey && 'done'}
    // if we want to use ref
    ref={ref}
    // handle left and right icon
    leftIcon={() => LeftIcon && <LeftIcon />}
    rightIcon={() => RightIcon && <RightIcon />}
    disabled={disabled}
    onFocus={onFocus}
    numberOfLines={numberOfLines}
    multiline={multiline || false}
    onTouchStart={onTouch}
    errorMessage={isError}
    errorStyle={styles.error}
    containerStyle={boxStyle}
    onSubmitEditing={submit}
    autoCompleteType={autoCompleteType}
  />
);

export default TextInput;
