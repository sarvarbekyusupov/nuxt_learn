import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistIds = ref<number[]>([])

  const isFavorite = (id: number) => wishlistIds.value.includes(id)

  async function toggleFavorite(productId: number) {
    const exists = wishlistIds.value.includes(productId)
    
    // --- OPTIMISTIC UPDATE ---
    // Update local state immediately before the "server" call
    if (exists) {
      wishlistIds.value = wishlistIds.value.filter(id => id !== productId)
    } else {
      wishlistIds.value.push(productId)
    }

    try {
      // Simulate slow API call (1 second)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% chance to fail for testing "revert" logic
          if (Math.random() < 0.1) {
            reject(new Error('Failed to update wishlist on server'))
          } else {
            resolve(true)
          }
        }, 1000)
      })
      console.log('Server updated successfully')
    } catch (error) {
      // --- REVERT on failure ---
      console.error('Optimistic update failed, reverting...', error)
      if (exists) {
        wishlistIds.value.push(productId)
      } else {
        wishlistIds.value = wishlistIds.value.filter(id => id !== productId)
      }
      
      // Optionally notify the user
      const toast = useToast()
      toast.add({
        title: 'Error',
        description: 'Could not sync wishlist with server.',
        color: 'error'
      })
    }
  }

  return {
    wishlistIds,
    isFavorite,
    toggleFavorite
  }
})
