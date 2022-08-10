import { defineStore } from "pinia";

export const usePieceStore = defineStore("pieceData", {
  state: () => ({
    pieceArray: [],
    isGameStart: false,
    offensiveMove: "",
    defensiveMove: "",
    nowPieceColor: "",
    lastXPosition: null,
    lastYPosition: null,
    lastPieceName: "",
    isClickNowColorPiece: false,
    blackPieceArray: [],
    redPieceArray: [],
  }),
  actions: {
    insertPieceArray(data) {
      this.pieceArray = JSON.parse(JSON.stringify(data));
    },
    actionStartStatus(bool) {
      this.isGameStart = bool;
    },
    actionsOffensiveMove(data) {
      this.offensiveMove = data;
    },
    actionsdefensiveMove(data) {
      this.defensiveMove = data;
    },
    actionsSetPieceIsOpen(rowIndex, columnIndex) {
      this.pieceArray[rowIndex][columnIndex].isOpen = true;
    },
    actionsSetNowPieceColor(color) {
      this.nowPieceColor = color;
    },
    actionSetLastPosition(x, y) {
      this.lastXPosition = x;
      this.lastYPosition = y;
    },
    actionsSetLastPieceName(name) {
      this.lastPieceName = name;
    },
    actionSetIsClickNowColorPiece(bool) {
      this.isClickNowColorPiece = bool;
    },
    actionSetIsBeEatPiece(type) {
      const color = type["color"];
      switch (color) {
        case "red": {
          this.redPieceArray.push(type.name);
          break;
        }
        case "black": {
          this.blackPieceArray.push(type.name);
          break;
        }
        default: {
          break;
        }
      }
    },
    actionSetPieceArrayClear(){
      this.blackPieceArray = [];
      this.redPieceArray = [];
    }
  },
});
