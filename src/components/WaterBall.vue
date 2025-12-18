<template>
  <div class="water-ball">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { createWaterBall } from "@/composables/useWaterBall";

const props = defineProps<{
  value: number;
}>();

const canvasEl = ref<HTMLCanvasElement | null>(null);
let instance: { destroy: () => void } | null = null;

onMounted(() => {
  if (!canvasEl.value) return;
  instance = createWaterBall(canvasEl.value, props.value);
});

onBeforeUnmount(() => {
  instance?.destroy();
});


watch(
  () => props.value,
  () => {
    instance?.destroy();
    if (canvasEl.value) {
      instance = createWaterBall(canvasEl.value, props.value);
    }
  }
);
</script>

<style scoped>
.water-ball {
  width: 120px;
  height: 120px;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
