class knightMoves {
  constructor() {
    this.graph = this.buildKnightGraph(8);
  }

  positionToInt(arr, boardSize = 8) {
    return boardSize * arr[0] + arr[1];
  }

  positionToArr(int, boardSize = 8) {
    return [Math.floor(int / boardSize), int % boardSize];
  }

  buildKnightGraph(boardSize = 8) {
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
    let knightGraph = {};

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const position = [i, j];
        const positionMoves = {};
        for (const move of legalMoves) {
          if (
            position[0] + move[0] >= 0 &&
            position[0] + move[0] < boardSize &&
            position[1] + move[1] >= 0 &&
            position[1] + move[1] < boardSize
          ) {
            const positionIndex = this.positionToInt([
              position[0] + move[0],
              position[1] + move[1],
            ]);
            positionMoves[positionIndex] = 1;
          }
        }
        const graphIndex = i * boardSize + j;
        knightGraph[graphIndex] = positionMoves;
      }
    }
    return knightGraph;
  }

  knightMoves(start, end, graph = this.graph) {
    let distances = {},
      previous = {},
      unvisited = new Set();
    for (let node in graph) {
      distances[node] =
        parseInt(node) === this.positionToInt(start) ? 0 : Infinity;
      unvisited.add(node);
    }

    while (unvisited.size) {
      let closestNode = null;
      for (let node of unvisited) {
        if (!closestNode || distances[node] < distances[closestNode]) {
          closestNode = node;
        }
      }

      if (distances[closestNode] === Infinity) break;
      if (parseInt(closestNode) === this.positionToInt(end)) break;

      for (let neighbor in graph[closestNode]) {
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = closestNode;
        }
      }
      unvisited.delete(closestNode);
    }

    let path = [];
    let node = this.positionToInt(end);
    while (node) {
      path.push(node);
      node = previous[node];
    }
    for (let i = 0; i < path.length; i++) {
      path[i] = this.positionToArr(parseInt(path[i]));
    }
    path = path.reverse();
    console.log(`You made it in ${path.length} moves ! Here's your path:`);
    for (let move of path) {
      console.log(move);
    }
    return path;
  }
}

let test = new knightMoves();

test.knightMoves([0, 0], [3, 3]);
test.knightMoves([0, 0], [7, 7]);
test.knightMoves([0, 0], [4, 7]);
