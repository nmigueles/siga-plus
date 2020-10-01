<template>
  <div class="clock">
    <h1>{{ hora }}</h1>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive } from "vue";

export default {
  setup() {
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

    const hora = computed(() => state.hora + ":" + state.minuto);
    return {
      hora,
    };
  },
};
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
  font-size: 8em;
  line-height: 1;
  filter: drop-shadow(0 10px 5px rgba(0, 0, 0, 0.1));
}

@media (max-width: 990px) {
  h1 {
    font-size: 6em;
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 4em;
  }
}
</style>
