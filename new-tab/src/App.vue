<template>
  <main>
    <SideBar left hcenter>
      <Courses />
    </SideBar>
    <SideBar right>
      <!-- <User /> -->
    </SideBar>
    <Clock />
    <Background />
  </main>
</template>

<script>
// import User from "@/components/User";
import Clock from "@/components/Clock";
import SideBar from "@/components/SideBar";
import Courses from "@/components/Courses";
import Background from "@/components/Background";

export default {
  name: "App",
  components: {
    // User,
    Clock,
    SideBar,
    Courses,
    Background,
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
  margin: 0;
  padding: 0;
  font-size: 16px;
}

body {
  margin: 0;
  overflow: hidden;
}
</style>
