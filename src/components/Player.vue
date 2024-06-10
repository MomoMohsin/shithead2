<template>
    <div class="player">
      <div class="player-info">
        <h3>{{ playerData.name }}</h3>
        <div v-if="playerData.upcards">
          <Card v-for="(card, index) in displayUpcards" :key="index" :rank="card.rank" :visible="card.visible" @select="playCard(card)" />
        </div>
      </div>
      <button v-if="isPlayerTurn" @click="playCard">Play Card</button>
    </div>
</template>

<script>
import Card from './Card.vue';

export default {
  components: { Card },
  props: {
    playerData: Object,
    isPlayerTurn: Boolean
  },
  computed: {
    displayUpcards() {
      return this.playerData.upcards.map(card => ({ ...card, visible: true }));
    },
    displayDowncards() {
      return this.playerData.downcards.map(card => ({ ...card, visible: false }));
    }
  },
  methods: {
    playCard(card) {
      this.$emit('playCard', card);
    }
  }
};
</script>

<style scoped>
.player {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
.player-info {
  margin-bottom: 10px;
}
</style>
