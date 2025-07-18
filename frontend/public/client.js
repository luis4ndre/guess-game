// Conecta ao servidor Socket.io. A URL deve corresponder à porta exposta do backend.
const socket = io();

// --- Elementos do DOM ---
const screens = document.querySelectorAll('.screen');
const loginForm = document.getElementById('login-form');
const nameInput = document.getElementById('name-input');
const playerList = document.getElementById('player-list');
const startGameBtn = document.getElementById('start-game-btn');
const themeDisplay = document.getElementById('theme-display');
const submissionForm = document.getElementById('submission-form');
const imageUrlInput = document.getElementById('image-url-input');
const submissionStatusDiv = document.getElementById('submission-status');
const votingCardsContainer = document.getElementById('voting-cards-container');
const votingForm = document.getElementById('voting-form');
const voteStatusDiv = document.getElementById('vote-status');
const resultsContainer = document.getElementById('results-container');
const newRoundBtn = document.getElementById('new-round-btn');

// --- Estado do Cliente ---
let myPlayerId = null;
let allPlayers = {};
let currentTheme = ''; // Armazena o tema da rodada atual

// --- Funções Auxiliares ---

/**
 * Exibe uma tela específica do jogo e oculta as outras.
 * @param {string} screenId - O ID do elemento da tela a ser exibida.
 */
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

/**
 * Atualiza a lista de jogadores na tela.
 * @param {object} players - O objeto com todos os jogadores.
 */
function updatePlayerList(players) {
    allPlayers = players;
    playerList.innerHTML = '';
    Object.values(players).forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.score})`;
        if (player.id === myPlayerId) {
            li.style.fontWeight = 'bold';
        }
        playerList.appendChild(li);
    });
}

/**
 * Converte uma URL do YouTube em uma URL de incorporação (embed).
 * @param {string} url - A URL original do YouTube.
 * @returns {string} - A URL de incorporação.
 */
function getYouTubeEmbedUrl(url) {
    let videoId;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
            videoId = urlObj.searchParams.get('v');
        } else {
            return null; // Não é um link de vídeo do YouTube reconhecido
        }
    } catch (e) {
        return null;
    }
    return `https://www.youtube.com/embed/${videoId}`;
}


// --- Lógica de Eventos do Formulário ---

// Entrar no jogo
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        socket.emit('player-join', { name });
    }
});

// Iniciar o jogo (botão)
startGameBtn.addEventListener('click', () => {
    socket.emit('start-game');
});

// Enviar imagem ou link
submissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const imageUrl = imageUrlInput.value.trim();
    if (imageUrl) {
        socket.emit('submit-image', { imageUrl });
        showScreen('waiting-submissions-screen');
    }
});

// Enviar votos
votingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votes = {};
    const selects = votingForm.querySelectorAll('select[data-owner-id]');
    
    let allVoted = true;
    selects.forEach(select => {
        if (!select.value) {
            allVoted = false;
        }
        votes[select.dataset.ownerId] = select.value;
    });

    if (allVoted) {
        socket.emit('submit-vote', { votes });
        showScreen('waiting-votes-screen');
    } else {
        alert('Você precisa votar em todas as imagens!');
    }
});

// Iniciar nova rodada
newRoundBtn.addEventListener('click', () => {
    socket.emit('start-game');
});


// --- Lógica de Eventos do Socket.io ---

socket.on('join-success', ({ id, players }) => {
    myPlayerId = id;
    updatePlayerList(players);
    showScreen('waiting-room-screen');
});

socket.on('update-players', ({ players }) => {
    updatePlayerList(players);
});

socket.on('can-start-game', () => {
    if (Object.keys(allPlayers).length >= 2) {
        startGameBtn.style.display = 'block';
    }
});

socket.on('new-round', ({ theme }) => {
    currentTheme = theme; // Salva o tema da rodada
    themeDisplay.textContent = `Tema da Rodada: ${theme.toUpperCase()}`;
    imageUrlInput.value = '';
    showScreen('submission-screen');
});

socket.on('update-submission-status', ({ submissions, players }) => {
    submissionStatusDiv.innerHTML = '<h3>Quem já enviou:</h3>';
    const submittedPlayers = Object.keys(submissions);
    Object.values(players).forEach(player => {
        const p = document.createElement('p');
        const hasSubmitted = submittedPlayers.includes(player.id);
        p.textContent = `${player.name}: ${hasSubmitted ? '✅ Enviado' : '🤔 Aguardando...'}`;
        submissionStatusDiv.appendChild(p);
    });
});

socket.on('start-voting', ({ submissions, players }) => {
    votingCardsContainer.innerHTML = '';
    const otherPlayers = Object.values(players).filter(p => p.id !== myPlayerId);

    submissions.forEach(({ ownerId, imageUrl }) => {
        const card = document.createElement('div');
        card.className = 'voting-card';

        // Lógica para exibir vídeo ou imagem
        const embedUrl = (currentTheme === 'música') ? getYouTubeEmbedUrl(imageUrl) : null;

        if (embedUrl) {
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '200px';
            iframe.src = embedUrl;
            iframe.title = 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            card.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Imagem enviada por um jogador';
            img.onerror = () => { img.src = 'https://placehold.co/400x300/16213e/dcdcdc?text=Imagem+Inválida'; };
            card.appendChild(img);
        }

        if (ownerId === myPlayerId) {
            const p = document.createElement('p');
            p.textContent = 'Esta é a sua submissão.';
            p.style.fontWeight = 'bold';
            card.appendChild(p);
        } else {
            const select = document.createElement('select');
            select.dataset.ownerId = ownerId;

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Escolha um jogador...';
            select.appendChild(defaultOption);

            otherPlayers.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                select.appendChild(option);
            });
            card.appendChild(select);
        }
        votingCardsContainer.appendChild(card);
    });
    showScreen('voting-screen');
});

socket.on('update-vote-status', ({ votes, players }) => {
    voteStatusDiv.innerHTML = '<h3>Quem já votou:</h3>';
    const votedPlayers = Object.keys(votes);
    Object.values(players).forEach(player => {
        const p = document.createElement('p');
        const hasVoted = votedPlayers.includes(player.id);
        p.textContent = `${player.name}: ${hasVoted ? '✅ Votos computados' : '🤔 Aguardando...'}`;
        voteStatusDiv.appendChild(p);
    });
});

socket.on('show-results', ({ results, players }) => {
    resultsContainer.innerHTML = '';
    updatePlayerList(players); // Atualiza scores

    Object.values(results).forEach(playerResult => {
        const playerCard = document.createElement('div');
        playerCard.className = 'result-player-card';

        const title = document.createElement('h3');
        title.textContent = `Votos de ${playerResult.voterName}`;
        playerCard.appendChild(title);

        const guessGrid = document.createElement('div');
        guessGrid.className = 'guess-grid';
        
        playerResult.guesses.forEach(guess => {
            const item = document.createElement('div');
            item.className = 'guess-item';
            
            // Lógica para exibir vídeo ou imagem nos resultados
            const embedUrl = (currentTheme === 'música') ? getYouTubeEmbedUrl(guess.imageUrl) : null;

            if (embedUrl) {
                const iframe = document.createElement('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '120px';
                iframe.src = embedUrl;
                iframe.title = 'YouTube video player';
                iframe.frameBorder = '0';
                item.appendChild(iframe);
            } else {
                const img = document.createElement('img');
                img.src = guess.imageUrl;
                img.onerror = () => { img.src = 'https://placehold.co/400x300/16213e/dcdcdc?text=Imagem+Inválida'; };
                item.appendChild(img);
            }

            const guessText = document.createElement('p');
            guessText.innerHTML = `Achou que era de: <strong class="${guess.correct ? 'correct' : 'incorrect'}">${guess.guessedPlayerName}</strong>`;
            
            const actualText = document.createElement('p');
            actualText.innerHTML = `Na verdade, era de: <strong>${guess.actualOwnerName}</strong>`;

            item.appendChild(guessText);
            if (!guess.correct) {
                item.appendChild(actualText);
            }
            
            guessGrid.appendChild(item);
        });

        playerCard.appendChild(guessGrid);
        resultsContainer.appendChild(playerCard);
    });

    showScreen('results-screen');
});

socket.on('game-reset', () => {
    alert('O jogo foi reiniciado porque um jogador saiu.');
    showScreen('waiting-room-screen');
    startGameBtn.style.display = 'none';
});

// --- Inicialização ---
showScreen('login-screen');
