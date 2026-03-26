<script setup lang="ts">
import { MOCK_PRODUCTS } from '~/utils/constants/products'
import { useWishlistStore } from '~/stores/wishlist'

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n()
const localePath = useLocalePath()
const wishlistStore = useWishlistStore()

// Simulating server-side data fetching
const { data: products } = await useAsyncData('products', () => {
  return Promise.resolve(MOCK_PRODUCTS)
})

// Dynamic SEO
useSeoMeta({
  title: () => `${t('products.catalog')} | My Nuxt App`,
  ogTitle: () => t('products.catalog'),
  description: 'Check out our wide range of high-quality products from electronics to home and lifestyle.',
  ogDescription: 'Check out our wide range of high-quality products from electronics to home and lifestyle.',
  ogImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
  twitterCard: 'summary_large_image',
})

const handleCardClick = (id: number) => {
  navigateTo(localePath(`/products/${id}`))
}

const toggleFavorite = (event: Event, id: number) => {
  event.stopPropagation() // Prevent card click
  wishlistStore.toggleFavorite(id)
}
</script>

<template>
  <div class="products-catalog py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-slate-900">{{ t('products.catalog') }}</h1>
    
    <div v-if="products" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <UCard 
        v-for="product in products" 
        :key="product.id"
        class="bg-white border-slate-200/60 hover:border-primary-500 transition-all cursor-pointer relative group shadow-sm hover:shadow-md"
        @click="handleCardClick(product.id)"
      >
        <template #header>
          <div class="relative overflow-hidden">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110">
            <UButton
              class="absolute top-2 right-2 rounded-full z-10"
              :color="wishlistStore.isFavorite(product.id) ? 'error' : 'neutral'"
              variant="solid"
              :icon="wishlistStore.isFavorite(product.id) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
              @click="toggleFavorite($event, product.id)"
            />
          </div>
        </template>
        
        <div class="p-2">
          <UBadge color="primary" variant="subtle" class="mb-2">{{ product.category }}</UBadge>
          <h2 class="text-lg font-bold mb-2 text-slate-900">{{ product.name }}</h2>
          <p class="text-slate-500 text-sm line-clamp-2 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-black text-slate-900">$ {{ product.price }}</span>
            <UButton color="primary" variant="solid" size="sm" class="rounded-lg">{{ t('products.viewDetails') }}</UButton>
          </div>
        </div>
      </UCard>
    </div>
    
    <div v-else class="text-center py-20">
      <UIcon name="i-heroicons-shopping-bag" class="text-6xl text-slate-300 mb-4" />
      <p class="text-xl text-slate-400 font-medium">{{ t('products.loading') }}</p>
    </div>
  </div>
</template>

<style scoped>
.products-catalog {
  min-height: 100vh;
}
</style>
