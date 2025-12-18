<template>
  <div class="main">
    <div class="ballWarp">
      <WaterBall :value="23.56" />
      <WaterBall :value="68" />
      <WaterBall :value="84" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WaterBall from "@/components/WaterBall.vue";
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center; 
  align-items: center; 
  width: 100%;
  height: 100vh;

  .ballWarp{
    display: flex;
    flex-direction: row;
    gap: 24px;
  }
}
</style>
