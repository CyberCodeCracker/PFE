import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function  App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href='/home' />
  return (
      <SafeAreaView className= "bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center 
          h-full px-4">
            <Image 
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode='contain'
            />

            <Image 
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode='contain'
            />

            <View className="flex mt-5 justify-center">
              <Text className="text-xl text-black font-bold 
              text-center">Détecter Votre Fatigue En Utilisant
              La Puissance De l'IA Avec{' '}
              <Text className="text-secondary-200">Vigilance</Text>
              </Text>

              <Image 
                source={images.path}
                className="flex w-[170px] h-[16px] absolute -bottom-2 
                -right-11"
                resizeMode='contain'
              />
            </View>
              <CustomButton 
                title="Continuez avec Email"
                handlePress={() => router.push('/sign-in')}
                containerStyles="w-full mt-7"
              />
          </View>

          <StatusBar backgroundColor='#161622' style='light' />

        </ScrollView>
      </SafeAreaView>
  );
} 


