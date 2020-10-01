<template>
  <div class="container">
    <span class="username">Nicolás Migueles</span>
    <div class="profile-picture">
      <img src="avatar.png" alt="Profile picture" lazy />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 2em;
}
.profile-picture {
  width: 3em;
  height: 3em;
  border-radius: 1.5em;
  margin-left: 1em;
  cursor: pointer;
  pointer-events: none;
}
.profile-picture img {
  width: 3em;
  height: 3em;
  border-radius: 1.5em;
}

.username {
  font-size: 1.1em;
  font-weight: 600;
  text-align: left;
  line-height: 1em;
  margin-bottom: 0.3em;
  pointer-events: none;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
}

@media (max-width: 800px) {
  .username {
    font-size: 0.9em;
    margin-bottom: 0.5em;
  }
  .profile-picture {
    width: 2em;
    height: 2em;
    border-radius: 1em;
    background-color: tomato;
    margin-left: 1em;
    cursor: pointer;
  }
}

@media (max-width: 600px) {
  .container {
    height: 1em;
  }
  .profile-picture {
    display: none;
  }
}
</style>
