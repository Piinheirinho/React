import { Stack, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useRef, useEffect, useContext } from 'react';
import { NavProvider, NavContext } from './NavContext';

function BottomNav() {
  const router = useRouter();
  const { showNav } = useContext(NavContext);
  const fadeAnim = useRef(new Animated.Value(showNav ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showNav ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [showNav, fadeAnim]);

  if (!showNav) return null;

  return (
    <Animated.View style={{
      opacity: fadeAnim,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      backgroundColor: '#1a1a2e',
      borderTopWidth: 2,
      borderTopColor: '#00a8ff'
    }}>

      <TouchableOpacity onPress={() => router.replace('/galo')}>
        <Text style={{ color: '#00a8ff', fontWeight: 'bold', fontSize: 16 }}>
          Galo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/quiz')}>
        <Text style={{ color: '#00a8ff', fontWeight: 'bold', fontSize: 16 }}>
          Quiz
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/creditos')}>
        <Text style={{ color: '#00a8ff', fontWeight: 'bold', fontSize: 16 }}>
          Créditos
        </Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

function LayoutContent() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0a0e27' }}>

      {/* Ecrãs da app */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Barra fixa em baixo */}
      <BottomNav />

    </View>
  );
}

export default function Layout() {
  return (
    <NavProvider>
      <LayoutContent />
    </NavProvider>
  );
}