<script setup>
import Main from "./view/Main.vue";
</script>

<template>
  <div
    v-if="isShowMask"
    style="
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      backdrop-filter: blur(1000px);
      opacity: 0.9;
    "
  >
    <img src="./assets/roate1.gif" />
  </div>
  <div v-else>
    <div class="title-text">單機版暗棋</div>
    <Main />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const evt = "onorientationchange" in window ? "orientationchange" : "resize";   
    const renderResize = () => {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      // alert(width+"宽高"+height)
      console.log(width, height);
      if (width > height) {
        alert("横屏1");
      } else {
        alert("竖屏1");
      }
    };
    onMounted(() => {
      window.addEventListener(orientationchange, renderResize());
      if (window.orientation == 0 || window.orientation == 180) {
        alert("豎屏");
      } else {
        alert("橫屏");
      }
    });
    return {
      renderResize,
    };
    // const isShowMask = ref(true);
    // return {
    //   isShowMask,
    // };
  },
  components: {
    Main,
  },
  data() {
    return {
      isShowMask: false,
    };
  },
};
</script>

<style scoped></style>
