import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';

import CustomButton from '../../components/CustomButton';


const home = () => {
  const [showContent, setShowContent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startDetection = () => {
    setShowContent(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-[90vh] px-4 my-6">
          <Image source={images.logo} 
            resizeMode='contain' className="w-[115px] h-[35px]"
          />

        <View className="flex-1 items-center justify-center w-full">
          {showContent ? (
            <CustomButton 
              title="Démarrer la détection"
              handlePress={startDetection}
              isLoading={isSubmitting}
              containerStyles="w-full"
            />
          ) : (
            <View className="flex-column gap-6">
              <Text className="text-lg text-primary-300 font-psemibold">Assoupissement {"(en min)"}:{' '}0</Text>
              <Text className="text-lg text-primary-300 font-psemibold">Clignement {"(en min)"}:{' '}0</Text>
              <Text className="text-lg text-primary-300 font-psemibold">Baillement {"(en min)"}:{' '}0</Text>
              <Text className="text-lg text-primary-300 font-psemibold">Fréquence Cardiaque {"(bpm)"}:{' '}0</Text>
            </View>
          )}
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default home