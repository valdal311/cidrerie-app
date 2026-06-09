const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const questions = {
  // Garde tes 90 questions intactes ici !
  "1_pt": [
    "Quelle est la dernière analyse que tu as faite ?",
    "C'est quand la dernière fois que t'as commit sur Jira / Git ?",
    "T'as déjà bossé avec un category manager ?",
    "T'utilises github copilot pour faire quoi ?",
    "Quel est ton raccourci clavier préféré sur ton IDE ?",
    "Quelle est ta table BigQuery la plus requêtée ?",
    "Quel est le sport prioritaire sur lequel tu as le plus travaillé ce mois-ci ?",
    "T'as fait combien de visios aujourd'hui ?",
    "Quel est ton type de graphique préféré sur Tableau/Looker ?",
    "C'est quand la dernière fois que t'as fait un DROP TABLE par erreur (ou presque) ?",
    "T'es plutôt Python ou SQL pour nettoyer tes données ?",
    "Quel est le canal Slack/Teams / Google Chat que tu checkes en premier le matin ?",
    "C'est quoi la question la plus récurrente qu'un business te pose ?",
    "As-tu déjà utilisé ChatGPT pour débugger du code aujourd'hui ?",
    "Quel est ton jour préféré pour faire du télétravail ?",
    "C'est quoi le meeting récurrent que tu préférerais annuler ?",
    "Tu prends ton café/thé à quelle heure le matin ?",
    "Quel est le dernier dashboard que tu as mis à jour ?",
    "Tu mets combien de temps à répondre à un message en moyenne ?",
    "Quel est ton casque audio pour t'isoler dans l'open space ?",
    "T'es plutôt Dark Mode ou Light Mode sur tes outils ?",
    "Quel est le KPI que tu calcules le plus souvent ?",
    "As-tu déjà oublié de couper ton micro en réu ?",
    "Quelle est ta commande Git la plus utilisée ?",
    "T'as combien d'onglets ouverts sur ton navigateur là tout de suite ?",
    "Quel est ton magasin Decathlon préféré ?",
    "T'es plutôt data viz épurée ou tableau de chiffres massif ?",
    "Quel est le dernier article technique que tu as lu ?",
    "As-tu déjà fait une PR (Pull Request) refusée direct ?",
    "Quel est le produit Decathlon que tu utilises le plus en ce moment ?"
  ],
  "2_pts": [
    "T'as présenté des choses dernièrement pour briller (shine) ?",
    "T'as créé une rubrique ou une doc sur confluence récemment ?",
    "Quel est le dashboard dont tu es le plus fier au niveau design ?",
    "Quelle est la pire galère de données que tu as dû résoudre ce trimestre ?",
    "T'as déjà convaincu un chef de produit grâce à une de tes analyses ?",
    "C'est quoi le sujet data le plus sous-estimé par le business selon toi ?",
    "As-tu déjà formé quelqu'un à un outil data chez Decathlon ?",
    "Quel est le projet sur lequel tu aimerais avoir plus de temps pour bosser ?",
    "Quelle est ta meilleure astuce pour optimiser une requête SQL très lente ?",
    "C'est quoi la présentation qui t'a mis le plus la pression ?",
    "As-tu déjà trouvé une insight qui a complètement changé une décision business ?",
    "Quelle est la source de données la moins fiable avec laquelle tu dois composer ?",
    "Quel process aimerais-tu automatiser d'urgence dans l'équipe ?",
    "C'est quoi ton hack perso pour rester focus sur une tâche complexe ?",
    "Quel est le dernier retour hyper positif que tu as reçu d'un stakeholder ?",
    "As-tu déjà challengé un directeur commercial sur ses chiffres ?",
    "Quelle est l'analyse qui t'a pris le plus de temps à cause de données sales ?",
    "C'est quoi le buzzword data que tu n'en peux plus d'entendre ?",
    "As-tu déjà sauvé un projet qui était mal embarqué ?",
    "Quel est le modèle algorithmique que tu rêverais de mettre en place ?",
    "T'as déjà dû expliquer un concept technique complexe à un novice complet ?",
    "Quelle est la réunion la plus productive que tu aies eue cette semaine ?",
    "C'est quoi ton rituel d'équipe préféré ?",
    "T'as déjà fait du reverse engineering pour comprendre un vieux code hérité ?",
    "Quelle est ta plus belle création de variable (feature engineering) ?",
    "Quel est le sujet métier (sport) que tu connais sur le bout des doigts maintenant ?",
    "T'as déjà découvert un bug majeur dans une extraction de données ?",
    "Quelle est la meilleure initiative data prise par Decathlon ces dernières années selon toi ?",
    "T'as déjà fait une analyse ad-hoc qui s'est transformée en projet pérenne ?",
    "Quel collègue consultes-tu en premier quand tu es bloqué sur un problème technique ?"
  ],
  "3_pts": [
    "C'est quoi l'analyse la plus compliquée que tu aies faite chez Decathlon ?",
    "C'est quoi l'analyse dont t'es le plus fier chez Decathlon ?",
    "Quel est ton plus gros 'fail' ou erreur d'analyse et qu'en as-tu appris ?",
    "Si tu pouvais changer une chose dans l'architecture data de Decathlon, ce serait quoi ?",
    "Quel est l'impact business chiffré le plus important que tu aies généré ?",
    "Quelle est l'hypothèse métier que tu étais sûr(e) de vérifier et qui s'est avérée fausse ?",
    "C'est quoi le moment où tu t'es senti le plus utile pour l'entreprise ?",
    "Quelle est la vision que tu as pour le rôle de Data Analyst d'ici 3 ans chez Decat' ?",
    "As-tu déjà dû tenir tête à un manager sur une conclusion data impopulaire ?",
    "Quel est le projet qui t'a fait le plus grandir techniquement ?",
    "C'est quoi le plus grand défi pour aligner la data avec la stratégie des sports prioritaires ?",
    "Quelle est la pire dette technique que tu aies dû éponger ?",
    "Raconte un moment où tu as dû construire un modèle en partant d'une feuille totalement blanche.",
    "Quelle est ton ambition professionnelle à long terme dans la Data ?",
    "Quel est le problème algorithmique le plus épineux que tu aies craqué ?",
    "C'est quoi l'insight la plus contre-intuitive que tu aies découverte ?",
    "Si tu devais pitcher l'importance de ton équipe au CEO demain, tu dirais quoi ?",
    "Raconte un projet qui a nécessité une vraie synergie entre plusieurs départements.",
    "Quelle est la faille de qualité/confidentialité des données qui te fait le plus peur ?",
    "Quel est le modèle de données (schema) le plus élégant que tu aies conçu ?",
    "C'est quoi le plus grand sacrifice que tu aies fait pour tenir une deadline critique ?",
    "As-tu déjà dû déconstruire complètement une certitude business établie depuis des années ?",
    "Quelle est la plus belle reconnaissance que tu pourrais obtenir dans ton travail actuel ?",
    "Quel est le projet data le plus innovant que tu as vu chez Decathlon (même si ce n'est pas toi) ?",
    "Si tu avais un budget illimité pour la tech data, tu achèterais quel outil ?",
    "Quel est l'obstacle culturel le plus dur à franchir pour rendre l'entreprise 'Data Driven' ?",
    "As-tu déjà vécu une situation de 'Data Quality' critique qui aurait pu impacter les magasins ?",
    "Quel est l'algorithme ou la méthode statistique dont tu maîtrises toutes les subtilités ?",
    "C'est quoi le conseil le plus précieux que tu donnerais à un Data Analyst Junior qui arrive ?",
    "Quelle est la métrique ou l'indicateur dont l'entreprise se passe aujourd'hui mais qui serait révolutionnaire ?"
  ]
};

const games = {};

function generateCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function getNextTarget(playerId, playersData) {
  const allIds = Object.keys(playersData);
  const player = playersData[playerId];
  
  let available = allIds.filter(id => id !== playerId && !player.pastTargets.includes(id));
  
  if (available.length === 0) {
    player.pastTargets = [];
    available = allIds.filter(id => id !== playerId);
  }
  
  if (available.length === 0) return playerId;

  const targetId = available[Math.floor(Math.random() * available.length)];
  player.pastTargets.push(targetId);
  return targetId;
}

io.on('connection', (socket) => {
  socket.on('createGame', () => {
    const code = generateCode();
    games[code] = {
      host: socket.id,
      currentHostSocketId: socket.id,
      players: {},
      status: 'lobby',
      gameQuestions: JSON.parse(JSON.stringify(questions)),
      history: [] // Ajout de l'historique
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
          if (games[code].host === existingPlayerId) games[code].currentHostSocketId = socket.id;
      } else {
          if (games[code].status !== 'lobby') return socket.emit('error', 'Partie déjà commencée.');
          games[code].players[socket.id] = { 
              id: socket.id, currentSocketId: socket.id, name, score: 0, status: 'waiting', pastTargets: []
          };
          if (games[code].host === socket.id) games[code].currentHostSocketId = socket.id;
      }

      const isHost = (games[code].currentHostSocketId === socket.id);
      socket.join(code);
      io.to(code).emit('updatePlayers', Object.values(games[code].players));
      socket.emit('joined', { gameCode: code, status: games[code].status, isHost });
    } else {
      socket.emit('error', 'Partie introuvable.');
    }
  });

  socket.on('startGame', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
      game.status = 'playing';
      const playerIds = Object.keys(game.players);
      
      playerIds.forEach(id => {
        game.players[id].targetId = getNextTarget(id, game.players);
        game.players[id].status = 'playing';
        io.to(game.players[id].currentSocketId).emit('startRound', { 
            targetName: game.players[game.players[id].targetId].name 
        });
      });
      io.to(code).emit('gameStarted');
    }
  });

  socket.on('selectCategory', ({ code, category }) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        const qList = game.gameQuestions[category];
        let randomQ = "Tu as épuisé toutes les questions ! Pose une question de ton choix.";
        let points = category === '1_pt' ? 1 : category === '2_pts' ? 2 : 3;
        
        if (qList.length > 0) {
            const randomIndex = Math.floor(Math.random() * qList.length);
            randomQ = qList[randomIndex];
            qList.splice(randomIndex, 1);
        }

        socket.emit('questionAssigned', { question: randomQ, points: points });
      }
    }
  });

  // Mise à jour de la soumission pour historiser les réponses validées
  socket.on('submitRoundResult', ({ code, pointsEarned, awardToTarget, answerData }) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        
        if (awardToTarget) {
            const targetId = game.players[playerId].targetId;
            if(game.players[targetId]) game.players[targetId].score += 1;
        } else {
            game.players[playerId].score += pointsEarned;
            
            // Historisation uniquement si la réponse est validée (> 0 points) et non-punitive
            if (pointsEarned > 0 && answerData) {
                game.history.push({
                    asker: game.players[playerId].name,
                    target: game.players[game.players[playerId].targetId].name,
                    question: answerData.question,
                    answer: answerData.answer
                });
            }
        }
        
        const scores = Object.values(game.players)
            .map(p => ({ name: p.name, score: p.score }))
            .sort((a, b) => b.score - a.score);
            
        io.to(code).emit('updateLiveScores', scores); 
        socket.emit('showIntermediateScores', scores);
      }
    }
  });

  socket.on('nextTarget', (code) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        game.players[playerId].targetId = getNextTarget(playerId, game.players);
        socket.emit('startRound', { targetName: game.players[game.players[playerId].targetId].name });
      }
    }
  });

  // Nouvelles fonctions pour les boutons de l'hôte
  socket.on('requestLeaderboard', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
        const scores = Object.values(game.players)
            .map(p => ({ name: p.name, score: p.score }))
            .sort((a, b) => b.score - a.score);
        socket.emit('showLeaderboardModal', scores);
    }
  });

  socket.on('requestHistory', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
        socket.emit('showHistoryModal', game.history);
    }
  });

  socket.on('stopGame', (code) => {
    const game = games[code];
    if (game && game.currentHostSocketId === socket.id) {
        game.status = 'ended';
        const scores = Object.values(game.players)
            .map(p => ({ name: p.name, score: p.score }))
            .sort((a, b) => b.score - a.score);
        io.to(code).emit('gameEnded', scores);
    }
  });

  socket.on('leaveGame', ({ code }) => {
    const game = games[code];
    if (game) {
      const playerId = Object.keys(game.players).find(id => game.players[id].currentSocketId === socket.id);
      if (playerId) {
        if (game.host === playerId) {
            delete games[code];
            io.to(code).emit('error', 'Le Leader a fermé la partie.');
        } else {
            delete game.players[playerId];
            io.to(code).emit('updatePlayers', Object.values(game.players));
        }
      }
    }
    socket.leave(code);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur prêt sur port ${PORT}`);
});
