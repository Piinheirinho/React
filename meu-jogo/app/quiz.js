import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const perguntas = [
  {
    pergunta: "Qual é a capital de Portugal?",
    opcoes: ["Porto", "Lisboa", "Coimbra", "Braga"],
    correta: 1
  },
  {
    pergunta: "Quantas distritos tem Portugal?",
    opcoes: ["18", "20", "22", "16"],
    correta: 0
  },
  {
    pergunta: "Qual é o maior rio de Portugal?",
    opcoes: ["Tejo", "Douro", "Mondego", "Sado"],
    correta: 0
  },
  {
    pergunta: "Em que ano Portugal foi fundado?",
    opcoes: ["1143", "1200", "1385", "1492"],
    correta: 0
  },
  {
    pergunta: "Quem foi o primeiro rei de Portugal?",
    opcoes: ["D. João I", "D. Afonso Henriques", "D. Manuel I", "D. Pedro I"],
    correta: 1
  },
  {
    pergunta: "Qual é a moeda antiga de Portugal?",
    opcoes: ["Euro", "Escudo", "Real", "Dólar"],
    correta: 1
  },
  {
    pergunta: "Qual é a cidade do fado?",
    opcoes: ["Porto", "Lisboa", "Faro", "Aveiro"],
    correta: 1
  },
  {
    pergunta: "Qual oceano banha Portugal?",
    opcoes: ["Índico", "Atlântico", "Pacífico", "Ártico"],
    correta: 1
  },
  {
    pergunta: "Qual é o prato típico português?",
    opcoes: ["Paella", "Bacalhau", "Sushi", "Pizza"],
    correta: 1
  },
  {
    pergunta: "Onde fica o estádio do Dragão?",
    opcoes: ["Lisboa", "Porto", "Braga", "Faro"],
    correta: 1
  },
  {
    pergunta: "Qual é a língua oficial de Portugal?",
    opcoes: ["Espanhol", "Português", "Francês", "Inglês"],
    correta: 1
  },
  {
    pergunta: "Qual é a ilha mais famosa dos Açores?",
    opcoes: ["São Miguel", "Madeira", "Porto Santo", "Terceira"],
    correta: 0
  },
  {
    pergunta: "Qual é o símbolo de Portugal?",
    opcoes: ["Leão", "Galo de Barcelos", "Águia", "Dragão"],
    correta: 1
  },
  {
    pergunta: "Qual é o clube mais titulado de Portugal?",
    opcoes: ["Benfica", "Porto", "Sporting", "Braga"],
    correta: 0
  },
  {
    pergunta: "Qual é a ponte mais famosa de Lisboa?",
    opcoes: ["25 de Abril", "Vasco da Gama", "Arrábida", "Freixo"],
    correta: 0
  },
  {
    pergunta: "Qual é o desporto mais popular em Portugal?",
    opcoes: ["Futebol", "Basquetebol", "Ténis", "Andebol"],
    correta: 0
  },
  {
    pergunta: "Qual é o ponto mais alto de Portugal?",
    opcoes: ["Serra da Estrela", "Sintra", "Gerês", "Arrábida"],
    correta: 0
  },
  {
    pergunta: "Qual é a cidade universitária mais famosa?",
    opcoes: ["Coimbra", "Lisboa", "Porto", "Faro"],
    correta: 0
  },
  {
    pergunta: "Quem descobriu o caminho marítimo para a Índia?",
    opcoes: ["Vasco da Gama", "Cristóvão Colombo", "Magalhães", "Cabral"],
    correta: 0
  },
  {
    pergunta: "Qual é o doce típico de Portugal?",
    opcoes: ["Pastel de nata", "Brownie", "Croissant", "Donut"],
    correta: 0
  }
];

export default function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = perguntas[index];

  function answer(i) {
    if (i === q.correta) {
      setScore(score + 1);
    }

    if (index + 1 < perguntas.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  function resetQuiz() {
    setIndex(0);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / perguntas.length) * 100);
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27', paddingHorizontal: 20 }}>
        
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

        <Text style={{ fontSize:28, fontWeight: 'bold', color: '#00a8ff', marginBottom: 20 }}>Fim do Quiz 🇵🇹</Text>
        <View style={{ backgroundColor: '#1a1a2e', borderRadius: 12, padding: 30, alignItems: 'center', borderWidth: 2, borderColor: '#00a8ff' }}>
          <Text style={{ fontSize:48, fontWeight: 'bold', color: '#00a8ff' }}>{score}</Text>
          <Text style={{ fontSize:18, color: '#ffffff', marginTop: 10 }}>de {perguntas.length} perguntas</Text>
          <Text style={{ fontSize:24, fontWeight: 'bold', color: percentage >= 70 ? '#00ff00' : '#ff00ff', marginTop: 20 }}>{percentage}%</Text>
        </View>
        <TouchableOpacity
          onPress={resetQuiz}
          style={{
            backgroundColor: '#00a8ff',
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 8,
            marginTop: 30
          }}
        >
          <Text style={{ color: '#0a0e27', fontSize: 16, fontWeight: 'bold' }}>Recomeçar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27', paddingHorizontal: 20, paddingVertical: 30 }}>
      
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
          paddingVertical: 8,
          zIndex: 10
        }}
      >
        <Text style={{ color: '#00a8ff', fontSize: 20, fontWeight: 'bold' }}>←</Text>
      </TouchableOpacity>

      {/* Indicador de Progresso */}
      <View style={{ width: '100%', marginBottom: 20 }}>
        <Text style={{ color: '#00a8ff', fontSize: 14, fontWeight: 'bold' }}>Pergunta {index + 1} de {perguntas.length}</Text>
        <View style={{ width: '100%', height: 6, backgroundColor: '#1a1a2e', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
          <View 
            style={{ 
              width: `${((index + 1) / perguntas.length) * 100}%`, 
              height: '100%', 
              backgroundColor: '#00a8ff' 
            }} 
          />
        </View>
      </View>

      {/* Pergunta */}
      <Text style={{ fontSize:18, fontWeight: 'bold', color: '#00a8ff', marginBottom: 30, textAlign: 'center' }}>
        {q.pergunta}
      </Text>

      {/* Opções */}
      <View style={{ width: '100%' }}>
        {q.opcoes.map((op, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => answer(i)}
            style={{
              backgroundColor:'#1a1a2e',
              padding:15,
              marginBottom:12,
              borderRadius:10,
              borderWidth: 2,
              borderColor: '#00a8ff'
            }}
          >
            <Text style={{ color:'#00a8ff', textAlign:'center', fontSize: 16, fontWeight: 'bold' }}>
              {op}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}