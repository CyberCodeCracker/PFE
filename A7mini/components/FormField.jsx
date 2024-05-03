import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, 
  handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xl text-primary-300 text-pmedium">
        {title}</Text>
        
        <View className="flex-row w-full h-16 px-4 bg-primary-100 
        border-2 border-black-200 rounded-2xl
        focus:border-secondary items-center">
          <TextInput 
            className="flex-1 text-black font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#b7b78b"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
          />

          {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-7 h-7 "
              resizeMode='contain'/>
            </TouchableOpacity>
          )}
        </View>
    </View>
  )
}

export default FormField