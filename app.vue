<template>
  <div>
    <NuxtLayout>
      <header>
        <TheHeader />
      </header>
      <main>
        <NuxtPage />
      </main>
      <footer><TheFooter /></footer>
    </NuxtLayout>
  </div>
</template>
<script>
import TheHeader from './components/TheHeader'
export default {
  components: { TheHeader }
}
</script>
