<template>
  <div class="container">
    <!-- <div class="course" v-for="course in courses" :key="course.id">
      <div class="name">{{ course.name }}</div>
      <div class="actions">
        <a class="meet" :href="course.actions.meet">Meet</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import useSiga from "@/hooks/useSiga";
export default {
  setup() {
    const siga = useSiga();

    return {
      siga,
    };
  },
};
</script>

<style scoped>
.course {
  display: flex;
  margin: 1em 0;
}
.name {
  text-align: left;
  font-size: 1.1em;
  font-weight: 600;
}

.actions {
  visibility: hidden;
}

.course:hover .actions {
  visibility: visible;
}
</style>
