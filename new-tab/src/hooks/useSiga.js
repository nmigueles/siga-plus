import { reactive } from "vue";

export default function useSiga() {
  const state = reactive({
    loading: false,
    error: "",
    data: null
  });

  state.data = [];

  return state;
}
