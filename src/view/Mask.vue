<template>
  <div    
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
    <img src="../assets/roate1.gif" />
  </div>
</template>
<script>
// import { ref } from "vue";
// import { useCommonStore } from "../store/common";
// import { onUnmounted, onMounted } from "vue";

export default {
  setup() {
    // const commonStore = useCommonStore();
    // onMounted(() => {
    //   window.addEventListener("load", roateChange());
    // });
    // const roateChange = () => {
    //   orientationChange();
    //   window.onorientationchange = orientationChange;
    // };
    // const orientationChange = () => {
    //   switch (window.orientation) {
    //     case 0:
    //       commonStore.actionsIsShowNeedToRotatePage(true);
    //       alert(
    //         "肖像模式 0,screen-width: " +
    //           screen.width +
    //           "; screen-height:" +
    //           screen.height
    //       );
    //       break;
    //     case -90:
    //       commonStore.actionsIsShowNeedToRotatePage(false);
    //       alert(
    //         "左旋 -90,screen-width: " +
    //           screen.width +
    //           "; screen-height:" +
    //           screen.height
    //       );
    //       break;
    //     case 90:
    //       commonStore.actionsIsShowNeedToRotatePage(false);
    //       alert(
    //         "右旋 90,screen-width: " +
    //           screen.width +
    //           "; screen-height:" +
    //           screen.height
    //       );
    //       break;
    //     case 180:
    //       commonStore.actionsIsShowNeedToRotatePage(true);
    //       alert(
    //         "风景模式 180,screen-width: " +
    //           screen.width +
    //           "; screen-height:" +
    //           screen.height
    //       );
    //       break;
    //   }
    // };
    // onUnmounted(() => {
    //   window.removeEventListener("load", funct());
    // });
    // return {
    //   commonStore,
    //   roateChange,
    //   orientationChange,
    // };
  },
};
</script>
