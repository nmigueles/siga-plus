<template>
  <Clock />
  <Background />
</template>

<script>
import Clock from "@/components/Clock.vue";
import Background from "@/components/Background.vue";

export default {
  name: "App",
  components: {
    Background,
    Clock,
  },
};
</script>

<style>
#app {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: black;
}
</style>
