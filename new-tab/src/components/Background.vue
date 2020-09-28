<template>
  <div>
    <h1 v-if="unsplash.loading">LOADING ....</h1>
    <img v-if="!unsplash.loading" :src="imageSrc" />
  </div>
</template>

<script setup>
import { computed } from "vue";

import useUnsplash from "@/hooks/useUnsplash";

export const unsplash = useUnsplash();

export const color = computed(() => {
  if (unsplash.data) {
    return unsplash.data.color;
  }
  return "";
});
export const imageSrc = computed(() => {
  if (unsplash.data) {
    return unsplash.data.urls.full;
  }
  return "";
});
</script>

<style scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  object-fit: cover;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>