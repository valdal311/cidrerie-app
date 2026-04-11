const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const questions = {
  verte: [
    "Depuis combien de temps tu connais Valentin ?",
    "Comment t’as connu Valentin ?",
    "Si Valentin devait être un Animal ça serait quoi ?",
    "Est-ce que Valentin est plus fort que toi au surf ?",
    "Est-ce que Valentin cuisine mieux qu'il ne surfe ?",
    "C’est quoi le premier truc que Valentin t’a appris (ou essayé de t’apprendre) ?",
    "Quel est le surnom le plus ridicule que tu donnes à Valentin ?",
    "Est-ce que Valentin est du genre à arriver en avance ou toujours 10 min après ?",
    "Si Valentin gagnait au loto, il achèterait quoi en premier selon toi ?",
    "Quel est l'émoji que Valentin utilise le plus ?",
    "Est-ce que Valentin chante bien ?",
    "C'est quoi la manie la plus drôle de Valentin ?",
    "Si Valentin devait participer à une émission de télé, ce serait laquelle ?",
    "Qui est le plus sage des deux quand vous sortez ?",
    "A ton avis Valentin il est plutot sucré ou salé ?",
    "Comment t’es venu ce soir ?",
    "Qu’est ce que t’as pris à manger ce soir ?",
    "Qu’est-ce que tu fais ce weekend ?",
    "C’est quoi ton programme pour demain matin ?",
    "T’es plutôt montagne ou océan ?",
    "Tu es plutôt 'Team Chien' ou 'Team Chat' ?",
    "C’est quoi ton prochain lieu de vacances ?",
    "Quelle est ta destination de rêve absolue ?",
    "Quelle est la série que tu as 'binge-watchée' le plus vite ?",
    "C'est quoi la dernière série que t'as terminée ?",
    "Quel est ton endroit préféré pour boire un verre dans le coin ?",
    "Tu préfères que chacun prenne son plat ou partager genre tapas ?",
    "T’aimes bien les grandes tablées ?",
    "Tu la prends comment ta viande ?",
    "Quel est ton film préféré que tu peux voir 100 fois ?",
    "Quel est le dernier livre qui t'a vraiment marqué ?",
    "Quel est l'aliment que tu détestes le plus au monde ?",
    "Quel est ton humoriste préféré ?",
    "C’est quand la dernière fois que t’as déjà été à une cidrerie ?",
    "Quel est le sport dans lequel tu excelles le plus ?",
    "C’est quoi le meilleur truc que t’aies mangé dans une cidrerie ?"
  ],
  jaune: [
    "Si tu gagnais au loto demain, quelle est la première chose que tu achèterais ?",
    "Si tu pouvais avoir un super-pouvoir, lequel choisirais-tu ?",
    "Si tu pouvais dîner avec une personnalité (morte ou vive), qui serait-ce ?",
    "Quel objet emporterais-tu sur une île déserte (un seul !) ?",
    "Quel métier rêvais-tu de faire quand tu étais petit ?",
    "Quelle est ta Madeleine de Proust (une odeur, un goût qui te ramène en enfance) ?",
    "Quel était ton dessin animé préféré que tu regardais en boucle ?",
    "Quelle est ta chanson 'plaisir coupable' (que tu écoutes en cachette) ?",
    "Quel est ton talent inutile (ex: faire le trèfle avec sa langue) ?",
    "Que ferais-tu si tu étais invisible pendant 24 heures ?",
    "Si tu devais changer de prénom, lequel choisirais-tu ?",
    "Qu'est-ce qui te fait immédiatement rire à tous les coups ?",
    "Quelle est la première chose que tu regardes chez quelqu'un ?",
    "Si tu devais ouvrir un restaurant, ça serait quoi le concept ?",
    "C'est quoi ta plus grande passion, celle qui te fait oublier de manger ?",
    "Quelle est ta plus grande qualité (celle que tes amis citent toujours) ?",
    "Quel est le meilleur conseil qu'on t'ait jamais donné ?",
    "Quel est l'objet le plus bizarre que tu possèdes chez toi ?",
    "Quel était ton adresse msn ou ton pseudo skyblog ?",
    "T’as déjà été confondu avec quelqu’un d’autre ?",
    "Si tu étais une star, tu serais qui ?"
  ],
  rouge: [
    "Quelle est ta plus grande peur irrationnelle ?",
    "Quels sont tes 3 ingrédients du bonheur ?",
    "Quelle est la chose dont tu n'es pas le plus fier ?",
    "Qui est la personne que tu appellerais en premier en cas de gros problème ?",
    "Quel est ton plus gros défaut (celui qui agace tout le monde) ?",
    "Quel est ton motto in life (ta devise) ?",
    "Quel est ton pire souvenir d'école (la honte totale) ?",
    "Quelle est la croyance absurde que tu as gardée le plus longtemps ?",
    "Quel est le pire cadeau qu'on t'ait jamais offert ?",
    "Si tu étais un Président, quelle est la première loi que mettrais-tu en place ?",
    "Quelle est la pire application sur ton téléphone (celle que tu devrais supprimer) ?",
    "Quel est le mensonge le plus culotté que tu aies jamais dit ?",
    "Quelle est la pire gaffe que tu aies faite en public ?",
    "Quelle est la pire blessure que tu t’aies faites ?",
    "Quelle est la chose la plus courageuse que tu aies faite ?",
    "Quelle est ta plus grande réussite personnelle ?",
    "Si tu devais décrire ta vie en un titre de film, ce serait lequel ?",
    "Si tu devais décrire ta vie en une musique ça serait laquelle ?",
    "Quelle est la pire expérience culinaire que t'as eue ?",
    "Quelle est la chose que tu veux faire à tout prix avant de mourir ?",
    "Quel est l'aliment que tu ne pourrais jamais partager ?",
    "T'es plutôt du genre à finir les assiettes des autres ?",
    "T’as un ou une partenaire elle veut piquer dans ton plat tu partages ?"
  ]
};

const games = {};

function generateCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function assignTargets(playerIds) {
  let targets = [...playerIds];
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }
  for (let i = 0; i < playerIds.length; i++) {
    if (playerIds[i] === targets[i]) {
      let swapIdx = (i + 1) % playerIds.length;
      [targets[i], targets[swapIdx]] = [targets[swapIdx], targets[i]];
    }
  }
  return targets;
}

io.on('connection', (socket) => {
  socket.on('createGame', () => {
    const code = generateCode();
    games[code] = {
      host: socket.id,
      currentHostSocketId: socket.id,
      players: {},
      status: 'lobby',
      round: 1
    };
    socket.join(code);
    socket.emit('gameCreated', code);
  });

  socket.on('joinGame', ({ code, name }) => {
    code = code.toUpperCase();
    if (games[code]) {
      let existingPlayerId = Object.keys(games[code].players).find(id => games[code].players[id].name === name);
      
      if (existingPlayerId) {
          games[code].players[existingPlayerId].currentSocketId = socket.id;
          if (games[code].host === existingPlayerId) {
              games[code].currentHostSocketId = socket.id;
          }
      } else {
          if (games[code].status !== 'lobby') return socket.emit('error', 'Partie déjà commencée.');
          games[code].players[socket.id] = { 
              id: socket.id, 
              currentSocketId: socket.id, 
              name, 
              score: 0, 
              status: 'waiting' 
          };
          if (games[code].host === socket.id) {
              games[code].currentHostSocketId = socket.id;
          }
      }

      const player = games[code].players[existingPlayerId || socket.id];
      const isHost = (games[code].currentHostSocketId === socket.id);

      socket.join(code);
      io.to(code).emit('updatePlayers', Object.values(games[code].players));
      
      socket.emit('joined', { gameCode: code, status: games[code].status, isHost });
      
      if (games[code].status === 'playing') {
          socket.emit('startRound', { targetName: games[code].players[player.targetId].name });
          if (player.question) socket.emit('questionAssigned', player.question);
          if (player.status === 'done') socket.emit('waitingForOthers');
      } else if (games[code].status === 'resolution') {
          if (isHost) {
              socket.emit('allAnswersSubmitted', Object.values(games[code].players).map(p => ({
                id: p.id, name: p.name, targetName: games[code].players[p.targetId].name,
                category: p.category, question: p.question, answer: p.answer
              })));
          } else {
              socket.emit('waitingForOthers');
          }
      } else if (games[code].status === 'scores') {
          const scores = Object.values(games[code].players).map(p => ({ name: p.name, score: p.score })).sort((a, b) => b.score - a.score);
          socket.emit('displayScores', scores);
      }
    } else {
      socket.emit('error', 'Partie introuvable.');
    }
  });

  socket.on('startGame', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
      game.status = 'playing';
      const playerIds = Object.keys(game.players);
      const targets = assignTargets(playerIds);
      
      playerIds.forEach((id, index) => {
        game.players[id].targetId = targets[index];
        game.players[id].status = 'choosing_category';
        delete game.players[id].question;
        delete game.players[id].answer;
        delete game.players[id].category;
        
        io.to(game.players[id].currentSocketId).emit('startRound', { targetName: game.players[targets[index]].name });
      });
    }
  });

  socket.on('selectCategory', ({ code, category }) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        const qList = questions[category];
        const randomQ = qList[Math.floor(Math.random() * qList.length)];
        game.players[playerId].category = category;
        game.players[playerId].question = randomQ;
        game.players[playerId].status = 'answering';
        socket.emit('questionAssigned', randomQ);
      }
    }
  });

  socket.on('submitAnswer', ({ code, answer }) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        game.players[playerId].answer = answer;
        game.players[playerId].status = 'done';
        socket.emit('waitingForOthers');
        
        const allDone = Object.values(game.players).every(p => p.status === 'done');
        if (allDone) {
          game.status = 'resolution';
          io.to(game.currentHostSocketId).emit('allAnswersSubmitted', Object.values(game.players).map(p => ({
            id: p.id, name: p.name, targetName: game.players[p.targetId].name,
            category: p.category, question: p.question, answer: p.answer
          })));
        }
      }
    }
  });

  socket.on('scorePlayer', ({ code, playerId, action }) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
      const player = game.players[playerId];
      if (player) {
          if (action === 'busted') player.score -= 1;
          if (action === 'true') {
            if (player.category === 'verte') player.score += 1;
            if (player.category === 'jaune') player.score += 2;
            if (player.category === 'rouge') player.score += 3;
          }
      }
    }
  });

  socket.on('showScores', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
      game.status = 'scores';
      const scores = Object.values(game.players).map(p => ({ name: p.name, score: p.score })).sort((a, b) => b.score - a.score);
      io.to(code).emit('displayScores', scores);
    }
  });

  socket.on('nextRound', (code) => {
      const game = games[code];
      if (game && game.currentHostSocketId === socket.id) {
          game.round += 1;
          game.status = 'lobby';
          Object.keys(game.players).forEach(id => {
              game.players[id].status = 'waiting';
          });
          io.to(code).emit('backToLobby');
      }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur prêt sur port ${PORT}`);
});
