import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router, Link, Stack } from 'expo-router'

import { images } from '../../constants';
 
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignUp = () => { 
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if(!form.email ||!form.password) {
      Alert.alert("Erreur: S'il vous plait remplit tous les champs") 
     }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-[90vh] px-4 my-6">
          <Image source={images.logo} 
            resizeMode='contain' className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-primary-200 
          font-psemibold mt-10">Connecter à Youfa</Text>     

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />     

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-3"
          />   

          <Link href="../recuperate" className="text-lg text-secondary font-psemibold mt-3 text-right">
            Mot de passe oublié</Link>

          <CustomButton 
            title="Se Connecter"
            handlePress={submit}
            containerStyles="mt-3"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-primary-300 font-pregular">Vous 
            n'avez pas de compte?</Text>

            <Link href="/sign-up" className="text-lg font-psemibold
            text-secondary">Inscrivez</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp