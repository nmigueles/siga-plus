import { reactive } from "vue";
import app from "@/feathers";

export default function useSiga() {
  const state = reactive({
    loading: false,
    user: null,
    error: "",
    data: null
  });

  app
    .reAuthenticate()
    .then(({ user }) => {
      state.user = user;
      loggedContext();
    })
    .catch(() => {
      app
        .authenticate({
          strategy: "local",
          username: "nmigueles",
          password: "2439" // Hardcoded for develop ease.
        })
        .then(({ user }) => {
          state.user = user;
          loggedContext();
        })
        .catch(e => {
          console.error("Authentication error", e);
        });
    });

  async function loggedContext() {
    state.loading = true;
    state.data = (await app.service("courses").find()).data;
    state.loading = false;
  }

  return state;
}
