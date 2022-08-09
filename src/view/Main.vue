<template>
  <main>
    <div style="display: flex; justify-content: space-between">
      <div class="d-flex">
        <div>
          先手: {{ getPieceStore.offensiveMove }}
        </div>
        <div>
          &nbsp;後手: {{ getPieceStore.defensiveMove }}
        </div>
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
              <Piece :pieceObj="data" :rowIndex="index" :columnIndex="num" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="reset-button">
      <button @click="resetPiece">Reset</button>
    </div>
  </main>
</template>
<script>
import Piece from "../components/basic/Piece.vue";
import { createPieceRowColumn } from "../store/randomPiece";
import { usePieceStore } from "../store/pieceStatus";

export default {
  setup() {
    const getPieceStore = usePieceStore();
    getPieceStore.insertPieceArray(createPieceRowColumn());
    const resetPiece = () => {
      getPieceStore.pieceArray = createPieceRowColumn();
      getPieceStore.offensiveMove = "";
      getPieceStore.defensiveMove = "";
      getPieceStore.actionStartStatus(false);
      getPieceStore.actionsSetNowPieceColor("");
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
        return getPieceStore.nowPieceColor === "red" ? `<div class="red-cycle"></div>` : `<div class="black-cycle"></div>`
        
      }
    };    
    return {
      getPieceStore,
      resetPiece,
      getNowPieceColorCycle,
      getNowPieceColor,
      processPieceNowColorToShowBorder,
    };
  },
  components: {
    Piece,
  },
};
</script>
