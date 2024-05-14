import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';

import CustomButton from '../../components/CustomButton';

import { useRoute } from '@react-navigation/native';

const home = () => {
  const [showContent, setShowContent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [blinkingCounter, setBlinkingCounter] = useState(0)
  
  const [yawnCounter, setYawnCounter] = useState(0)

  useEffect(() => {
    // Replace 'YOUR_COMPUTER_IP' with your computer's local IP address
    const ws = new WebSocket('ws://192.168.1.149:8766');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (e) => {
      // Parse the received JSON data
      const data = JSON.parse(e.data);
      setBlinkingCounter(data.clignement);
      setYawnCounter(data.nb_baillements);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket closed', e.code, e.reason);
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close;
      }
    };
  }, []);

  const route = useRoute();
  const userEmail = route.params?.userEmail || 'No email';

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
              <Text className="text-lg text-primary-300 font-psemibold">Clignement {"(en min)"}:{' '}{blinkingCounter}</Text>
              <Text className="text-lg text-primary-300 font-psemibold">Baillement {"(en min)"}:{' '}{yawnCounter}</Text>
              <Text className="text-lg text-primary-300 font-psemibold">Fréquence Cardiaque {"(bpm)"}:{' '}0</Text>
              <Text>{userEmail}</Text>
            </View>
          )}
    </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default home