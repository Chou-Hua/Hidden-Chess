<template>
  <main>
    <div class="d-flex">
      <div class="piece-list-div direction-rtl">
        <EatPiece
          :pieceArray="getBeEatArray(getPieceStore.offensiveMove)"
          :pieceColor="getPieceStore.offensiveMove"
        />
      </div>
      <div>
        <div style="display: flex; justify-content: space-between">
          <div class="d-flex">
            <div>先手: {{ getPieceStore.offensiveMove }}</div>
            <div>&nbsp;後手: {{ getPieceStore.defensiveMove }}</div>
          </div>
          <div class="float-right">
            <div class="d-flex">
              &nbsp;{{ getNowPieceColor() }}&nbsp;
              <div v-html="getNowPieceColorCycle()"></div>
            </div>
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
          :pieceArray="getBeEatArray(getPieceStore.defensiveMove)"
          :pieceColor="getPieceStore.defensiveMove"
        />
      </div>
    </div>
  </main>
</template>
<script>
import Piece from "../components/basic/Piece.vue";
import EatPiece from "./EatPiece.vue";
import { createPieceRowColumn } from "../store/randomPiece";
import { usePieceStore } from "../store/pieceStatus";
import { onUpdated } from "vue";

export default {
  setup() {
    const getPieceStore = usePieceStore();
    getPieceStore.actionSetPieceArrayClear();
    getPieceStore.insertPieceArray(createPieceRowColumn());
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
        case "red": {
          return getPieceStore.redPieceArray;
        }
        case "black": {
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
        console.log("blackWin");
      }
      if (getPieceStore.blackPieceArray.length >= 16) {
        alert("紅方獲勝");
        console.log("redWin");
      }
    };
    onUpdated(() => {
      processWhoWin();
    });
    return {
      getPieceStore,
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
  },
};
</script>
