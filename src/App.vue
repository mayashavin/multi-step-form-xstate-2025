<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header
    class="capitalize flex opacity-95 text-white justify-between sticky top-0 bg-mayas-default z-100 backdrop-blur-sm"
  >
    <h1 class="logo text-2xl font-bold">Multi form demo</h1>
  </header>
  <RouterView />
</template>
<style scoped>
@import url('./assets/base.css');
</style>
