import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const data = () => {
  const [form, setForm] = useState({
    age: null,
    heartRate: null
  })

  const [gender, setGender] = useState(''); 
  return (
  <SafeAreaView className="h-full bg-primary">
    <ScrollView>
      <View className="w-full justify-center px-4 my-6">
        <Image 
          source={images.logo}
          className="w-[115px] h-[35px] mr-2"
          resizeMode='contain'
        />

        <Text className="text-2xl font-psemibold 
        text-primary-200 mt-10">Profil</Text>

        <FormField 
          title="Age"
          value={form.age}
          handleAgeChangeText={(e) => setForm({ ...form, age: e})}
          otherStyles="mt-7 w-[70%]"
        />

        <FormField 
          title="Fréquence Cardiaque"
          value={form.heartRate}
          handleAgeChangeText={(e) => setForm({ ...form, heartRate: e})}
          otherStyles="mt-7 w-[70%] mb-10"
        />
        
        <View className="flex-row gap-2">
            <Text className="text-xl text-primary-300 text-pmedium">Gender:{' '}</Text>

            {['Male', 'Femelle'].map(item => (
              <View key={item} style={styles.genders}>
                <TouchableOpacity 
                  style={styles.outter}
                  onPress={() => setGender(item)}>
                  {gender === item &&
                    <View style={styles.inner}></View>
                  }
                </TouchableOpacity>
                <Text className="text-lg text-black ml-1">{item}</Text>
              </View>
            ))}
          </View>
          <CustomButton 
            title="Se Connecter"
            handlePress={submit}
            containerStyles="mt-3"
            isLoading={isSubmitting}
          />
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  genders: {
    marginHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 12,
    height: 12,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default data