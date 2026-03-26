<script setup lang="ts">
import { useCognito } from '@/composables/useCognito'

const { fetchUser } = useCognito()

onMounted(async () => {
  await fetchUser()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
    <UToaster />
  </div>
</template>
