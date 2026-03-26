<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
});
</script>

<template>
  <div class="admin-page p-8">
    <h1 class="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
    <p class="text-lg text-gray-300">
      Welcome to the protected admin area. This page is only accessible if you
      have the 'auth_token' cookie.
    </p>
    <div class="mt-8">
      <UButton to="/" color="neutral">Back to Home</UButton>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  background-color: #1a1a1a;
}
</style>
