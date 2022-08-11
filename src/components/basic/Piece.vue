<template>
  <main>    
    <div
      v-if="pieceObj.name !== ''"
      :class="
        processPieceNowColorToShowBorder(pieceObj.color) ? 'rect-border' : ''
      "
    >
      <div
        v-if="pieceObj.isOpen"
        :class="getPieceCycleColorClass(pieceObj.color)"
        @click="getIndex(pieceObj)"
      >
        <button :class="getPieceSecondCycleColorClass(pieceObj.color)">
          <div :class="getPieceColorClass(pieceObj.color)">
            {{ pieceObj.name }}
          </div>
        </button>
      </div>
      <div
        v-else
        class="no-open-piece-test"
        @click="openPiece(pieceObj.color)"
      ></div>
    </div>
    <div class="no-piece" v-else @click="clickEmpty(pieceObj)" />
    <audio controls hidden ref="openPieceMusic" Volume="100">
      <source src="../../assets/openPiece.wav" type="audio/wav" />
    </audio>
    <audio controls hidden ref="movePiece" Volume="100">
      <source src="../../assets/movePiece.mp3" type="audio/mp3" />
    </audio>
  </main>
</template>
<script>
import { usePieceStore } from "../../store/pieceStatus";
import { getRank } from "../../store/randomPiece";
import { ref } from "vue";

export default {
  setup(props) {
    const openPieceMusic = ref();
    const movePiece = ref();
    const getPieceType = usePieceStore();
    const getPieceColorClass = (color) => {
      return color === "red" ? "font-piece-red" : "font-piece-black";
    };
    const processPieceNowColorToShowBorder = (color) => {
      return getPieceType.nowPieceColor === color;
    };
    const getPieceCycleColorClass = (color) => {
      let pieceCycleClass = [];
      if (color === "red") {
        pieceCycleClass.push("piece-cycle-red");
      } else {
        pieceCycleClass.push("piece-cycle-black");
      }
      return pieceCycleClass;
    };
    const getPieceSecondCycleColorClass = (color) => {
      return color === "red"
        ? "second-piece-cycle-red"
        : "second-piece-cycle-black";
    };
    const processIsCanMove = (targetX, targetY) => {
      const lastX = getPieceType.lastXPosition;
      const lastY = getPieceType.lastYPosition;
      const targetObj = { x: targetX, y: targetY };
      const top = lastY - 1;
      const down = lastY + 1;
      const left = lastX - 1;
      const right = lastX + 1;
      const canMoveArray = [
        { x: lastX, y: top },
        { x: lastX, y: down },
        { x: left, y: lastY },
        { x: right, y: lastY },
      ];
      let checkBol = false;
      canMoveArray.forEach((element) => {
        if (JSON.stringify(element) === JSON.stringify(targetObj)) {
          checkBol = true;
        }
      });
      return checkBol;
    };
    //用來確認路徑上是否有一顆棋子
    const checkPathIsHavePiece = () => {};
    const processIsBoCanEat = (targetX, targetY) => {
      const lastX = getPieceType.lastXPosition;
      const lastY = getPieceType.lastYPosition;
      const isRunY = lastX === targetX;
      const isRunX = lastY === targetY;
      const targetObj = { x: targetX, y: targetY };
      if (isRunX) {
        const firstIndex = targetX > lastX ? lastX : targetX;
        const secnodIndex = targetX < lastX ? lastX : targetX;
        const pathPieceArray = getPieceType.pieceArray[lastY].slice(
          firstIndex + 1,
          secnodIndex
        );
        let count = 0;
        pathPieceArray.forEach((element) => {
          if (element.name !== "") {
            count = count + 1;
          }
        });
        return count === 1 ? true : false;
      }
      if (isRunY) {
        const firstIndex = targetY > lastY ? lastY : targetY;
        const secnodIndex = targetY < lastY ? lastY : targetY;
        let count = 0;
        for (let i = firstIndex; i < secnodIndex; i++) {
          if (getPieceType.pieceArray[i][lastX].name !== "") {
            count++;
          }
        }
        return count === 2 ? true : false;
      }
    };
    const processIsCanEat = (eatName) => {
      const rank = getRank();
      switch (rank[getPieceType.lastPieceName]) {
        case 1: {
          if (rank[eatName] === 1 || rank[eatName] === 7) {
            return true;
          }
          break;
        }
        case 2: {
          return true;
        }
        case 7: {
          if (rank[eatName] === 1) {
            return false;
          }
          return rank[getPieceType.lastPieceName] >= rank[eatName];
        }
        default: {
          return rank[getPieceType.lastPieceName] >= rank[eatName];
        }
      }
    };
    const getIndex = (obj) => {
      if (obj.color === getPieceType.nowPieceColor) {
        getPieceType.actionSetLastPosition(props.columnIndex, props.rowIndex);
        getPieceType.actionSetIsClickNowColorPiece(true);
        getPieceType.actionsSetLastPieceName(obj.name);
      } else {
        if (getPieceType.isClickNowColorPiece) {
          const rank = getRank();
          const isCanMove =
            rank[getPieceType.lastPieceName] !== 2
              ? processIsCanMove(props.columnIndex, props.rowIndex)
              : processIsBoCanEat(props.columnIndex, props.rowIndex);
          const isCanEat = processIsCanEat(obj.name);
          if (isCanMove && isCanEat) {
            // // 被吃得
            // console.log(
            //   "被吃得",
            //   getPieceType.pieceArray[props.rowIndex][props.columnIndex]
            // );
            // //主動要吃的
            // console.log(
            //   "主動吃的",
            //   getPieceType.pieceArray[getPieceType.lastYPosition][
            //     getPieceType.lastXPosition
            //   ]
            // );
            // 棋子吃掉並且移動
            if (
              getPieceType.pieceArray[getPieceType.lastYPosition][
                getPieceType.lastXPosition
              ].name !== ""
            ) {
              movePiece.currentTime = 0;
              movePiece.value.play();
              getPieceType.actionSetIsBeEatPiece(
                getPieceType.pieceArray[props.rowIndex][props.columnIndex]
              );
              getPieceType.pieceArray[props.rowIndex][props.columnIndex].name =
                getPieceType.pieceArray[getPieceType.lastYPosition][
                  getPieceType.lastXPosition
                ].name;
              getPieceType.pieceArray[props.rowIndex][props.columnIndex].color =
                getPieceType.pieceArray[getPieceType.lastYPosition][
                  getPieceType.lastXPosition
                ].color;
              getPieceType.pieceArray[getPieceType.lastYPosition][
                getPieceType.lastXPosition
              ].name = "";
              getPieceType.actionSetLastPosition(null, null);
              getPieceType.actionsSetLastPieceName("");
              const nextColor =
                getPieceType.nowPieceColor === "red" ? "black" : "red";
              getPieceType.actionsSetNowPieceColor(nextColor);
            }
          }
        }
      }
    };
    const clickEmpty = (obj) => {
      movePiece.currentTime = 0;
      movePiece.value.play();
      const isCanMove = processIsCanMove(props.columnIndex, props.rowIndex);
      if (isCanMove && obj.name === "") {
        getPieceType.pieceArray[props.rowIndex][props.columnIndex].name =
          getPieceType.pieceArray[getPieceType.lastYPosition][
            getPieceType.lastXPosition
          ].name;
        getPieceType.pieceArray[props.rowIndex][props.columnIndex].color =
          getPieceType.pieceArray[getPieceType.lastYPosition][
            getPieceType.lastXPosition
          ].color;
        getPieceType.pieceArray[getPieceType.lastYPosition][
          getPieceType.lastXPosition
        ].name = "";
        const nextColor =
          getPieceType.nowPieceColor === "red" ? "black" : "red";
        getPieceType.actionsSetNowPieceColor(nextColor);
      }
    };
    const openPiece = (color) => {
      openPieceMusic.currentTime = 0;
      openPieceMusic.value.play();
      if (!getPieceType.isGameStart) {
        let firstColor = color === "red" ? "紅方" : "黑方";
        let secondColor = color === "red" ? "黑方" : "紅方";
        const nowColor = color === "red" ? "black" : "red";
        getPieceType.actionStartStatus(true);
        getPieceType.actionsOffensiveMove(firstColor);
        getPieceType.actionsdefensiveMove(secondColor);
        getPieceType.actionsSetNowPieceColor(nowColor);
      } else {
        getPieceType.actionsSetNowPieceColor(
          getPieceType.nowPieceColor === "red" ? "black" : "red"
        );
      }
      getPieceType.actionsSetPieceIsOpen(props.rowIndex, props.columnIndex);
    };
    return {
      getPieceType,
      movePiece,
      openPieceMusic,
      checkPathIsHavePiece,
      clickEmpty,
      processIsCanMove,
      processIsBoCanEat,
      processPieceNowColorToShowBorder,
      processIsCanEat,
      getIndex,
      getPieceColorClass,
      getPieceCycleColorClass,
      getPieceSecondCycleColorClass,
      openPiece,
    };
  },
  props: {
    pieceObj: {
      type: Object,
      default: () => {},
    },
    //橫的
    columnIndex: {
      type: Number,
      default: null,
    },
    //直的
    rowIndex: {
      type: Number,
      default: null,
    },
  },
};
</script>
