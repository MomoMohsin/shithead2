<template>
    <div class="game-board">
      <Deck @shuffleDeck="shuffleDeck" @dealCards="dealCards" />
      <Player v-for="(player, index) in players" :key="index" :player-data="player" :is-player-turn="index === currentPlayerIndex" @playCard="handlePlayCard" />
    </div>
  </template>
  
  <script>
  import Deck from './Deck.vue';
  import Player from './Player.vue';
  
  export default {
    components: {
      Deck,
      Player
    },
    data() {
      return {
        players: [],
        currentPlayerIndex: 0
      };
    },
    methods: {
      handlePlayCard(card) {
        // This method would need to interact with your backend via Socket.IO
        this.$socket.emit('playCard', card);
      },
      shuffleDeck() {
        this.$socket.emit('shuffle');
      },
      dealCards() {
        this.$socket.emit('deal');
      }
    },
    created() {
      this.$socket.on('update', (gameState) => {
        this.players = gameState.players;
        this.currentPlayerIndex = gameState.currentPlayerIndex;
      });
    }
  };
  </script>
  
  <style scoped>
  .game-board {
    display: flex;
    flex-direction: column;
  }
  </style>
  