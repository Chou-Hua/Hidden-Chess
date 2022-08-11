<template>  
    <div
      v-for="(item, index) in splitPieceArrayToShow(pieceArray)"
      :key="index"
    >
      <div>
        <div class="piece-list" v-for="(data, num) in item" :key="num">
          <div
            class="eat-piece-first-cycle"
            :class="pieceColor === '紅方' ? 'border-red' : 'border-black'"
          >
            <div
              class="eat-piece-sec-cycle"
              :class="pieceColor === '紅方' ? 'border-red' : 'border-black'"
            >
              {{ data }}
            </div>
          </div>
        </div>
      </div>
    </div>  
</template>

<script>
import { usePieceStore } from "../store/pieceStatus";

export default {
  setup() {
    const group = (array, subGroupLength) => {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    };
    const splitPieceArrayToShow = (pieceArray) => {      
      return group(pieceArray, 7);
    };
    return {
      splitPieceArrayToShow,
      group,
    };
  },
  props: {
    pieceArray: {
      type: Array,
      default: () => [],
    },
    pieceColor: {
      type: String,
      default: "",
    },
  },
};
</script>
