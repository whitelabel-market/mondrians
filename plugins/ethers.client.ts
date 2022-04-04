import { ethers } from 'ethers'

export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      ethers
    }
  }
})
