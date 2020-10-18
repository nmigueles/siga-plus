<template>
  <div ref="placeholder"></div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import useUnsplash from "@/hooks/useUnsplash";

export default {
  setup() {
    const unsplash = useUnsplash();
    const placeholder = ref(null);

    const color = computed(() => {
      if (unsplash.data) {
        return unsplash.data.color;
      }
      return "";
    });

    const imageSrc = computed(() => {
      if (unsplash.data) {
        return unsplash.data.urls.raw;
      }
      return "";
    });
    const lowSrc = computed(() => {
      if (unsplash.data) {
        return unsplash.data.urls.regular;
      }
      return "";
    });

    function loadImage() {
      console.log("Loading new image...");
      const img = new Image();
      img.className = "bg";
      img.src = lowSrc.value;
      if (placeholder.value) {
        placeholder.value.appendChild(img);
      }

      const imgFull = new Image();
      imgFull.className = "bg";
      imgFull.alt = "Background";
      imgFull.src = imageSrc.value;

      imgFull.onload = function () {
        delete imgFull.onload;
        if (placeholder.value) {
          placeholder.value.removeChild(img);
          placeholder.value.appendChild(imgFull);
        }
      };
    }

    onMounted(() => {
      watchEffect(() => {
        if (!unsplash.loading) {
          loadImage();
        }
      });
    });

    return {
      unsplash,
      placeholder,
      color,
      imageSrc,
      lowSrc,
    };
  },
};
</script>

<style>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  object-fit: cover;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>
