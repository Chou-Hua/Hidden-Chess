<script setup>
import Main from "./view/Main.vue";
</script>

<template>
  <div       
  style=" 
  z-index: 1; 
    position:fixed;
    top     : 0;
    left    : 0;
    bottom  : 0;
    right   : 0;
    background-color: white;
    backdrop-filter: blur(1000px);
    opacity: 0.9;    
    "
  > <div style="top:35%;left: 35%;position: absolute;">請旋轉螢幕</div>
  <!-- <img src="./assets/roate1.gif" style="z-index: 7;
    top: 35%;
    left: 35%;
    background-color: red;
    position: absolute;
    opacity: 1;"/> -->
  </div>
  <div class="title-text">單機版暗棋</div>
  <Main />

</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let isShowMask = ref(true);
    return{
      isShowMask
    }
  },
  components: {
    Main,
  },
};
</script>

<style scoped></style>
