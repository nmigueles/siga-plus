<template>
  <div class="container">
    <div class="course" v-for="course in courses" :key="course.id">
      <div class="name">{{ course.name }}</div>
      <div class="actions">
        <a class="meet" :href="course.actions.meet">Meet</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      courses: [
        {
          id: "1",
          name: "Algoritmos",
          actions: {
            meet: "https://meet.google.com/hot-shsw-nrw?authuser=1",
          },
        },
        {
          id: "2",
          name: "Arquitectura",
          actions: {
            meet: "https://meet.google.com/hot-shsw-nrw?authuser=1",
          },
        },
        {
          id: "3",
          name: "Sistemas y Organizaciones",
          actions: {
            meet: "https://meet.google.com/hot-shsw-nrw?authuser=1",
          },
        },
      ],
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
