import { reactive, watchEffect } from "vue";

const dataCache = new Map();

export default function useFetch(url, cache = false) {
  const state = reactive({
    loading: false,
    error: "",
    data: null
  });

  const fetchData = async () => {
    state.loading = true;
    state.data = null;
    state.error = "";
    try {
      if (dataCache.has(url.value)) {
        state.data = dataCache.get(url.value);
      } else {
        const response = await fetch(url.value, {
          headers: {
            accept: "application/json"
          }
        });
        if (response.ok) {
          const json = await response.json();
          state.data = json;
          if (cache) {
            dataCache.set(url.value, json);
          }
        } else {
          state.error = "Error fetching data.";
        }
      }
    } catch (error) {
      state.error = `Error fetching data. ${error.message}`;
    }
    state.loading = false;
  };

  watchEffect(() => {
    fetchData();
  });

  return state;
}
