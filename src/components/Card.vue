<template>
    <div class="card" @click="clickable && emitSelect()">
      <img v-if="visible" :src="`/path/to/cards/${rank}.png`" />
      <div v-else class="card-back"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['rank', 'visible', 'clickable'],
    methods: {
      emitSelect() {
        this.$emit('select', this.rank);
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    width: 100px;
    height: 140px;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .card.is-visible img {
    width: 100%;
    height: 100%;
  }
  .card-back {
    background-color: #333;
    width: 100%;
    height: 100%;
  }
  </style>
  