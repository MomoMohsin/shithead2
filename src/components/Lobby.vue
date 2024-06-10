<template>
    <div class="lobby">
      <button @click="createRoom">Create Room</button>
      <button @click="joinRoom">Join Room</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      createRoom() {
        this.$emit('createRoom');
      },
      joinRoom() {
        this.$emit('joinRoom');
      }
    }
  };
  </script>
  
  <style scoped>
  .lobby {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }
  </style>