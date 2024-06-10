<template>
    <div class="hand">
      <Card v-for="card in cards" :key="card.id" :rank="card.rank" :clickable="true" @select="handleCardSelection" />
    </div>
  </template>
  
  <script>
  import Card from './Card.vue';
  
  export default {
    components: { Card },
    props: ['cards'],
    methods: {
      handleCardSelection(rank) {
        this.$emit('cardSelected', rank);
      }
    }
  };
  </script>
  
  <style scoped>
  .hand {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  </style>
  