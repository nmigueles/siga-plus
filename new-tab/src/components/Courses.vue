<template>
  <div class="container" v-if="!siga.loading">
    <div class="title">Hoy</div>
    <div v-for="course in filtered" :key="course.courseSigaId">
      <div class="course">
        <div class="dot" :style="`background-color: ${course.colour}`" />
        <div class="name">
          {{ course.name }}
        </div>
        <!-- <div class="actions">
        <a class="meet" :href="course.actions.meet">Meet</a>
      </div> -->
      </div>
      <div class="additional-info">
        {{ course.startHour[course.dateIndex] }} -
        {{ course.finishHour[course.dateIndex] }}
      </div>
    </div>
  </div>
</template>

<script>
import useSiga from "@/hooks/useSiga";
import { computed } from "vue";

export default {
  setup() {
    const today = (new Date().getDay() + 2) % 7;
    console.log(today);
    const siga = useSiga();
    const filtered = computed(() => {
      if (siga.data) {
        const f = [];
        for (const c of siga.data) {
          if (c.day.includes(today)) {
            const dateIndex = c.day.indexOf(today);
            c.dateIndex = dateIndex;
            f.push(c);
          }
        }
        return f;
      }
    });

    return {
      siga,
      filtered,
      today,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.course {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0.5em 0 0 0;
}
.title {
  font-size: 1.2em;
  font-weight: 600;
}
.dot {
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  margin-right: 0.3em;
}
.name {
  text-align: left;
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 0.1em;
}
.additional-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.8em;
  font-weight: 600;
}
.actions {
  visibility: hidden;
}

.course:hover .actions {
  visibility: visible;
}
</style>
