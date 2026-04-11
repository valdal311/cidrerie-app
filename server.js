const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const questions = {
  verte: [
    "Depuis combien de temps tu connais Valentin ? / How long have you known Valentin?",
    "Comment t’as connu Valentin ? / How did you meet Valentin?",
    "Si Valentin devait être un Animal ça serait quoi ? / If Valentin were an animal, what would he be?",
    "Est-ce que Valentin est plus fort que toi au surf ? / Is Valentin better at surfing than you?",
    "Est-ce que Valentin cuisine mieux qu'il ne surfe ? / Does Valentin cook better than he surfs?",
    "C’est quoi le premier truc que Valentin t’a appris ? / What is the first thing Valentin taught you?",
    "Quel est le surnom le plus ridicule de Valentin ? / What is Valentin's most ridiculous nickname?",
    "Est-ce que Valentin est plutôt avance ou retard ? / Is Valentin early or late?",
    "S'il gagnait au loto, il achèterait quoi ? / If he won the lottery, what would he buy?",
    "Quel émoji Valentin utilise le plus ? / Which emoji does Valentin use most?",
    "Est-ce que Valentin chante bien ? / Does Valentin sing well?",
    "C'est quoi la manie la plus drôle de Valentin ? / What's Valentin's funniest habit?",
    "Valentin dans une émission TV : laquelle ? / Valentin in a TV show: which one?",
    "Qui est le plus sage en soirée ? / Who is the best behaved when going out?",
    "Valentin : plutôt sucré ou salé ? / Valentin: sweet or savory?",
    "Comment t’es venu ce soir ? / How did you get here tonight?",
    "Qu’est ce que t’as pris à manger ? / What did you have to eat?",
    "Qu’est-ce que tu fais ce weekend ? / What are you doing this weekend?",
    "T’es plutôt montagne ou océan ? / More of a mountain or ocean person?",
    "Team Chien ou Team Chat ? / Team Dog or Team Cat?",
    "C’est quoi ton prochain lieu de vacances ? / Where's your next vacation?",
    "Ta destination de rêve ? / Your dream destination?",
    "Série binge-watchée le plus vite ? / Series you binged the fastest?",
    "Dernière série terminée ? / Last series you finished?",
    "Ton endroit préféré pour boire un verre ? / Favorite place for a drink?",
    "Plat individuel ou partage genre tapas ? / Individual dish or sharing tapas?",
    "T’aimes bien les grandes tablées ? / Do you like big dinner parties?",
    "Cuisson de ta viande ? / How do you like your meat?",
    "Film préféré à voir 100 fois ? / Movie you'd watch 100 times?",
    "Dernier livre marquant ? / Last book that marked you?",
    "Aliment détesté au monde ? / Food you hate most in the world?",
    "Ton humoriste préféré ? / Your favorite comedian?",
    "Dernière fois en cidrerie ? / Last time in a cider house?",
    "Ton sport de prédilection ? / Your best sport?",
    "Meilleur truc mangé en cidrerie ? / Best thing eaten in a cider house?"
  ],
  jaune: [
    "Premier achat si tu gagnes au loto ? / First thing you buy if you win the lottery?",
    "Ton super-pouvoir de rêve ? / Your dream superpower?",
    "Dîner avec une star (morte ou vive) ? / Dinner with a star (dead or alive)?",
    "Un seul objet sur une île déserte ? / One object on a desert island?",
    "Ton métier de rêve enfant ? / Dream job as a kid?",
    "Ta Madeleine de Proust (odeur/goût) ? / Your Proust's Madeleine (smell/taste)?",
    "Dessin animé préféré d'enfance ? / Favorite childhood cartoon?",
    "Ta chanson plaisir coupable ? / Your guilty pleasure song?",
    "Ton talent inutile ? / Your useless talent?",
    "Invisible pendant 24h : tu fais quoi ? / Invisible for 24h: what do you do?",
    "Nouveau prénom choisi ? / If you had to choose a new name?",
    "Ce qui te fait rire à tous les coups ? / What always makes you laugh?",
    "Premier truc regardé chez quelqu'un ? / First thing you notice in someone?",
    "Ton concept de restaurant ? / Your restaurant concept?",
    "Ta passion qui fait oublier de manger ? / Passion that makes you forget to eat?",
    "Ta plus grande qualité ? / Your greatest quality?",
    "Meilleur conseil reçu ? / Best advice ever received?",
    "Objet le plus bizarre chez toi ? / Weirdest object at your home?",
    "Ton vieux pseudo MSN/Skyblog ? / Your old MSN/Skyblog username?",
    "Déjà confondu avec quelqu'un ? / Ever been mistaken for someone else?",
    "Si tu étais une star, qui serais-tu ? / If you were a star, who would you be?"
  ],
  rouge: [
    "Ta plus grande peur irrationnelle ? / Your biggest irrational fear?",
    "Tes 3 ingrédients du bonheur ? / Your 3 ingredients for happiness?",
    "Chose dont tu es le moins fier ? / Thing you're least proud of?",
    "Qui appeler en cas de gros pépin ? / Who to call in a major crisis?",
    "Ton plus gros défaut ? / Your biggest flaw?",
    "Ta devise dans la vie ? / Your motto in life?",
    "Pire souvenir d'école ? / Worst school memory?",
    "Croyance absurde gardée longtemps ? / Absurd belief held for a long time?",
    "Pire cadeau reçu ? / Worst gift received?",
    "Ta première loi si tu es Président ? / Your first law as President?",
    "Pire application sur ton tel ? / Worst app on your phone?",
    "Ton mensonge le plus culotté ? / Your boldest lie?",
    "Pire gaffe en public ? / Worst public blunder?",
    "Pire blessure physique ? / Worst physical injury?",
    "Chose la plus courageuse faite ? / Bravest thing you've done?",
    "Ta plus grande réussite ? / Your greatest achievement?",
    "Titre de film pour ta vie ? / Movie title for your life?",
    "Musique pour ta vie ? / Song for your life?",
    "Pire expérience culinaire ? / Worst culinary experience?",
    "À faire avant de mourir ? / To do before you die?",
    "Aliment impossible à partager ? / Food impossible to share?",
    "Finir l'assiette des autres ? / Do you finish others' plates?",
    "Partage du plat avec ton/ta partenaire ? / Do you share food with your partner?"
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
          const playerData = games[code].players[existingPlayerId];
          delete games[code].players[existingPlayerId];
          games[code].players[socket.id] = playerData;
          games[code].players[socket.id].id = socket.id;
          if (existingPlayerId === games[code].host) games[code].host = socket.id;
      } else {
          if (games[code].status !== 'lobby') return socket.emit('error', 'Partie déjà commencée.');
          games[code].players[socket.id] = { name, score: 0, status: 'waiting', id: socket.id };
      }

      socket.join(code);
      io.to(code).emit('updatePlayers', Object.values(games[code].players));
      
      // On renvoie un objet clair
      socket.emit('joined', { 
          gameCode: code, 
          status: games[code].status, 
          isHost: (socket.id === games[code].host) 
      });
      
      if (games[code].status === 'playing') {
          const p = games[code].players[socket.id];
          socket.emit('startRound', { targetName: games[code].players[p.targetId].name });
          if (p.question) socket.emit('questionAssigned', p.question);
          if (p.status === 'done') socket.emit('waitingForOthers');
      }
      
      if (games[code].status === 'resolution' && socket.id === games[code].host) {
          socket.emit('allAnswersSubmitted', Object.values(games[code].players).map(p => ({
            id: p.id, name: p.name, targetName: games[code].players[p.targetId].name,
            category: p.category, question: p.question, answer: p.answer
          })));
      }
    } else {
      socket.emit('error', 'Partie introuvable.');
    }
  });

  socket.on('startGame', (code) => {
    const game = games[code];
    if (game && game.host === socket.id) {
      game.status = 'playing';
      const playerIds = Object.keys(game.players);
      const targets = assignTargets(playerIds);
      playerIds.forEach((id, index) => {
        game.players[id].targetId = targets[index];
        game.players[id].status = 'choosing_category';
        delete game.players[id].question;
        delete game.players[id].answer;
        delete game.players[id].category;
        io.to(id).emit('startRound', { targetName: game.players[targets[index]].name });
      });
    }
  });

  socket.on('selectCategory', ({ code, category }) => {
    const game = games[code];
    if (game && game.players[socket.id]) {
      const qList = questions[category];
      const randomQ = qList[Math.floor(Math.random() * qList.length)];
      game.players[socket.id].category = category;
      game.players[socket.id].question = randomQ;
      game.players[socket.id].status = 'answering';
      socket.emit('questionAssigned', randomQ);
    }
  });

  socket.on('submitAnswer', ({ code, answer }) => {
    const game = games[code];
    if (game && game.players[socket.id]) {
      game.players[socket.id].answer = answer;
      game.players[socket.id].status = 'done';
      socket.emit('waitingForOthers');
      const allDone = Object.values(game.players).every(p => p.status === 'done');
      if (allDone) {
        game.status = 'resolution';
        io.to(game.host).emit('allAnswersSubmitted', Object.values(game.players).map(p => ({
          id: p.id, name: p.name, targetName: game.players[p.targetId].name,
          category: p.category, question: p.question, answer: p.answer
        })));
      }
    }
  });

  socket.on('scorePlayer', ({ code, playerId, action }) => {
    const game = games[code];
    if (game) {
      const player = game.players[playerId];
      if (action === 'busted') player.score -= 1;
      if (action === 'true') {
        if (player.category === 'verte') player.score += 1;
        if (player.category === 'jaune') player.score += 2;
        if (player.category === 'rouge') player.score += 3;
      }
    }
  });

  socket.on('showScores', (code) => {
    const game = games[code];
    if (game) {
      game.status = 'scores';
      const scores = Object.values(game.players).map(p => ({ name: p.name, score: p.score })).sort((a, b) => b.score - a.score);
      io.to(code).emit('displayScores', scores);
    }
  });

  socket.on('nextRound', (code) => {
      const game = games[code];
      if (game && game.host === socket.id) {
          game.round += 1;
          game.status = 'lobby';
          io.to(code).emit('backToLobby');
      }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur prêt sur port ${PORT}`);
});
