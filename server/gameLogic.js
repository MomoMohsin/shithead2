// GameLogic.js
class GameLogic {
    constructor(deck) {
        this.players = [];
        this.deck = deck;
        this.pile = [];
        this.currentPlayerIndex = 0;
    }

    initializeGame(players) {
        this.players = players;
        this.deck.shuffle();
        this.dealCardsToPlayers();
        this.findStartingPlayer();
    }

    dealCardsToPlayers() {
        this.players.forEach(player => {
            player.downcards = this.deck.draw(3);
            player.upcards = this.deck.draw(3);
            player.handcards = this.deck.draw(3);
        });
    }

    findStartingPlayer() {
        let startingPlayer = this.players.find(player => player.handcards.some(card => card.rank === '4'));
        this.currentPlayerIndex = startingPlayer ? this.players.indexOf(startingPlayer) : 0;
        this.startTurn();
    }

    startTurn() {
        let currentPlayer = this.players[this.currentPlayerIndex];
        // Signal currentPlayer to take their turn
    }

    playCard(player, card) {
        if (!this.isValidPlay(card)) {
            player.pickUpPile(this.pile);
            this.nextPlayer();
            return;
        }
        this.handleSpecialCards(card, player);
        this.pile.push(card);
        if (player.handcards.length < 3 && this.deck.cards.length > 0) {
            player.handcards.push(...this.deck.draw(3 - player.handcards.length));
        }
        this.checkForWin(player);
    }

    isValidPlay(card) {
        const topCard = this.pile.length > 0 ? this.pile[this.pile.length - 1] : null;
        return topCard ? card.rank >= topCard.rank || ['2', '3', '7', '10'].includes(card.rank) : true;
    }

    handleSpecialCards(card, player) {
        switch (card.rank) {
            case '2':
                // Acts as a wild card
                break;
            case '10':
                // Clears the pile and allows the same player to play again
                this.pile = [];
                this.startTurn(player);
                break;
            case '3':
                // Acts as invisible; gameplay continues as if the 3 were not there
                card.invisible = true;
                card.underlyingRank = this.pile[this.pile.length - 2] ? this.pile[this.pile.length - 2].rank : '0';
                break;
            case '7':
                // Forces the next player to play a card lower than 7 or another special card
                this.gameState.forcePlayLowerThanSeven = true;
                break;
        }
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.startTurn();
    }

    checkForWin(player) {
        if (player.handcards.length === 0 && player.upcards.length === 0 && player.downcards.length === 0) {
            console.log(`${player.name} has won the game!`);
        }
    }

    getGameState() {
        return {
            players: this.players,
            currentPlayerIndex: this.currentPlayerIndex,
            pile: this.pile
        };
    }
}

export default GameLogic;