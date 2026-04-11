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
    "C’est quoi le premier truc que Valentin t’a appris (ou essayé de t’apprendre) ? / What is the first thing Valentin taught you (or tried to teach you)?",
    "Quel est le surnom le plus ridicule que tu donnes à Valentin ? / What is the most ridiculous nickname you give Valentin?",
    "Est-ce que Valentin est du genre à arriver en avance ou toujours 10 min après ? / Is Valentin the type to arrive early or always 10 minutes late?",
    "Si Valentin gagnait au loto, il achèterait quoi en premier selon toi ? / If Valentin won the lottery, what do you think he would buy first?",
    "Quel est l'émoji que Valentin utilise le plus ? / What emoji does Valentin use the most?",
    "Est-ce que Valentin chante bien ? / Does Valentin sing well?",
    "C'est quoi la manie la plus drôle de Valentin ? / What is Valentin's funniest habit?",
    "Si Valentin devait participer à une émission de télé, ce serait laquelle ? / If Valentin were to participate in a TV show, which one would it be?",
    "Qui est le plus sage des deux quand vous sortez ? / Who is the best behaved of the two of you when you go out?",
    "A ton avis Valentin il est plutot sucré ou salé ? / In your opinion, does Valentin prefer sweet or savory?",
    "Comment t’es venu ce soir ? / How did you get here tonight?",
    "Qu’est ce que t’as pris à manger ce soir ? / What did you have to eat tonight?",
    "Qu’est-ce que tu fais ce weekend ? / What are you doing this weekend?",
    "C’est quoi ton programme pour demain matin ? / What are your plans for tomorrow morning?",
    "T’es plutôt montagne ou océan ? / Are you more of a mountain or ocean person?",
    "Tu es plutôt 'Team Chien' ou 'Team Chat' ? / Are you 'Team Dog' or 'Team Cat'?",
    "C’est quoi ton prochain lieu de vacances ? / What is your next vacation destination?",
    "Quelle est ta destination de rêve absolue ? / What is your absolute dream destination?",
    "Quelle est la série que tu as 'binge-watchée' le plus vite ? / What series did you binge-watch the fastest?",
    "C'est quoi la dernière série que t'as terminée ? / What is the last series you finished?",
    "Quel est ton endroit préféré pour boire un verre dans le coin ? / What is your favorite place to grab a drink around here?",
    "Tu préfères que chacun prenne son plat ou partager genre tapas ? / Do you prefer everyone having their own dish or sharing tapas-style?",
    "T’aimes bien les grandes tablées ? / Do you like big dinner parties?",
    "Tu la prends comment ta viande ? / How do you like your meat cooked?",
    "Quel est ton film préféré que tu peux voir 100 fois ? / What is your favorite movie that you could watch 100 times?",
    "Quel est le dernier livre qui t'a vraiment marqué ? / What is the last book that really left a mark on you?",
    "Quel est l'aliment que tu détestes le plus au monde ? / What food do you hate the most in the world?",
    "Quel est ton humoriste préféré ? / Who is your favorite comedian?",
    "C’est quand la dernière fois que t’as déjà été à une cidrerie ? / When was the last time you went to a cider house?",
    "Quel est le sport dans lequel tu excelles le plus ? / What sport do you excel at the most?",
    "C’est quoi le meilleur truc que t’aies mangé dans une cidrerie ? / What's the best thing you've eaten in a cider house?"
  ],
  jaune: [
    "Si tu gagnais au loto demain, quelle est la première chose que tu achèterais ? / If you won the lottery tomorrow, what is the first thing you would buy?",
    "Si tu pouvais avoir un super-pouvoir, lequel choisirais-tu ? / If you could have a superpower, which one would you choose?",
    "Si tu pouvais dîner avec une personnalité (morte ou vive), qui serait-ce ? / If you could have dinner with any famous person (dead or alive), who would it be?",
    "Quel objet emporterais-tu sur une île déserte (un seul !) ? / What one item would you take to a desert island?",
    "Quel métier rêvais-tu de faire quand tu étais petit ? / What job did you dream of having when you were little?",
    "Quelle est ta Madeleine de Proust (une odeur, un goût qui te ramène en enfance) ? / What is your Proust Madeleine (a smell, a taste that takes you back to childhood)?",
    "Quel était ton dessin animé préféré que tu regardais en boucle ? / What was your favorite cartoon that you watched on repeat?",
    "Quelle est ta chanson 'plaisir coupable' (que tu écoutes en cachette) ? / What is your 'guilty pleasure' song (that you listen to in secret)?",
    "Quel est ton talent inutile (ex: faire le trèfle avec sa langue) ? / What is your useless talent (e.g. rolling your tongue)?",
    "Que ferais-tu si tu étais invisible pendant 24 heures ? / What would you do if you were invisible for 24 hours?",
    "Si tu devais changer de prénom, lequel choisirais-tu ? / If you had to change your name, which one would you choose?",
    "Qu'est-ce qui te fait immédiatement rire à tous les coups ? / What never fails to make you laugh immediately?",
    "Quelle est la première chose que tu regardes chez quelqu'un ? / What is the first thing you notice about someone?",
    "Si tu devais ouvrir un restaurant, ça serait quoi le concept ? / If you were to open a restaurant, what would the concept be?",
    "C'est quoi ta plus grande passion, celle qui te fait oublier de manger ? / What is your greatest passion, the one that makes you forget to eat?",
    "Quelle est ta plus grande qualité (celle que tes amis citent toujours) ? / What is your best quality (the one your friends always mention)?",
    "Quel est le meilleur conseil qu'on t'ait jamais donné ? / What is the best advice you've ever been given?",
    "Quel est l'objet le plus bizarre que tu possèdes chez toi ? / What is the weirdest object you own at home?",
    "Quel était ton adresse msn ou ton pseudo skyblog ? / What was your MSN address or Skyblog username?",
    "T’as déjà été confondu avec quelqu’un d’autre ? / Have you ever been mistaken for someone else?",
    "Si tu étais une star, tu serais qui ? / If you were a celebrity, who would you be?"
  ],
  rouge: [
    "Quelle est ta plus grande peur irrationnelle ? / What is your biggest irrational fear?",
    "Quels sont tes 3 ingrédients du bonheur ? / What are your 3 ingredients for happiness?",
    "Quelle est la chose dont tu n'es pas le plus fier ? / What is the thing you are least proud of?",
    "Qui est la personne que tu appellerais en premier en cas de gros problème ? / Who is the first person you would call in case of a major problem?",
    "Quel est ton plus gros défaut (celui qui agace tout le monde) ? / What is your biggest flaw (the one that annoys everyone)?",
    "Quel est ton motto in life (ta devise) ? / What is your motto in life?",
    "Quel est ton pire souvenir d'école (la honte totale) ? / What is your worst school memory (total embarrassment)?",
    "Quelle est ta croyance absurde que tu as gardée le plus longtemps ? / What is the most absurd belief you held onto the longest?",
    "Quel est le pire cadeau qu'on t'ait jamais offert ? / What is the worst gift you have ever been given?",
    "Si tu étais un Président, quelle est la première loi que mettrais-tu en place ? / If you were President, what would be the first law you would implement?",
    "Quelle est la pire application sur ton téléphone (celle que tu devrais supprimer) ? / What is the worst app on your phone (the one you should delete)?",
    "Quel est le mensonge le plus culotté que tu aies jamais dit ? / What is the boldest lie you have ever told?",
    "Quelle est la pire gaffe que tu aies faite en public ? / What is the worst blunder you have made in public?",
    "Quelle est la pire blessure que tu t’aies faites ? / What is the worst injury you've ever had?",
    "Quelle est la chose la plus courageuse que tu aies faite ? / What is the bravest thing you have ever done?",
    "Quelle est ta plus grande réussite personnelle ? / What is your greatest personal achievement?",
    "Si tu devais décrire ta vie en un titre de film, ce serait lequel ? / If you had to describe your life with a movie title, what would it be?",
    "Si tu devais décrire ta vie en une musique ça serait laquelle ? / If you had to describe your life with a song, what would it be?",
    "Quelle est la pire expérience culinaire que t'as eue ? / What is the worst culinary experience you've ever had?",
    "Quelle est la chose que tu veux faire à tout prix avant de mourir ? / What is the one thing you want to do at all costs before you die?",
    "Quel est l'aliment que tu ne pourrais jamais partager ? / What food could you never share?",
    "T'es plutôt du genre à finir les assiettes des autres ? / Are you the type to finish other people's plates?",
    "T’as un ou une partenaire elle veut piquer dans ton plat tu partages ? / If your partner wants to steal from your plate, do you share?"
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
      // Reconnexion : On vérifie si un joueur avec ce nom existe déjà
      let existingPlayerId = Object.keys(games[code].players).find(id => games[code].players[id].name === name);
      
      if (existingPlayerId) {
          // On met à jour l'ID du socket pour ce joueur
          const playerData = games[code].players[existingPlayerId];
          delete games[code].players[existingPlayerId];
          games[code].players[socket.id] = playerData;
          games[code].players[socket.id].id = socket.id;
          
          // Si on est le host, on met à jour l'ID du host
          if (existingPlayerId === games[code].host) {
              games[code].host = socket.id;
          }
      } else {
          // Nouveau joueur
          if (games[code].status !== 'lobby') return socket.emit('error', 'Partie déjà commencée.');
          games[code].players[socket.id] = { name, score: 0, status: 'waiting', id: socket.id };
      }

      socket.join(code);
      io.to(code).emit('updatePlayers', Object.values(games[code].players));
      socket.emit('joined', { code, status: games[code].status, isHost: (socket.id === games[code].host) });
      
      // Si la partie est en cours, on renvoie les infos nécessaires au joueur qui revient
      if (games[code].status === 'playing') {
          const p = games[code].players[socket.id];
          socket.emit('startRound', { targetName: games[code].players[p.targetId].name });
          if (p.question) socket.emit('questionAssigned', p.question);
          if (p.status === 'done') socket.emit('waitingForOthers');
      }
      
      if (games[code].status === 'resolution' && socket.id === games[code].host) {
          // Si le host revient pendant le tribunal
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
  console.log(`Serveur lancé sur le port ${PORT}`);
});
