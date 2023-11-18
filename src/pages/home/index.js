import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  const handleLogoPress = () => {
    navigation.navigate('Inicial'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFE082' }}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Image source={require("../../assets/logo2.png")} style={{ width: 250, height: 200 }} />
      </TouchableOpacity>
    </View>
  );
}
