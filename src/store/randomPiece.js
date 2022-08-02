const orginPieceItem = [
  { name: "兵", color: "red", num: 5, isOpen: false },
  { name: "傌", color: "red", num: 2, isOpen: false },
  { name: "相", color: "red", num: 2, isOpen: false },
  { name: "仕", color: "red", num: 2, isOpen: false },
  { name: "炮", color: "red", num: 2, isOpen: false },
  { name: "俥", color: "red", num: 2, isOpen: false },
  { name: "帥", color: "red", num: 1, isOpen: false },
  { name: "卒", color: "black", num: 5, isOpen: false },
  { name: "馬", color: "black", num: 2, isOpen: false },
  { name: "象", color: "black", num: 2, isOpen: false },
  { name: "士", color: "black", num: 2, isOpen: false },
  { name: "砲", color: "black", num: 2, isOpen: false },
  { name: "車", color: "black", num: 2, isOpen: false },
  { name: "將", color: "black", num: 1, isOpen: false },
];
const getRank = () => {
  const pieceRank = {
    卒: 1,
    砲: 2,
    馬: 3,
    車: 4,
    象: 5,
    士: 6,
    將: 7,
    兵: 1,
    炮: 2,
    傌: 3,
    俥: 4,
    相: 5,
    仕: 6,
    帥: 7,
  };
  return pieceRank;
};
const getRandomNumber = (size) => {
  return Math.floor(Math.random() * Math.floor(size));
};

const createPieceRowColumn = () => {
  let processPieceItem = JSON.parse(JSON.stringify(orginPieceItem));

  let column = [[], [], [], []];
  let tempColumn = [];
  while (processPieceItem.length !== 0 || column === []) {
    let randomColumnNum = getRandomNumber(column.length);
    let pieceRandomNum = getRandomNumber(processPieceItem.length);
    const columnSize =
      column[randomColumnNum] !== undefined
        ? column[randomColumnNum].length
        : 0;
    if (columnSize === 8) {
      tempColumn.push(column[randomColumnNum]);
      column.splice(randomColumnNum, 1);
      continue;
    }
    if (processPieceItem[pieceRandomNum].num === 0) {
      processPieceItem.splice(pieceRandomNum, 1);
      continue;
    }
    column[randomColumnNum].push({
      name: processPieceItem[pieceRandomNum].name,
      color: processPieceItem[pieceRandomNum].color,
      isOpen: processPieceItem[pieceRandomNum].isOpen,
    });
    processPieceItem[pieceRandomNum].num =
      processPieceItem[pieceRandomNum].num - 1;
  }
  return tempColumn;
};
export { createPieceRowColumn, getRank };
