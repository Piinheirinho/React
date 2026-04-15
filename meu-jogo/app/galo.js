import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Galo() {
  const router = useRouter();
  const [gameMode, setGameMode] = useState(null); // null, 'pvp', 'ai'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [scoresX, setScoresX] = useState(0);
  const [scoresO, setScoresO] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Algoritmo Minimax para IA
  function minimax(board, depth, isMaximizing) {
    const result = checkWinner(board);

    if (result !== null) {
      if (result === 'O') return 10 - depth; // IA ganha
      if (result === 'X') return depth - 10; // Jogador ganha
      return 0; // Empate
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function getBestMove(board) {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  // Verifica se há vencedor
  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Verifica se é empate
  function isBoardFull(squares) {
    return squares.every(square => square !== null);
  }

  function play(index) {
    if (board[index] || gameOver) return;

    let newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const w = checkWinner(newBoard);
    if (w) {
      setWinner(w);
      setGameOver(true);
      if (w === 'X') {
        setScoresX(scoresX + 1);
      } else {
        setScoresO(scoresO + 1);
      }
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      return;
    }

    // Se for modo IA e for a vez do O (IA), fazer jogada automática
    if (gameMode === 'ai' && player === 'X') {
      setPlayer('O');
      setTimeout(() => {
        const aiMove = getBestMove(newBoard);
        if (aiMove !== -1) {
          newBoard[aiMove] = 'O';
          setBoard([...newBoard]);

          const aiWinner = checkWinner(newBoard);
          if (aiWinner) {
            setWinner(aiWinner);
            setGameOver(true);
            setScoresO(scoresO + 1);
            return;
          }

          if (isBoardFull(newBoard)) {
            setGameOver(true);
            return;
          }

          setPlayer('X');
        }
      }, 500); // Delay para simular pensamento da IA
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setGameOver(false);
    setWinner(null);
  }

  function resetScores() {
    setScoresX(0);
    setScoresO(0);
  }

  let statusText = '';
  if (gameOver && winner) {
    statusText = `Jogador ${winner} venceu!`;
  } else if (gameOver && !winner) {
    statusText = 'Empate!';
  } else {
    if (gameMode === 'ai' && player === 'O') {
      statusText = 'IA está pensando...';
    } else {
      statusText = `Jogador: ${player}`;
    }
  }

  // Tela de seleção de modo
  if (gameMode === null) {
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

        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#00a8ff', marginBottom: 40 }}>
          Jogo do Galo
        </Text>

        <Text style={{ fontSize: 18, color: '#ffffff', marginBottom: 30, textAlign: 'center' }}>
          Escolhe o modo de jogo:
        </Text>

        <TouchableOpacity
          onPress={() => setGameMode('pvp')}
          style={{
            backgroundColor: '#001f3f',
            padding: 20,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#00a8ff',
            marginBottom: 20,
            width: '80%',
            alignItems: 'center',
            shadowColor: '#00a8ff',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
            👥 2 Jogadores
          </Text>
          <Text style={{ color: '#99d9ff', marginTop: 6, fontSize: 14 }}>
            Joga contra outra pessoa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGameMode('ai')}
          style={{
            backgroundColor: '#001f3f',
            padding: 20,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#00a8ff',
            width: '80%',
            alignItems: 'center',
            shadowColor: '#00a8ff',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
            🤖 Jogar com IA
          </Text>
          <Text style={{ color: '#99d9ff', marginTop: 6, fontSize: 14 }}>
            Desafia o computador
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#0a0e27', paddingBottom: 30 }}>

      {/* Botão Voltar */}
      <TouchableOpacity
        onPress={() => {
          setGameMode(null);
          resetGame();
        }}
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

      {/* Placar */}
      <View style={{ flexDirection: 'row', marginBottom: 20, gap: 40 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#00a8ff', fontSize: 16, fontWeight: 'bold' }}>Jogador X</Text>
          <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold', marginTop: 5 }}>{scoresX}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#00a8ff', fontSize: 16, fontWeight: 'bold' }}>
            {gameMode === 'ai' ? 'IA' : 'Jogador O'}
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold', marginTop: 5 }}>{scoresO}</Text>
        </View>
      </View>

      {/* Status do jogo */}
      <Text style={{ color: '#00a8ff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>{statusText}</Text>

      {/* Tabuleiro */}
      <View style={{ width: 300, marginBottom: 20, padding: 10, borderRadius: 18, backgroundColor: '#11152a', borderWidth: 2, borderColor: '#00a8ff' }}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const cell = board[index];
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => play(index)}
                  disabled={gameMode === 'ai' && player === 'O'}
                  style={{
                    width: 90,
                    height: 90,
                    borderWidth: 2,
                    borderColor: '#00a8ff',
                    backgroundColor: '#0d1123',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 14,
                    shadowColor: '#00a8ff',
                    shadowOpacity: 0.15,
                    shadowRadius: 10,
                    elevation: 4
                  }}
                >
                  <Text style={{
                    fontSize: 32,
                    color: cell === 'X' ? '#00ff00' : cell === 'O' ? '#ff00ff' : '#00a8ff',
                    fontWeight: 'bold'
                  }}>
                    {cell}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Botões */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <TouchableOpacity
          onPress={resetGame}
          style={{
            backgroundColor: '#00a8ff',
            paddingVertical: 14,
            paddingHorizontal: 26,
            borderRadius: 12,
            marginRight: 14,
            shadowColor: '#00a8ff',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5
          }}
        >
          <Text style={{ color: '#0a0e27', fontSize: 16, fontWeight: 'bold' }}>
            {gameOver ? 'Novo jogo' : 'Limpar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={resetScores}
          style={{
            backgroundColor: '#1a1a2e',
            borderWidth: 2,
            borderColor: '#00a8ff',
            paddingVertical: 14,
            paddingHorizontal: 26,
            borderRadius: 12,
            shadowColor: '#00a8ff',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 4
          }}
        >
          <Text style={{ color: '#00a8ff', fontSize: 16, fontWeight: 'bold' }}>
            Reset Scores
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}