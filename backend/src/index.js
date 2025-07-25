const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 4000;

// --- Estado do Jogo por Sala ---
let rooms = {}; // { roomId: { players: {}, gameState: 'WAITING', currentRound: {}, themes: [] } }

const DEFAULT_THEMES = ["filme", "série", "música", "livro"];

function generateRoomCode(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startNewRound(roomId) {
  const room = rooms[roomId];
  if (!room || room.themes.length === 0) {
    console.log(`Sala ${roomId} não pode iniciar rodada sem temas.`);
    // Opcional: notificar o cliente
    io.to(roomId).emit("error-message", {
      message: "Não é possível iniciar uma rodada sem temas selecionados.",
    });
    return;
  }

  console.log(`Iniciando nova rodada na sala: ${roomId}`);
  room.gameState = "SUBMITTING";
  const selectedTheme =
    room.themes[Math.floor(Math.random() * room.themes.length)];
  room.currentRound = {
    theme: selectedTheme,
    submissions: {},
    votes: {},
  };
  io.to(roomId).emit("new-round", { theme: room.currentRound.theme });
}

io.on("connection", (socket) => {
  console.log(`Jogador conectado: ${socket.id}`);

  socket.on("create-room", ({ name }) => {
    let roomId = generateRoomCode();
    while (rooms[roomId]) {
      roomId = generateRoomCode();
    }

    rooms[roomId] = {
      players: {},
      gameState: "WAITING",
      currentRound: {},
      themes: [...DEFAULT_THEMES], // Inicia com os temas padrão
    };
    console.log(`Sala criada: ${roomId}`);

    const room = rooms[roomId];
    socket.join(roomId);
    socket.roomId = roomId;
    room.players[socket.id] = { id: socket.id, name, score: 0 };

    socket.emit("join-success", {
      id: socket.id,
      roomId,
      players: room.players,
      themes: room.themes,
    });
  });

  socket.on("join-room", ({ name, roomId }) => {
    const room = rooms[roomId];
    if (!room) {
      socket.emit("room-not-found");
      return;
    }
    socket.join(roomId);
    socket.roomId = roomId;
    room.players[socket.id] = { id: socket.id, name, score: 0 };

    socket.emit("join-success", {
      id: socket.id,
      roomId,
      players: room.players,
      themes: room.themes,
    });
    io.to(roomId).emit("update-players", { players: room.players });

    if (Object.keys(room.players).length >= 3 && room.gameState === "WAITING") {
      io.to(roomId).emit("can-start-game");
    }
  });

  socket.on("customize-themes", ({ roomId, newThemes }) => {
    const room = rooms[roomId];
    const player = room?.players[socket.id];
    // Apenas o host (primeiro jogador) pode customizar
    if (player && Object.keys(room.players)[0] === socket.id) {
      room.themes = newThemes;
      console.log(`Temas da sala ${roomId} atualizados para:`, newThemes);
      io.to(roomId).emit("themes-updated", { themes: room.themes });
    }
  });

  socket.on("skip-theme", ({ roomId }) => {
    const room = rooms[roomId];
    const player = room?.players[socket.id];
    if (player && Object.keys(room.players)[0] === socket.id) {
      console.log(`Tema pulado na sala ${roomId} pelo host.`);
      startNewRound(roomId);
    }
  });

  socket.on("start-game", ({ roomId }) => {
    const room = rooms[roomId];
    if (room && Object.keys(room.players).length >= 3) {
      startNewRound(roomId);
    }
  });

  socket.on("submit-image", ({ roomId, imageUrl }) => {
    const room = rooms[roomId];
    if (!room || room.gameState !== "SUBMITTING" || !room.players[socket.id])
      return;

    room.currentRound.submissions[socket.id] = {
      imageUrl,
      ownerName: room.players[socket.id].name,
    };
    io.to(roomId).emit("update-submission-status", {
      submissions: room.currentRound.submissions,
      players: room.players,
    });

    const connectedPlayers = Object.values(room.players);
    if (
      Object.keys(room.currentRound.submissions).length ===
      connectedPlayers.length
    ) {
      room.gameState = "VOTING";
      const shuffledSubmissions = shuffleArray(
        Object.entries(room.currentRound.submissions).map(
          ([ownerId, data]) => ({ ownerId, ...data })
        )
      );
      io.to(roomId).emit("start-voting", {
        submissions: shuffledSubmissions,
        players: room.players,
      });
    }
  });

  socket.on("submit-vote", ({ roomId, votes }) => {
    const room = rooms[roomId];
    if (!room || room.gameState !== "VOTING" || !room.players[socket.id])
      return;

    room.currentRound.votes[socket.id] = votes;
    io.to(roomId).emit("update-vote-status", {
      votes: room.currentRound.votes,
      players: room.players,
    });

    const connectedPlayers = Object.values(room.players);
    const allVoted =
      Object.keys(room.currentRound.votes).length === connectedPlayers.length &&
      Object.values(room.currentRound.votes).every(
        (v) => Object.keys(v).length === connectedPlayers.length - 1
      );

    if (allVoted) {
      room.gameState = "RESULTS";
      const results = {};
      for (const voterId in room.currentRound.votes) {
        results[voterId] = {
          voterName: room.players[voterId].name,
          guesses: [],
        };
        for (const imageOwnerId in room.currentRound.votes[voterId]) {
          const guessedPlayerId =
            room.currentRound.votes[voterId][imageOwnerId];
          const correct = imageOwnerId === guessedPlayerId;
          results[voterId].guesses.push({
            imageUrl: room.currentRound.submissions[imageOwnerId].imageUrl,
            actualOwnerName: room.players[imageOwnerId].name,
            guessedPlayerName: room.players[guessedPlayerId].name,
            correct,
          });
          if (correct) {
            room.players[voterId].score += 1;
          }
        }
      }
      io.to(roomId).emit("show-results", { results, players: room.players });
    }
  });

  socket.on("disconnect", () => {
    const roomId = socket.roomId;
    if (!roomId || !rooms[roomId]) return;
    const room = rooms[roomId];
    const player = room.players[socket.id];

    if (player) {
      delete room.players[socket.id];
      if (Object.keys(room.players).length === 0) {
        delete rooms[roomId];
      } else {
        io.to(roomId).emit("update-players", { players: room.players });
        if (
          Object.keys(room.players).length < 3 &&
          room.gameState !== "WAITING"
        ) {
          room.gameState = "WAITING";
          io.to(roomId).emit("game-reset");
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
