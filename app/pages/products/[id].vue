<script setup lang="ts">
import { MOCK_PRODUCTS } from '~/utils/constants/products'
import { useWishlistStore } from '~/stores/wishlist'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const productId = Number(route.params.id)
const wishlistStore = useWishlistStore()

// Fetching single product server-side
const { data: product, error } = await useAsyncData(`product-${productId}`, () => {
  const p = MOCK_PRODUCTS.find(item => item.id === productId)
  if (!p) throw createError({ statusCode: 404, statusMessage: t('products.notFound') })
  return Promise.resolve(p)
})

// Dynamic SEO using product data
if (product.value) {
  useSeoMeta({
    title: () => `${product.value?.name} | My Nuxt Shop`,
    ogTitle: () => `${product.value?.name} - Only $${product.value?.price}`,
    description: () => product.value?.description || '',
    ogDescription: () => product.value?.description || '',
    ogImage: () => product.value?.image || '',
    twitterCard: 'summary_large_image',
  })
}
</script>

<template>
  <div class="product-detail py-8">
    <div v-if="product" class="max-w-4xl mx-auto">
      <UButton :to="localePath('/products')" variant="ghost" icon="i-heroicons-arrow-left" class="mb-6 text-slate-600 hover:text-slate-900">
        {{ t('products.backToCatalog') }}
      </UButton>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="w-full rounded-3xl shadow-xl border border-slate-200/50">
        </div>

        <div class="product-info flex flex-col justify-center">
          <UBadge color="primary" variant="subtle" size="lg" class="w-fit mb-4">
            {{ product.category }}
          </UBadge>
          <h1 class="text-4xl font-black mb-4 text-slate-900 tracking-tight leading-tight">{{ product.name }}</h1>
          <p class="text-3xl font-black text-slate-900 mb-6">$ {{ product.price }}</p>
          <p class="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
            {{ product.description }}
          </p>

          <div class="flex gap-4">
            <UButton size="xl" color="primary" block class="rounded-2xl font-bold py-4 shadow-lg shadow-primary-500/20">
              {{ t('products.addToCart') }}
            </UButton>
            <UButton 
              size="xl" 
              :color="wishlistStore.isFavorite(product.id) ? 'error' : 'neutral'" 
              variant="outline" 
              :icon="wishlistStore.isFavorite(product.id) ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'" 
              class="rounded-2xl px-5 border-slate-200"
              @click="wishlistStore.toggleFavorite(product.id)"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <UIcon name="i-heroicons-exclamation-triangle" class="text-6xl text-slate-300 mb-4" />
      <h2 class="text-3xl font-bold text-slate-900 mb-4">{{ t('products.notFound') }}</h2>
      <UButton :to="localePath('/products')" color="primary" size="lg" class="rounded-xl">{{ t('products.returnToCatalog') }}</UButton>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  min-height: 100vh;
}
</style>
