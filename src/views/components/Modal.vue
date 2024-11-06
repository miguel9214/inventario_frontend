<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal" class="close-btn">X</button>
        <h2>{{ title }}</h2>
        <slot></slot> <!-- Slot para contenido personalizado -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      title: String
    },
    methods: {
      closeModal() {
        this.$emit("close");
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
  }
  </style>
  