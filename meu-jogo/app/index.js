import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { NavContext } from './NavContext';

export default function Home() {
  const router = useRouter();
  const { setShowNav, showLogo, setShowLogo } = useContext(NavContext);

  const handleLogoPress = () => {
    setShowLogo(false);
    setShowNav(true);
  };

  const handleBackToLogo = () => {
    setShowLogo(true);
    setShowNav(false);
  };

  if (!showLogo) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27' }}>
        
        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={handleBackToLogo}
          style={{
            position: 'absolute',
            top: 15,
            left: 15,
            backgroundColor: '#1a1a2e',
            borderWidth: 2,
            borderColor: '#00a8ff',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8
          }}
        >
          <Text style={{ color: '#00a8ff', fontSize: 20, fontWeight: 'bold' }}>←</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 20, color: '#00a8ff', fontWeight: 'bold' }}>Bem-vindo!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27' }}>
      
      <TouchableOpacity onPress={handleLogoPress}>
        <Image 
          source={require('../assets/images/react-logo.png')}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text style={{ marginTop: 20, color: '#ffffff', fontSize: 16 }}>Clica na logo</Text>
    </View>
  );
}