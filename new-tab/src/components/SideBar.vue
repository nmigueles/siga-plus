<template>
  <div
    v-bind:class="{
      sidebar: true,
      right: right,
      left: left,
      hcenter: hcenter,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    left: Boolean,
    right: Boolean,
    hcenter: Boolean,
  },
};
</script>

<style scoped>
.right {
  right: 0 !important;
  align-items: flex-end;
}
.left {
  left: 0 !important;
  align-items: flex-start;
}
.hcenter {
  justify-content: center !important;
}
.sidebar {
  position: absolute;
  display: flex;
  width: 30%;
  height: calc(100vh - 2em);
  justify-content: space-between;
  flex-direction: column;
  padding: 1em;
}
</style>
