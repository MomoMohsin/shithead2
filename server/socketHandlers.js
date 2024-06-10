// SocketHandlers.js
import socketio from 'socket.io';

class SocketHandlers {
    constructor(server, gameLogic) {
        this.io = socketio(server);
        this.gameLogic = gameLogic;
        this.initializeGameSockets();
    }

    initializeGameSockets() {
        this.io.on('connection', (socket) => {
            socket.on('playCard', (card, playerId) => {
                let player = this.gameLogic.findPlayerById(playerId);
                if (player) {
                    this.gameLogic.playCard(player, card);
                    this.io.emit('update', this.gameLogic.getGameState());
                }
            });

            socket.on('drawCard', (playerId) => {
                let player = this.gameLogic.findPlayerById(playerId);
                if (player && this.gameLogic.deck.cards.length > 0) {
                    const card = this.gameLogic.deck.draw(1);
                    player.handcards.push(card);
                    this.io.emit('update', this.gameLogic.getGameState());
                }
            });

            socket.on('shuffle', () => {
                this.gameLogic.deck.shuffle();
                this.io.emit('deckShuffled');
            });

            socket.on('deal', () => {
                this.gameLogic.dealCardsToPlayers();
                this.io.emit('cardsDealt', this.gameLogic.players.map(p => p.handcards));
            });
        });
    }
}

export default SocketHandlers;
