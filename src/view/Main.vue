<template>
  <div v-if="isShowMask()">
    <Mask />
  </div>
  <div v-else>
    <div class="title-text">單機版暗棋</div>
    <main class="main-background">
      <div class="d-flex">
        <div class="piece-list-div direction-rtl">
          <EatPiece
            :pieceArray="getBeEatArray(getPieceStore.defensiveMove)"
            :pieceColor="getPieceStore.defensiveMove"
          />
        </div>
        <div>
          <div style="display: flex; justify-content: space-between">
            <div class="d-flex title-font">
              <div>先手: {{ getPieceStore.offensiveMove }}</div>
            </div>
            <div class="now-round">
              &nbsp;{{ getNowPieceColor() }}&nbsp;
              <div v-html="getNowPieceColorCycle()"></div>
            </div>
            <div class="float-right title-font">
              <div>&nbsp;後手: {{ getPieceStore.defensiveMove }}</div>
            </div>
          </div>
          <div id="piece" class="chess">
            <div
              class="d-flex"
              v-for="(item, index) in getPieceStore.pieceArray"
              :key="index"
            >
              <div v-for="(data, num) in item" :key="num">
                <div class="square">
                  <div>
                    <Piece
                      :pieceObj="data"
                      :rowIndex="index"
                      :columnIndex="num"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="reset-button">
            <button @click="resetPiece">Reset</button>
          </div>
        </div>
        <div class="piece-list-div">
          <EatPiece
            :pieceArray="getBeEatArray(getPieceStore.offensiveMove)"
            :pieceColor="getPieceStore.offensiveMove"
          />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Piece from "../components/basic/Piece.vue";
import EatPiece from "./EatPiece.vue";
import { createPieceRowColumn } from "../store/randomPiece";
import { usePieceStore } from "../store/pieceStatus";
import { useCommonStore } from "../store/common";
import { onUpdated, onUnmounted, onMounted, nextTick } from "vue";
import Mask from "./Mask.vue";

export default {
  setup() {
    const commonStore = useCommonStore();
    const getPieceStore = usePieceStore();
    getPieceStore.actionSetPieceArrayClear();
    getPieceStore.insertPieceArray(createPieceRowColumn());
    onMounted(() => {
      window.addEventListener("load", roateChange());
    });
    onUnmounted(() => {
      window.removeEventListener("load", roateChange());
    });
    onUpdated(() => {
      processWhoWin();
    });
    const roateChange = () => {
      orientationChange();
      window.onorientationchange = orientationChange;
    };
    const orientationChange = () => {
      switch (window.orientation) {
        case 0:
          commonStore.actionsIsShowNeedToRotatePage(true);
          break;
        case -90:
          commonStore.actionsIsShowNeedToRotatePage(false);

          break;
        case 90:
          commonStore.actionsIsShowNeedToRotatePage(false);
          break;
        case 180:
          commonStore.actionsIsShowNeedToRotatePage(true);
          break;
      }
    };
    const resetPiece = () => {
      getPieceStore.pieceArray = createPieceRowColumn();
      getPieceStore.offensiveMove = "";
      getPieceStore.defensiveMove = "";
      getPieceStore.actionStartStatus(false);
      getPieceStore.actionsSetNowPieceColor("");
      getPieceStore.actionSetPieceArrayClear();
    };
    const processPieceNowColorToShowBorder = (color) => {
      return getPieceStore.nowPieceColor === color;
    };
    const getNowPieceColor = () => {
      if (getPieceStore.nowPieceColor === "") {
        return "賽局尚未開始!";
      } else {
        const name = getPieceStore.nowPieceColor === "red" ? "紅方" : "黑方";
        return "目前是:" + name + "的回合";
      }
    };
    const getNowPieceColorCycle = () => {
      if (getPieceStore.nowPieceColor === "") {
        return "<div></div>";
      } else {
        // const name = getPieceStore.nowPieceColor === "red" ? "紅方" : "黑方";
        return getPieceStore.nowPieceColor === "red"
          ? `<div class="red-cycle"></div>`
          : `<div class="black-cycle"></div>`;
      }
    };
    const getBeEatArray = (color) => {
      switch (color) {
        case "紅方": {
          return getPieceStore.redPieceArray;
        }
        case "黑方": {
          return getPieceStore.blackPieceArray;
        }
        default: {
          break;
        }
      }
    };
    const processWhoWin = () => {
      if (getPieceStore.redPieceArray.length >= 16) {
        alert("黑方獲勝");
        resetPiece();
      }
      if (getPieceStore.blackPieceArray.length >= 16) {
        alert("紅方獲勝");
        resetPiece();
      }
    };
    const isMobile = () => {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|ios|iPad|Android|Mobile|BlackBerry)/i
      );
      return flag;
    };
    const isShowMask = () => {
      return isMobile() && commonStore.isShowNeedToRotatePage;
    };

    return {
      getPieceStore,
      commonStore,
      roateChange,
      isShowMask,
      orientationChange,
      isMobile,
      getBeEatArray,
      resetPiece,
      getNowPieceColorCycle,
      getNowPieceColor,
      processPieceNowColorToShowBorder,
    };
  },
  components: {
    Piece,
    EatPiece,
    Mask,
  },
};
</script>
