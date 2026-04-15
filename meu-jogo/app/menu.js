import { Stack } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

function BottomNav() {
  const router = useRouter();

  return (
    <View style={{
      flexDirection:'row',
      justifyContent:'space-around',
      padding:15,
      backgroundColor:'#007AFF'
    }}>
      <TouchableOpacity onPress={() => router.push('/galo')}>
        <Text style={{ color:'white' }}>Galo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/quiz')}>
        <Text style={{ color:'white' }}>Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/creditos')}>
        <Text style={{ color:'white' }}>Créditos</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Layout() {
  return (
    <View style={{ flex:1 }}>
      
      {/* Conteúdo das páginas */}
      <View style={{ flex:1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Barra fixa em baixo */}
      <BottomNav />

    </View>
  );
}