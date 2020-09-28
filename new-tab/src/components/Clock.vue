<template>
  <div class="clock">
    <h1>{{ hora }}</h1>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive } from "vue";
const state = reactive({
  hora: "00",
  minuto: "00",
});

function pad(number) {
  let string = new String(number);
  if (string.length == 1) string = "0" + string;
  return string;
}
function tick() {
  const momentoActual = new Date();
  state.hora = pad(momentoActual.getHours());
  state.minuto = pad(momentoActual.getMinutes());
}

let tickInterval;

onMounted(() => {
  tick();
  tickInterval = setInterval(tick, 1000);
});
onUnmounted(() => clearInterval(tickInterval));

export const hora = computed(() => state.hora + ":" + state.minuto);
</script>

<style scoped>
.clock {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  font-size: 6em;
  line-height: 1;
}
</style>