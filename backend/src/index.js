const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permite todas as origens para simplicidade
    methods: ["GET", "POST"]
  }
});

const PORT = 4000;

// --- Estado do Jogo ---
let players = {}; // { socketId: { id, name, score } }
let gameState = 'WAITING'; // WAITING, SUBMITTING, VOTING, RESULTS
let currentRound = {
  theme: '',
  submissions: {}, // { playerId: { imageUrl, ownerName } }
  votes: {},       // { voterId: { imageOwnerId: guessedPlayerId } }
};

const THEMES = ["filme", "série", "música", "livro"];

// Função para embaralhar um array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startNewRound() {
  console.log('Iniciando nova rodada...');
  gameState = 'SUBMITTING';
  currentRound = {
    theme: THEMES[Math.floor(Math.random() * THEMES.length)],
    submissions: {},
    votes: {},
  };
  io.emit('new-round', { theme: currentRound.theme });
}

function checkAllSubmitted() {
    const connectedPlayers = Object.values(players);
    if (connectedPlayers.length < 2) return false;
    return Object.keys(currentRound.submissions).length === connectedPlayers.length;
}

function checkAllVoted() {
    const connectedPlayers = Object.values(players);
    if (connectedPlayers.length < 2) return false;

    // Verifica se o número de jogadores que votaram é igual ao número de jogadores conectados
    if (Object.keys(currentRound.votes).length !== connectedPlayers.length) {
        return false;
    }

    // Verifica se cada jogador votou em todas as imagens (exceto a sua)
    for (const voterId in currentRound.votes) {
        // O número de votos de um jogador deve ser (total de jogadores - 1)
        if (Object.keys(currentRound.votes[voterId]).length !== connectedPlayers.length - 1) {
            return false;
        }
    }
    return true;
}


io.on('connection', (socket) => {
  console.log(`Jogador conectado: ${socket.id}`);

  // Evento para um novo jogador entrar
  socket.on('player-join', ({ name }) => {
    players[socket.id] = { id: socket.id, name, score: 0 };
    console.log(`Jogador ${name} entrou no jogo.`);
    
    socket.emit('join-success', { id: socket.id, players });
    io.emit('update-players', { players });

    // Se for o primeiro jogador, ele pode iniciar o jogo quando houver mais gente
    if (Object.keys(players).length >= 2 && gameState === 'WAITING') {
        io.emit('can-start-game');
    }
  });

  // Iniciar uma nova rodada
  socket.on('start-game', () => {
    if (Object.keys(players).length >= 2) {
        startNewRound();
    }
  });

  // Receber a submissão de imagem de um jogador
  socket.on('submit-image', ({ imageUrl }) => {
    if (gameState !== 'SUBMITTING' || !players[socket.id]) return;
    
    currentRound.submissions[socket.id] = { imageUrl, ownerName: players[socket.id].name };
    console.log(`Jogador ${players[socket.id].name} enviou a imagem: ${imageUrl}`);
    io.emit('update-submission-status', { submissions: currentRound.submissions, players });

    if (checkAllSubmitted()) {
      console.log('Todos enviaram. Iniciando votação.');
      gameState = 'VOTING';
      const shuffledSubmissions = shuffleArray(Object.entries(currentRound.submissions).map(([ownerId, data]) => ({ ownerId, ...data })));
      io.emit('start-voting', { submissions: shuffledSubmissions, players });
    }
  });

  // Receber os votos de um jogador
  socket.on('submit-vote', ({ votes }) => {
      if (gameState !== 'VOTING' || !players[socket.id]) return;

      currentRound.votes[socket.id] = votes;
      console.log(`Jogador ${players[socket.id].name} enviou seus votos.`);
      io.emit('update-vote-status', { votes: currentRound.votes, players });

      if (checkAllVoted()) {
          console.log('Todos votaram. Exibindo resultados.');
          gameState = 'RESULTS';
          
          // Lógica para calcular pontuação (exemplo simples: 1 ponto por acerto)
          const results = {};
          for (const voterId in currentRound.votes) {
              results[voterId] = { voterName: players[voterId].name, guesses: [] };
              for (const imageOwnerId in currentRound.votes[voterId]) {
                  const guessedPlayerId = currentRound.votes[voterId][imageOwnerId];
                  const correct = imageOwnerId === guessedPlayerId;
                  results[voterId].guesses.push({
                      imageUrl: currentRound.submissions[imageOwnerId].imageUrl,
                      actualOwnerName: players[imageOwnerId].name,
                      guessedPlayerName: players[guessedPlayerId].name,
                      correct
                  });
                  if (correct) {
                      players[voterId].score += 1;
                  }
              }
          }

          io.emit('show-results', { results, players });
      }
  });

  // Lidar com a desconexão de um jogador
  socket.on('disconnect', () => {
    if (players[socket.id]) {
      console.log(`Jogador ${players[socket.id].name} desconectou.`);
      delete players[socket.id];
      io.emit('update-players', { players });

      // Se o jogo estava em andamento e ficou com menos de 2 jogadores, reseta
      if (Object.keys(players).length < 2 && gameState !== 'WAITING') {
          console.log("Poucos jogadores, resetando o jogo.");
          gameState = 'WAITING';
          io.emit('game-reset');
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
