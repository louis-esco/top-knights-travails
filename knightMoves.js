function convertPosition(arr, boardSize = 8) {
  return boardSize * arr[0] + arr[1];
}

function buildKnightGraph(boardSize = 8) {
  let legalMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  let knightGraph = [];

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const position = [i, j];
      const positionMoves = [];
      for (const move of legalMoves) {
        if (
          position[0] + move[0] >= 0 &&
          position[0] + move[0] < boardSize &&
          position[1] + move[1] >= 0 &&
          position[1] + move[1] < boardSize
        ) {
          positionMoves.push(
            convertPosition([position[0] + move[0], position[1] + move[1]])
          );
        }
      }
      knightGraph.push(positionMoves);
    }
  }
  console.log(knightGraph);
}

buildKnightGraph();
