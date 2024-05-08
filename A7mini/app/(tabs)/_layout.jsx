import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="justify-center items-center gap-1">
            <Image source={icon}
            resizeMode='contain'
            tintColor={color}
            className="w-6 h-6"    
            />
            <Text className={`${focused ? 'font-psemibold' : 
            'font-pregular'} text-xs`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
      <>
        <Stack>
          <Stack.Screen 
            name="home"
            options={{
              headerShown: false
            }}
          />
        </Stack>
  
        <StatusBar backgroundColor='#161622' style='light' />
      </>
    )
  }

export default TabsLayout