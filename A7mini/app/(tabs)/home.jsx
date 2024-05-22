import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { useRoute } from '@react-navigation/native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '../../lib/appwrite';

const Home = () => {
  const [showContent, setShowContent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blinkingCounter, setBlinkingCounter] = useState(0);
  const [yawnCounter, setYawnCounter] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [healthState, setHealthState] = useState('Unknown');
  const [assoupissementCounter, setAssoupissementCounter] = useState(0);
  const [isAssoupissementProlongé, setIsAssoupissementProlongé] = useState(false);
  const [isBuzzing, setIsBuzzing] = useState(true);
  const [manualOverride, setManualOverride] = useState(false);

  const { user, signOut, isLoading } = useGlobalContext();

  const evaluateDriverHealth = (age, heartRate, gender) => {
    let healthState = 'Unknown'; // Default state
    if (gender === 'FEMALE') {
      if (age >= 18 && age <= 25) {
        if (heartRate >= 61 && heartRate <= 65) healthState = 'Excellente';
        else if (heartRate >= 66 && heartRate <= 69) healthState = 'Bonne';
        else if (heartRate >= 74 && heartRate <= 78) healthState = 'Normale';
        else if (heartRate >= 79 && heartRate <= 84) healthState = 'Moins bonne';
        else if (heartRate >= 85) healthState = 'Mauvaise';
      } else if (age >= 26 && age <= 35) {
        // Add additional conditions if needed
      }
    } else if (gender === 'MALE') {
      if (age >= 18 && age <= 25) {
        if (heartRate >= 56 && heartRate <= 61) healthState = 'Excellente';
        else if (heartRate >= 62 && heartRate <= 65) healthState = 'Bonne';
        else if (heartRate >= 70 && heartRate <= 73) healthState = 'Normale';
        else if (heartRate >= 74 && heartRate <= 81) healthState = 'Moins bonne';
        else if (heartRate >= 82) healthState = 'Mauvaise';
      }
      // Add additional conditions if needed
    }

    return healthState;
  };

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.1.19:8766');

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
      setIsConnected(true);
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.nb_assoupissement !== undefined) {
        setAssoupissementCounter(data.nb_assoupissement);
      }
      if (data.assoupissement_prolongé !== undefined) {
        setIsAssoupissementProlongé(data.assoupissement_prolongé);
      }
      if (data.buzzer_state !== undefined) {
        setIsBuzzing(data.buzzer_state); // Update buzzer state based on server response
      }
      if (data.buzzer_manual_override !== undefined) {
        setManualOverride(data.buzzer_manual_override);
      }
      if (data.status === 'Detection started') {
        Alert.alert('Success', 'Detection has started');
      }
      if (data.error) {
        Alert.alert('Error', data.error);
      }
    };

    ws.current.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    ws.current.onclose = (e) => {
      console.log('WebSocket closed', e.code, e.reason);
      setIsConnected(false);
      setAssoupissementCounter(0);
      setIsAssoupissementProlongé(false);
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const startDetection = () => {
      setShowContent(false);
  };

  const turnOffBuzzer = () => {
    const message = JSON.stringify({ command: 'turn_off_buzzer' });
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
      setIsBuzzing(false); // Update the local state to reflect the buzzer is off
      setManualOverride(true); // Update local state to reflect manual override
    }
  };

  const resetAssoupissement = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ command: 'reset_assoupissement' });
      ws.current.send(message);
      setAssoupissementCounter(0); // Reset the counter locally
    }
  };

  const resetAssoupissementProlongé = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ command: 'reset_assoupissement_prolongé' });
      ws.current.send(message);
      setIsAssoupissementProlongé(false);
    }
  };

  const route = useRoute();
  const userEmail = route.params?.userEmail || 'No email';
  const userAge = route.params?.userAge || 'No age';

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-[90vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
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
                <Text className="text-lg text-primary-300 font-psemibold">
                  Assoupissement (en min): {assoupissementCounter}
                </Text>
                <Text className="text-lg text-primary-300 font-psemibold">
                  Clignement (en min): 0
                </Text>
                <Text className="text-lg text-primary-300 font-psemibold">
                  Fréquence Cardiaque (bpm): 0
                </Text>
                <Text className="text-lg text-primary-300 font-psemibold">
                  Email: {user?.email || 'No email'}
                </Text>
                <Text className="text-lg text-primary-300 font-psemibold">
                  Age: {user?.age || 'No age'}
                </Text>
                <Text className="text-lg text-primary-300 font-psemibold">
                  Etat du coeur: {healthState}
                </Text>
                {(assoupissementCounter >= 5 || isAssoupissementProlongé) && (
                  <CustomButton
                    title="Arrêter l'alarme"
                    handlePress={() => {
                      turnOffBuzzer();
                      resetAssoupissement();
                      resetAssoupissementProlongé();
                    }}
                    isLoading={false}
                    containerStyles="w-full items-center justify-center"
                  />
                )}
                  <CustomButton
                    title="Sign Out"
                    handlePress={signOut}
                    containerStyles="w-full items-center justify-center"
                  />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
