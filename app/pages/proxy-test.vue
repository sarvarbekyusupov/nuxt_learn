<script setup lang="ts">
const { data, refresh, pending } = await useFetch('/api/proxy');
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Proxy Test</h1>
    
    <div v-if="pending">Loading...</div>
    <div v-else-if="data">
      <div class="mb-4">
        <strong>Timestamp (from server):</strong> {{ (data as any).timestamp }}
        <p class="text-sm text-gray-500">Notice: If you refresh, this timestamp won't change due to server caching (1 hour).</p>
      </div>
      
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
        @click="refresh()" 
      >
        Refresh Data
      </button>

      <div class="mt-4">
        <h2 class="font-bold">External API Data (Success: {{ (data as any).success }}):</h2>
        <pre class="bg-gray-100 p-2 rounded max-h-60 overflow-auto">{{ (data as any).data }}</pre>
      </div>
    </div>
  </div>
</template>
