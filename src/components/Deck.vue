<template>
  <div class="deck">
    <button @click="shuffleDeck">Shuffle Deck</button>
    <button @click="dealCards">Deal Cards</button>
  </div>
</template>

<script>
export default {
  methods: {
    shuffleDeck() {
      this.$emit('shuffle');
    },
    dealCards() {
      this.$emit('deal');
    }
  }
};
</script>

<style scoped>
.deck {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>