<template>
  <AppModal :model-value="props.modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="space-y-4">
      <div class="p-4">
        <h3 class="font-bold text-center text-xl">
          Please Connect your Wallet
        </h3>
      </div>

      <ul class="flex flex-col space-y-4 p-4">
        <li
          v-for="(p, i) of providers.slice(0, providersCollapsed ? providers.length : 3)"
          :key="i"
          class="flex justify-center w-full"
        >
          <button
            class="font-semibold inline-block bg-yellowish px-8 py-2 text-center text-lg rounded-xl mx-auto"
            @click.prevent="connectTo(p)"
          >
            {{ p.name }}
          </button>
        </li>
        <li class="flex justify-center w-full">
          <button
            class="px-8 py-2 text-center text-lg"
            @click.prevent="providersCollapsed = !providersCollapsed"
          >
            {{ providersCollapsed ? 'Show fewer options' : 'Show more options' }}
          </button>
        </li>
      </ul>
    </div>
  </AppModal>
</template>

<script lang="ts" setup>
import Connector from '../libs/@walletConnector'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const providers = Connector.init({
  appName: 'Mondrians',
  infuraId: '',
  authereum: { key: '' },
  fortmatic: { key: '' }
}).providers

const providersCollapsed = ref(false)

const connectTo = async ({ connect }) => {
  const instance = await connect()
  // ... do something with instance
  const { $ethers } = useNuxtApp()
  const provider = new $ethers.providers.Web3Provider(instance)
  const signer = provider.getSigner()
  console.log('wallet connected, signer', signer)

  emit('update:modelValue', false)
}

</script>
