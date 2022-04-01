<template>
  <div>
    <NuxtLayout>
      <header>
        <TheHeader />
      </header>
      <main />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script>
import TheHeader from './components/TheHeader'
export default {
  components: { TheHeader }
}
</script>
