import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Creditos() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27' }}>

      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => router.push('/')}
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

      <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>© 2026 - O teu nome</Text>
    </View>
  );
}