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
        class="no-open-piece"
        @click="openPiece(pieceObj.color)"
      ></div>
    </div>
    <div class="d-none" v-else @click="clickEmpty(pieceObj)">{{ "dsadasdasd" }}</div>
  </main>
</template>
<script>
import { usePieceStore } from "../../store/pieceStatus";
import { getRank } from "../../store/randomPiece";

export default {
  setup(props) {
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
      // console.log(canMoveArray);
      let checkBol = false;
      canMoveArray.forEach((element) => {
        if (JSON.stringify(element) === JSON.stringify(targetObj)) {
          checkBol = true;
        }
      });
      return checkBol;
    };
    const processIsCanEat = (eatName) => {
      const rank = getRank();
      const isSpecial = 1 === rank[getPieceType.lastPieceName];
      if (!isSpecial) {
        return rank[getPieceType.lastPieceName] >= rank[eatName];
      }
    };
    const getIndex = (obj) => {
      if (obj.color === getPieceType.nowPieceColor) {
        getPieceType.actionSetLastPosition(props.columnIndex, props.rowIndex);
        getPieceType.actionSetIsClickNowColorPiece(true);
        getPieceType.actionsSetLastPieceName(obj.name);
      } else {
        if (getPieceType.isClickNowColorPiece) {
          const isCanMove = processIsCanMove(props.columnIndex, props.rowIndex);
          const isCanEat = processIsCanEat(obj.name);
          if (isCanMove && isCanEat) {
            //被吃得
            console.log(
              getPieceType.pieceArray[props.rowIndex][props.columnIndex]
            );
            //主動要吃的
            console.log(
              getPieceType.pieceArray[getPieceType.lastYPosition][
                getPieceType.lastXPosition
              ]
            );
            //棋子吃掉並且移動
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
            getPieceType.actionsSetLastPieceName('');            
          }
          // console.log("可不可以移動", isCanMove);
          // console.log("可不可以吃", isCanEat);
          // console.log("要吃掉的位置", props.columnIndex, props.rowIndex);
          // console.log(
          //   "移動的棋子的位置",
          //   getPieceType.lastXPosition,
          //   getPieceType.lastYPosition
          // );
        }
      }
    };
    const clickEmpty = (obj) => {
      const isCanMove = processIsCanMove(props.columnIndex, props.rowIndex);
      console.log(isCanMove);
      console.log("要吃掉的位置", props.columnIndex, props.rowIndex);
      console.log(
        "移動的棋子的位置",
        getPieceType.lastXPosition,
        getPieceType.lastYPosition
      );
      console.log(obj);
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
      }
    };
    const openPiece = (color) => {
      if (!getPieceType.isGameStart) {
        let firstColor = color === "red" ? "紅方" : "黑方";
        let secondColor = color === "red" ? "黑方" : "紅方";
        const nowColor = color === "red" ? "黑方" : "紅方";
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
      clickEmpty,
      processIsCanMove,
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
