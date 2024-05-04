import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const RadioButtons = ({ key, onPress }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female'},
  ];

  const handleSelectionOption = (optionId) => {
    setSelectedOption(optionId);
  }

  return (
    <View className="flex-1 justify-center items-center">
      {options.map((option) => {
        <TouchableOpacity
          key={option.id}
          onPress={() => handleSelectionOption(option.id)}
        >
          <View className={`h-6 w-6 rounded-full border-2 mr-2
            ${selectedOption === option.id? 'border-blue-500': 'border-gray-400'}`
          }>
            {selectedOption === option.id && (
              <View className="h-3 w-3 bg-blue-500 rounded-full"/>
            )}
          </View>

          <Text className="text-base">{option.label}</Text>
        </TouchableOpacity>
      })}
    </View>
  )
}

export default RadioButtons