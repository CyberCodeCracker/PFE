import { View, Text } from 'react-native'
import React from 'react'
import RadioButtons from '../../components/RadioButtons'
import { SafeAreaView } from 'react-native-safe-area-context'

const data = () => {
  return (
    <SafeAreaView className="h-full">
      <RadioButtons />
    </SafeAreaView>
  )
}

export default data