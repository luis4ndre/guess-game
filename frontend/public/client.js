// Conecta ao servidor Socket.io.
const socket = io();

// --- Dicionário de Traduções ---
const translations = {
    'en': {
        gameTitle: '🤔 Guess Who!',
        playersInRoom: 'Players in Room',
        welcomeTitle: 'Welcome to Guess Who!',
        yourNamePlaceholder: 'Your name',
        createRoomBtn: 'Create New Room',
        joinWithCodeBtn: 'Join with Code',
        enterRoomCode: 'Enter the room code:',
        roomCodePlaceholder: 'CODE',
        joinRoomBtn: 'Join Room',
        waitingForPlayers: 'Waiting for Players...',
        shareThisCode: 'Share this code with your friends:',
        min3Players: 'The game will start when there are at least 3 players in the room.',
        configureThemesBtn: 'Configure Themes',
        startGameBtn: 'Start Game!',
        configureThemesTitle: 'Configure Room Themes',
        configureThemesDesc: 'Add custom themes or disable existing ones for this session.',
        newCustomThemePlaceholder: 'New custom theme',
        addBtn: 'Add',
        saveAndBackBtn: 'Save and Back',
        roundTheme: 'Round Theme: ',
        submissionInstructionMusic: 'Find a YouTube link that represents the theme and paste it below.',
        submissionInstructionImage: 'Find an image link that represents the theme and paste it below.',
        pasteLinkPlaceholder: 'Paste the link here',
        submitBtn: 'Submit',
        skipThemeBtn: 'Skip Theme',
        waitingForSubmissions: 'Waiting for other players to submit...',
        whoHasSubmitted: 'Who has submitted:',
        submitted: '✅ Submitted',
        waiting: '🤔 Waiting...',
        votingTitle: 'Time to Vote!',
        votingDesc: "Who do you think each item belongs to?",
        choosePlayer: 'Choose a player...',
        yourSubmission: 'This is your submission.',
        confirmVotesBtn: 'Confirm Votes',
        waitingForVotes: 'Waiting for other players to vote...',
        whoHasVoted: 'Who has voted:',
        votesCounted: '✅ Votes counted',
        resultsTitle: 'Round Results!',
        votesFrom: 'Votes from',
        thoughtItWas: "Thought it was from:",
        actuallyItWas: "Actually, it was from:",
        playNewRoundBtn: 'Play New Round',
        alertEnterName: 'Please enter your name.',
        alertInvalidYoutube: 'Invalid link. Please enter a valid YouTube link.',
        alertInvalidImage: 'Invalid link. Please enter a link to a valid image.',
        alertSelectOneTheme: 'You must select at least one theme!',
        alertRoomNotFound: 'Room not found. Check the code and try again.',
        alertGameReset: 'The game was reset due to a lack of players.'
    },
    'pt-br': {
        gameTitle: '🤔 Adivinhe Quem!',
        playersInRoom: 'Jogadores na Sala',
        welcomeTitle: 'Bem-vindo ao Adivinhe Quem!',
        yourNamePlaceholder: 'Seu nome',
        createRoomBtn: 'Criar Nova Sala',
        joinWithCodeBtn: 'Entrar com Código',
        enterRoomCode: 'Digite o código da sala:',
        roomCodePlaceholder: 'CÓDIGO',
        joinRoomBtn: 'Entrar na Sala',
        waitingForPlayers: 'Aguardando Jogadores...',
        shareThisCode: 'Compartilhe este código com seus amigos:',
        min3Players: 'O jogo começará quando houver pelo menos 3 jogadores na sala.',
        configureThemesBtn: 'Configurar Temas',
        startGameBtn: 'Iniciar Jogo!',
        configureThemesTitle: 'Configurar Temas da Sala',
        configureThemesDesc: 'Adicione temas personalizados ou desative os existentes para esta sessão.',
        newCustomThemePlaceholder: 'Novo tema personalizado',
        addBtn: 'Adicionar',
        saveAndBackBtn: 'Salvar e Voltar',
        roundTheme: 'Tema da Rodada: ',
        submissionInstructionMusic: 'Encontre um link do YouTube que represente o tema e cole abaixo.',
        submissionInstructionImage: 'Encontre um link de imagem que represente o tema e cole abaixo.',
        pasteLinkPlaceholder: 'Cole o link aqui',
        submitBtn: 'Enviar',
        skipThemeBtn: 'Pular Tema',
        waitingForSubmissions: 'Aguardando os outros jogadores enviarem...',
        whoHasSubmitted: 'Quem já enviou:',
        submitted: '✅ Enviado',
        waiting: '🤔 Aguardando...',
        votingTitle: 'Hora de Votar!',
        votingDesc: 'De quem você acha que é cada item?',
        choosePlayer: 'Escolha um jogador...',
        yourSubmission: 'Esta é a sua submissão.',
        confirmVotesBtn: 'Confirmar Votos',
        waitingForVotes: 'Aguardando os outros jogadores votarem...',
        whoHasVoted: 'Quem já votou:',
        votesCounted: '✅ Votos computados',
        resultsTitle: 'Resultados da Rodada!',
        votesFrom: 'Votos de',
        thoughtItWas: "Achou que era de:",
        actuallyItWas: "Na verdade, era de:",
        playNewRoundBtn: 'Jogar Nova Rodada',
        alertEnterName: 'Por favor, digite seu nome.',
        alertInvalidYoutube: 'Link inválido. Por favor, insira um link válido do YouTube.',
        alertInvalidImage: 'Link inválido. Por favor, insira um link de uma imagem válida.',
        alertSelectOneTheme: 'Você deve selecionar pelo menos um tema!',
        alertRoomNotFound: 'Sala não encontrada. Verifique o código e tente novamente.',
        alertGameReset: 'O jogo foi reiniciado por falta de jogadores.'
    },
    'es': {
        gameTitle: '🤔 ¡Adivina Quién!',
        playersInRoom: 'Jugadores en la Sala',
        welcomeTitle: '¡Bienvenido a Adivina Quién!',
        yourNamePlaceholder: 'Tu nombre',
        createRoomBtn: 'Crear Nueva Sala',
        joinWithCodeBtn: 'Unirse con Código',
        enterRoomCode: 'Introduce el código de la sala:',
        roomCodePlaceholder: 'CÓDIGO',
        joinRoomBtn: 'Unirse a la Sala',
        waitingForPlayers: 'Esperando Jugadores...',
        shareThisCode: 'Comparte este código con tus amigos:',
        min3Players: 'El juego comenzará cuando haya al menos 3 jugadores en la sala.',
        configureThemesBtn: 'Configurar Temas',
        startGameBtn: '¡Empezar Juego!',
        configureThemesTitle: 'Configurar Temas de la Sala',
        configureThemesDesc: 'Añade temas personalizados o desactiva los existentes para esta sesión.',
        newCustomThemePlaceholder: 'Nuevo tema personalizado',
        addBtn: 'Añadir',
        saveAndBackBtn: 'Guardar y Volver',
        roundTheme: 'Tema de la Ronda: ',
        submissionInstructionMusic: 'Encuentra un enlace de YouTube que represente el tema y pégalo abajo.',
        submissionInstructionImage: 'Encuentra un enlace de imagen que represente el tema y pégalo abajo.',
        pasteLinkPlaceholder: 'Pega el enlace aquí',
        submitBtn: 'Enviar',
        skipThemeBtn: 'Saltar Tema',
        waitingForSubmissions: 'Esperando que los demás jugadores envíen...',
        whoHasSubmitted: 'Quién ha enviado:',
        submitted: '✅ Enviado',
        waiting: '🤔 Esperando...',
        votingTitle: '¡Hora de Votar!',
        votingDesc: '¿A quién crees que pertenece cada artículo?',
        choosePlayer: 'Elige un jugador...',
        yourSubmission: 'Esta es tu sumisión.',
        confirmVotesBtn: 'Confirmar Votos',
        waitingForVotes: 'Esperando que los demás jugadores voten...',
        whoHasVoted: 'Quién ha votado:',
        votesCounted: '✅ Votos contados',
        resultsTitle: '¡Resultados de la Ronda!',
        votesFrom: 'Votos de',
        thoughtItWas: "Pensó que era de:",
        actuallyItWas: "En realidad, era de:",
        playNewRoundBtn: 'Jugar Nueva Ronda',
        alertEnterName: 'Por favor, introduce tu nombre.',
        alertInvalidYoutube: 'Enlace inválido. Por favor, introduce un enlace válido de YouTube.',
        alertInvalidImage: 'Enlace inválido. Introduce un enlace a una imagen válida.',
        alertSelectOneTheme: '¡Debes seleccionar al menos un tema!',
        alertRoomNotFound: 'Sala no encontrada. Verifica el código e inténtalo de nuevo.',
        alertGameReset: 'El juego se reinició por falta de jugadores.'
    }
};

// --- Elementos do DOM ---
const allDomElements = {
    screens: document.querySelectorAll('.screen'),
    loginForm: document.getElementById('login-form'),
    nameInput: document.getElementById('name-input'),
    roomDisplay: document.getElementById('room-display'),
    playerList: document.getElementById('player-list'),
    createRoomBtn: document.getElementById('create-room-btn'),
    showJoinInputBtn: document.getElementById('show-join-input-btn'),
    initialActions: document.getElementById('initial-actions'),
    joinRoomSection: document.getElementById('join-room-section'),
    roomIdInput: document.getElementById('room-id-input'),
    shareRoomCodeDiv: document.getElementById('share-room-code'),
    roomCodeDisplay: document.getElementById('room-code-display'),
    startGameBtn: document.getElementById('start-game-btn'),
    showThemesBtn: document.getElementById('show-themes-btn'),
    themeConfigScreen: document.getElementById('theme-config-screen'),
    themeListEditor: document.getElementById('theme-list-editor'),
    customThemeInput: document.getElementById('custom-theme-input'),
    addThemeBtn: document.getElementById('add-theme-btn'),
    saveThemesBtn: document.getElementById('save-themes-btn'),
    themeDisplay: document.getElementById('theme-display'),
    submissionForm: document.getElementById('submission-form'),
    submissionInstruction: document.getElementById('submission-instruction'),
    imageUrlInput: document.getElementById('image-url-input'),
    skipThemeBtn: document.getElementById('skip-theme-btn'),
    submissionStatusDiv: document.getElementById('submission-status'),
    votingCardsContainer: document.getElementById('voting-cards-container'),
    votingForm: document.getElementById('voting-form'),
    voteStatusDiv: document.getElementById('vote-status'),
    resultsContainer: document.getElementById('results-container'),
    newRoundBtn: document.getElementById('new-round-btn'),
    languageSelectorContainer: document.querySelector('.language-selector-container')
};

// --- Estado do Cliente ---
let myPlayerId = null;
let allPlayers = {};
let currentRoomId = null;
let currentTheme = '';
let roomThemes = [];
let currentLanguage = 'en';

// --- Funções ---
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    document.documentElement.lang = lang.split('-')[0];
    if (document.title) {
        document.title = translations[lang].gameTitle.substring(2);
    }
    document.querySelectorAll('.lang-flag').forEach(flag => {
        flag.classList.toggle('active', flag.dataset.lang === lang);
    });
}

function showScreen(screenId) {
    allDomElements.screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updatePlayerList(players) {
    allPlayers = players;
    allDomElements.playerList.innerHTML = '';
    Object.values(players).forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} (${player.score})`;
        if (player.id === myPlayerId) li.style.fontWeight = 'bold';
        allDomElements.playerList.appendChild(li);
    });

    const isHost = Object.keys(allPlayers).length > 0 && Object.keys(allPlayers)[0] === myPlayerId;
    allDomElements.showThemesBtn.classList.toggle('hidden', !isHost);
    allDomElements.startGameBtn.classList.toggle('hidden', !(isHost && Object.keys(allPlayers).length >= 3));
    allDomElements.newRoundBtn.classList.toggle('hidden', !isHost);
}

function getYouTubeEmbedUrl(url) {
    let videoId;
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') videoId = urlObj.pathname.slice(1);
        else if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) videoId = urlObj.searchParams.get('v');
        else return null;
    } catch (e) { return null; }
    return `https://www.youtube.com/embed/${videoId}`;
}

function validateImage(url) {
    return new Promise((resolve) => {
        if (!url || (!url.startsWith('http') && !url.startsWith('data:image'))) {
            return resolve(false);
        }
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

function populateThemeEditor(themes) {
    allDomElements.themeListEditor.innerHTML = '';
    themes.forEach(theme => {
        const div = document.createElement('div');
        div.className = 'theme-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `theme-${theme.replace(/\s/g, '-')}`;
        input.value = theme;
        input.checked = true;
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = theme;
        div.appendChild(input);
        div.appendChild(label);
        allDomElements.themeListEditor.appendChild(div);
    });
}

// --- Lógica de Eventos ---
allDomElements.languageSelectorContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-flag')) {
        const lang = e.target.dataset.lang;
        setLanguage(lang);
    }
});

allDomElements.createRoomBtn.addEventListener('click', () => {
    const name = allDomElements.nameInput.value.trim();
    if (!name) { alert(translations[currentLanguage].alertEnterName); return; }
    socket.emit('create-room', { name });
});

allDomElements.showJoinInputBtn.addEventListener('click', () => {
    allDomElements.initialActions.classList.add('hidden');
    allDomElements.joinRoomSection.classList.remove('hidden');
});

allDomElements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = allDomElements.nameInput.value.trim();
    const roomId = allDomElements.roomIdInput.value.trim().toUpperCase();
    if (!name) { alert(translations[currentLanguage].alertEnterName); return; }
    if (roomId) socket.emit('join-room', { name, roomId });
});

allDomElements.showThemesBtn.addEventListener('click', () => {
    populateThemeEditor(roomThemes);
    showScreen('theme-config-screen');
});

allDomElements.addThemeBtn.addEventListener('click', () => {
    const newTheme = allDomElements.customThemeInput.value.trim();
    if (newTheme && !roomThemes.find(t => t.toLowerCase() === newTheme.toLowerCase())) {
        roomThemes.push(newTheme);
        populateThemeEditor(roomThemes);
        allDomElements.customThemeInput.value = '';
    }
});

allDomElements.saveThemesBtn.addEventListener('click', () => {
    const newThemes = [];
    allDomElements.themeListEditor.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        newThemes.push(checkbox.value);
    });
    if (newThemes.length === 0) { alert(translations[currentLanguage].alertSelectOneTheme); return; }
    socket.emit('customize-themes', { roomId: currentRoomId, newThemes });
    showScreen('waiting-room-screen');
});

allDomElements.startGameBtn.addEventListener('click', () => socket.emit('start-game', { roomId: currentRoomId }));
allDomElements.skipThemeBtn.addEventListener('click', () => socket.emit('skip-theme', { roomId: currentRoomId }));
allDomElements.newRoundBtn.addEventListener('click', () => socket.emit('start-game', { roomId: currentRoomId }));

allDomElements.submissionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = allDomElements.imageUrlInput.value.trim();
    if (!url) return;

    const isMusicTheme = currentTheme.toLowerCase().includes('músic') || currentTheme.toLowerCase().includes('music');

    if (isMusicTheme) {
        if (!getYouTubeEmbedUrl(url)) {
            alert(translations[currentLanguage].alertInvalidYoutube);
            return;
        }
    } else {
        const isValid = await validateImage(url);
        if (!isValid) {
            alert(translations[currentLanguage].alertInvalidImage);
            return;
        }
    }
    socket.emit('submit-image', { roomId: currentRoomId, imageUrl: url });
    showScreen('waiting-submissions-screen');
});

allDomElements.votingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votes = {};
    const selects = allDomElements.votingForm.querySelectorAll('select[data-owner-id]');
    let allVoted = true;
    selects.forEach(select => {
        if (!select.value) allVoted = false;
        votes[select.dataset.ownerId] = select.value;
    });
    if (allVoted) {
        socket.emit('submit-vote', { roomId: currentRoomId, votes });
        showScreen('waiting-votes-screen');
    } else { alert(translations[currentLanguage].alertSelectOneTheme); }
});

// --- Lógica de Eventos do Socket.io ---
socket.on('join-success', ({ id, roomId, players, themes }) => {
    myPlayerId = id;
    currentRoomId = roomId;
    roomThemes = themes;
    allDomElements.roomDisplay.textContent = `${translations[currentLanguage].playersInRoom}: ${roomId}`;
    const isHost = Object.keys(players).length === 1;
    allDomElements.shareRoomCodeDiv.classList.toggle('hidden', !isHost);
    if(isHost) allDomElements.roomCodeDisplay.textContent = roomId;
    updatePlayerList(players);
    showScreen('waiting-room-screen');
});

socket.on('room-not-found', () => alert(translations[currentLanguage].alertRoomNotFound));
socket.on('themes-updated', ({ themes }) => roomThemes = themes);
socket.on('update-players', ({ players }) => updatePlayerList(players));
socket.on('game-reset', () => {
    alert(translations[currentLanguage].alertGameReset);
    showScreen('waiting-room-screen');
    allDomElements.startGameBtn.classList.add('hidden');
});

socket.on('new-round', ({ theme }) => {
    currentTheme = theme;
    allDomElements.themeDisplay.textContent = `${translations[currentLanguage].roundTheme}${theme.toUpperCase()}`;
    const isMusicTheme = theme.toLowerCase().includes('músic') || theme.toLowerCase().includes('music');
    if (isMusicTheme) {
        allDomElements.submissionInstruction.textContent = translations[currentLanguage].submissionInstructionMusic;
    } else {
        allDomElements.submissionInstruction.textContent = translations[currentLanguage].submissionInstructionImage;
    }
    allDomElements.imageUrlInput.value = '';
    const isHost = Object.keys(allPlayers)[0] === myPlayerId;
    allDomElements.skipThemeBtn.classList.toggle('hidden', !isHost);
    showScreen('submission-screen');
});

socket.on('update-submission-status', ({ submissions, players }) => {
    allDomElements.submissionStatusDiv.innerHTML = `<h3>${translations[currentLanguage].whoHasSubmitted}</h3>`;
    Object.values(players).forEach(player => {
        const p = document.createElement('p');
        p.textContent = `${player.name}: ${Object.keys(submissions).includes(player.id) ? translations[currentLanguage].submitted : translations[currentLanguage].waiting}`;
        allDomElements.submissionStatusDiv.appendChild(p);
    });
});

socket.on('start-voting', ({ submissions, players }) => {
    allDomElements.votingCardsContainer.innerHTML = '';
    const otherPlayers = Object.values(players).filter(p => p.id !== myPlayerId);
    const submissionsToVoteOn = submissions.filter(sub => sub.ownerId !== myPlayerId);
    submissionsToVoteOn.forEach(({ ownerId, imageUrl }) => {
        const card = document.createElement('div');
        card.className = 'voting-card';
        const isMusicTheme = currentTheme.toLowerCase().includes('músic') || currentTheme.toLowerCase().includes('music');
        const embedUrl = isMusicTheme ? getYouTubeEmbedUrl(imageUrl) : null;
        if (embedUrl) {
            const iframe = document.createElement('iframe');
            iframe.src = embedUrl;
            iframe.title = 'YouTube video player';
            card.appendChild(iframe);
        } else {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Imagem enviada';
            img.onerror = () => { img.src = 'https://placehold.co/400x300/483d8b/f2e9ff?text=Inválido'; };
            
            link.appendChild(img);
            card.appendChild(img);
        }
        const select = document.createElement('select');
        select.dataset.ownerId = ownerId;
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = translations[currentLanguage].choosePlayer;
        select.appendChild(defaultOption);
        otherPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = player.id;
            option.textContent = player.name;
            select.appendChild(option);
        });
        card.appendChild(select);
        allDomElements.votingCardsContainer.appendChild(card);
    });
    showScreen('voting-screen');
});

socket.on('update-vote-status', ({ votes, players }) => {
    allDomElements.voteStatusDiv.innerHTML = `<h3>${translations[currentLanguage].whoHasVoted}</h3>`;
    Object.values(players).forEach(player => {
        const p = document.createElement('p');
        p.textContent = `${player.name}: ${Object.keys(votes).includes(player.id) ? translations[currentLanguage].votesCounted : translations[currentLanguage].waiting}`;
        allDomElements.voteStatusDiv.appendChild(p);
    });
});

socket.on('show-results', ({ results, players }) => {
    allDomElements.resultsContainer.innerHTML = '';
    updatePlayerList(players);
    Object.values(results).forEach(playerResult => {
        const playerCard = document.createElement('div');
        playerCard.className = 'result-player-card';
        const title = document.createElement('h3');
        title.textContent = `${translations[currentLanguage].votesFrom} ${playerResult.voterName}`;
        playerCard.appendChild(title);
        const guessGrid = document.createElement('div');
        guessGrid.className = 'guess-grid';
        playerResult.guesses.forEach(guess => {
            const item = document.createElement('div');
            item.className = 'guess-item';
            const isMusicTheme = currentTheme.toLowerCase().includes('músic') || currentTheme.toLowerCase().includes('music');
            const embedUrl = isMusicTheme ? getYouTubeEmbedUrl(guess.imageUrl) : null;
            if (embedUrl) {
                const iframe = document.createElement('iframe');
                iframe.src = embedUrl;
                iframe.title = 'YouTube video player';
                item.appendChild(iframe);
            } else {
                const link = document.createElement('a');
                link.href = guess.imageUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                const img = document.createElement('img');
                img.src = guess.imageUrl;
                img.onerror = () => { img.src = 'https://placehold.co/400x300/483d8b/f2e9ff?text=Inválido'; };
                
                link.appendChild(img);
                item.appendChild(img);
            }
            const guessText = document.createElement('p');
            guessText.innerHTML = `${translations[currentLanguage].thoughtItWas} <strong class="${guess.correct ? 'correct' : 'incorrect'}">${guess.guessedPlayerName}</strong>`;
            const actualText = document.createElement('p');
            actualText.innerHTML = `${translations[currentLanguage].actuallyItWas} <strong>${guess.actualOwnerName}</strong>`;
            item.appendChild(guessText);
            if (!guess.correct) item.appendChild(actualText);
            guessGrid.appendChild(item);
        });
        playerCard.appendChild(guessGrid);
        allDomElements.resultsContainer.appendChild(playerCard);
    });
    showScreen('results-screen');
});

// --- Inicialização ---
setLanguage('en'); // Define o idioma padrão na inicialização
showScreen('login-screen');
