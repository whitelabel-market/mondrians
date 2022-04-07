<template>
  <div>
    <LayoutHeader />
    <main>
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>
<script>
import LayoutFooter from "@/components/layouts/LayoutFooter";
import LayoutHeader from "@/components/layouts/LayoutHeader";
export default {
  components: { LayoutHeader, LayoutFooter },
};
</script>
