import { View, Text, ScrollView, Image, Alert, StyleSheet,
  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Link, router } from 'expo-router'

import { images } from '../../constants';
 
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite';

const SignUp = () => { 
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    heartRate: ''
  })

  const [gender, setGender] = useState(''); 

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === ""|| form.password === ""|| 
        form.age === "" || form.heartRate === "" || gender === "") {
        let errorMessage = "Erreur: Remplit tous les champs";
        if (!form.username) {
            errorMessage += "\nNom d'utilisateur";
        }
        if (!form.email) {
            errorMessage += "\nEmail";
        }
        if (!form.password) {
            errorMessage += "\nMot de passe";
        }
        if (!form.age) {
            errorMessage += "\nAge";
        }
        if (!form.heartRate) {
            errorMessage += "\nFréquence cardiaque";
        }
        if (!gender) {
            errorMessage += "\nGenre";
        }
        Alert.alert(errorMessage);
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username,
      form.age, form.heartRate, gender);

      router.replace('/home')
    } catch (error) {
      throw new Error(error);
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

        <View className="flex-row justify-between items-center mb-3 mt-3">
          <FormField 
            title="Age"
            value={form.age}
            handleChangeText={(e) => setForm({ ...form, age: e})}
            otherStyles="w-[30%] mr-4"
          />

          <FormField 
            title="Fréquence Cardiaque"
            value={form.heartRate}
            handleChangeText={(e) => setForm({ ...form, heartRate: e})}
            otherStyles="flex-grow ml-4"
          />
        </View>
        
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
            title="S'inscrire"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-lg text-primary-300 
            font-pregular text-center">Avez dèja un compte?</Text>
            <Link href="/home" className="text-lg font-psemibold
            text-secondary text-center ml-1">Connecter</Link>
          </View>
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

export default SignUp