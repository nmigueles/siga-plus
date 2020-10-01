import { reactive, onUnmounted } from "vue";

const cacheDuration = 900000; // 15 minutos.

let dataCache = JSON.parse(localStorage.getItem("unsplash"));
let cacheTime = localStorage.getItem("cacheTime");

const cacheExpired = () =>
  cacheTime ? new Date().getTime() - cacheTime > cacheDuration : true;

export default function useUnsplash() {
  const state = reactive({
    loading: false,
    error: "",
    data: null
  });

  const url = "https://api.unsplash.com/photos/random?collections=1053828";
  // TODO CACHE IN FIRST LOAD (localstorage)
  const fetchImages = async () => {
    state.loading = true;
    state.data = null;
    state.error = "";
    try {
      if (dataCache && !cacheExpired(new Date())) {
        state.data = dataCache;
      } else {
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            authorization:
              "Client-ID 1351e7003b0e869c6d7b221fe548c25216b16571ad28866446c06196ba1902d7"
          }
        });
        if (response.ok) {
          const json = await response.json();
          state.data = json;
          dataCache = json;
          localStorage.setItem("unsplash", JSON.stringify(json));
          cacheTime = new Date().getTime();
          localStorage.setItem("cacheTime", cacheTime);
        } else {
          state.error = "Error fetching data.";
        }
      }
    } catch (error) {
      state.error = `Error getting image. ${error.message}`;
    }
    state.loading = false;
  };
  fetchImages();
  const interval = setInterval(() => {
    fetchImages();
  }, 30000);

  onUnmounted(() => clearInterval(interval));

  return state;
}
