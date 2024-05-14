import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { router, Link } from 'expo-router'

import { images } from '../../constants';
 
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { signIn, getCurrentUser } from '../../lib/appwrite';

import { useNavigation } from 'expo-router';

import { useGlobalContext } from '../../context/GlobalProvider';


const SignIn = () => { 
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigation = useNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "")  {
        let errorMessage = "Erreur: Remplit tous les champs";

        if (form.email === "") {
            errorMessage += "\nEmail";
        }
        if (form.password === "") {
            errorMessage += "\nMot de passe";
        }
        Alert.alert(errorMessage);
    }

    setIsSubmitting(true);

    try { 
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert("Success", "User signed in successfully");

      navigation.navigate('/home', { userEmail: form.email });

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
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
          font-psemibold mt-10">Connecter à Vigilance</Text>     

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


export default SignIn