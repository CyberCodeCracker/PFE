import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, 
  handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTextChange = (text) => {
    // If the title is 'Age' or 'Fréquence Cardiaque', validate that the input is a valid integer
    if ((title === 'Age' || title === 'Fréquence Cardiaque') && text.trim() !== '') {
      const intValue = parseInt(text);
      if (!isNaN(intValue)) {
        handleChangeText(intValue.toString());
      }
    } else {
      handleChangeText(text);
    }
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xl text-primary-300 text-pmedium">
        {title}</Text>
        
        <View className="flex-row w-full h-16 px-4 bg-primary-100 
        border-2 border-black-200 rounded-2xl items-center
        focus:border-secondary">
          <TextInput 
            className="flex-1 text-black font-psemibold text-base"
            value={(title === 'Age' || title === 'Fréquence Cardiaque') ? value.toString() : value}
            placeholder={placeholder}
            placeholderTextColor="#b7b78b"
            onChangeText={(text) => handleChangeText(title === 'Age' || title === 'Fréquence Cardiaque' ? parseInt(text.replace(/[^0-9]/g, ''), 10) : text)}
            keyboardType={(title === 'Age' || title === 'Fréquence Cardiaque') ? 
            'numeric' : 'default'} 
            secureTextEntry={title === 'Password' && !showPassword}
          />

          {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-7 h-7 "
              resizeMode='contain'/>
            </TouchableOpacity>
          )}

          {title === 'Fréquence Cardiaque' && (
            <Image source={icons.heartRate}
              className="w-7 h-7 absolute  right-2"
              resizeMode='contain'
            />
          )}
        </View>
    </View>
  )
}

export default FormField
