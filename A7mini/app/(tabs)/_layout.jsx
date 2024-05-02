import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';

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
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 60,
                }
            }}
        >
            <Tabs.Screen 
            name="home"
            options={{
                title: 'Acceuil',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon 
                        icon={icons.home}
                        color={color}
                        name="Acceuil"
                        focused={focused}
                    />
                )
            }}
            />
            <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                    <TabIcon 
                        icon={icons.profile}
                        color={color}
                        name="Profile"
                        focused={focused}
                    />
                )
            }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout