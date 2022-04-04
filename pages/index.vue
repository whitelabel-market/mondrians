<template>
  <div>
    <HomeHero />
    <HomeAbout />
    <HomeItemGallery />
    <HomeRoadmap />
    <HomeRarity />
    <HomeInfo />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
<script setup>
import Connector from '../libs/@walletConnector'

const connector = Connector.init({
  appName: 'Mondrians',
  infuraId: '',
  authereum: { key: '' },
  fortmatic: { key: '' }
})

console.log('providers', connector.providers)

</script>
