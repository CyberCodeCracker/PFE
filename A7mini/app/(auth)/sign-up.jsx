import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Link } from 'expo-router'

import { images } from '../../constants';
 
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite';

const SignIn = () => { 
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    if(!form.username || form.email ||!form.password) {
     Alert.alert('Error', 'Please fill in all the fields') 
    }

    setIsSubmitting(true);

    try {

    } catch (error) {
      Alert.alert('Error', error.message)
    }

    createUser();
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-[90vh] px-4 my-6">
          <Image source={images.logo} 
            resizeMode='contain' className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-primary-200 
          font-psemibold mt-10">Inscrivez à Youfa</Text>     

          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e})}
            otherStyles="mt-7"
          /> 

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-3"
            keyboardType="email-address"
          />     

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-3"
          />   

          <CustomButton 
            title="S'inscrire"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-column">
            <Text className="text-lg text-primary-300 
            font-pregular text-center">Vous avez dèja un compte?</Text>
            <Link href="/data" className="text-lg font-psemibold
            text-secondary text-center">Se Connecter</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn