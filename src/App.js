import { useEffect, useState } from "react";
import "./app.css";

var cbi = Array(8).fill(Array(8).fill(""));
cbi[0] = [
  "white-rook",
  "white-knight",
  "white-bishop",
  "white-king",
  "white-queen",
  "white-bishop",
  "white-knight",
  "white-rook"
];
cbi[1] = Array(8).fill("white-pawn");
cbi[6] = Array(8).fill("black-pawn");
cbi[7] = [
  "black-rook",
  "black-knight",
  "black-bishop",
  "black-queen",
  "black-king",
  "black-bishop",
  "black-knight",
  "black-rook"
];

// let alpha = ["a", "b", "c", "d", "e", "f", "g", "h"];
// let obi = {
//   a: [
//     { currPiece: "rook", player: "white" },
//     { currPiece: "kni", player: "white" },
//     { currPiece: "bis", player: "white" },
//     { currPiece: "king", player: "white" },
//     { currPiece: "que", player: "white" },
//     { currPiece: "bis", player: "white" },
//     { currPiece: "kni", player: "white" },
//     { currPiece: "rook", player: "white" }
//   ],
//   b: Array(8).fill({ currPiece: "pawn", player: "white" }),
//   c: Array(8).fill({
//     currPiece: ""
//   }),
//   d: Array(8).fill({
//     currPiece: ""
//   }),
//   e: Array(8).fill({
//     currPiece: ""
//   }),
//   f: Array(8).fill({
//     currPiece: ""
//   }),
//   g: Array(8).fill({ currPiece: "pawn", player: "black" }),
//   h: [
//     { currPiece: "rook", player: "black" },
//     { currPiece: "kni", player: "black" },
//     { currPiece: "bis", player: "black" },
//     { currPiece: "king", player: "black" },
//     { currPiece: "que", player: "black" },
//     { currPiece: "bis", player: "black" },
//     { currPiece: "kni", player: "black" },
//     { currPiece: "rook", player: "black" }
//   ]
// };

function App() {
  const [cb, setCb] = useState(cbi);
  const [sel, setSel] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  // const [obb, setObb] = useState(obi);
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  useEffect(() => {
    let king = deleted.find((a) => a === "white-king" || a === "black-king");
    if (king) {
      setGameOver(true);
      if (king.includes("white")) {
        setWinner("Black");
      } else {
        setWinner("White");
      }
    }
  }, [cb, deleted]);
  // const isPossibleMove = (sel, i, j, tmp) => {
  //   if (sel[2].currPiece === "pawn") {
  //     if (sel[2].player === "black") {
  //       console.log(
  //         sel[0],
  //         sel[1],
  //         i,
  //         j,
  //         "lllll",
  //         i - sel[0],
  //         j === sel[1],
  //         tmp[alpha[i]][j - 1].currPiece,
  //         tmp[alpha[i]][j + 1].currPiece
  //       );
  //       // if ([sel[0]][sel[1]]) {
  //       // }
  //       if (
  //         obb[alpha[i]][j - 1].currPiece !== "" ||
  //         obb[alpha[i]][j + 1].currPiece !== ""
  //       ) {
  //         return true;
  //       } else if (sel[0] - i === 1 && j === sel[1]) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       if (
  //         obb[alpha[i]][j - 1].currPiece !== "" ||
  //         obb[alpha[i]][j + 1].currPiece !== ""
  //       ) {
  //         return true;
  //       } else if (i - sel[0] === 1 && j === sel[1]) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  // };
  const divClick = (i, j, c) => {
    let tmp = cb.map((a) =>
      a.map((c) => (c.includes("-pos") ? c.split("-pos")[0] : c))
    );
    if (c.includes("-pos")) {
      if (tmp[i][j].length > 0) {
        setDeleted([...deleted, tmp[i][j]]);
      }
      tmp[i][j] = sel[2];
      tmp[sel[0]][sel[1]] = "";
      setCb(tmp);
      setIsBlackTurn(!isBlackTurn);
    } else if (c.includes("pawn")) {
      checkPawn(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    } else if (c.includes("knight")) {
      checkKnight(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    } else if (c.includes("rook")) {
      checkRook(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    } else if (c.includes("bishop")) {
      checkBishop(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    } else if (c.includes("king")) {
      checkKing(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    } else if (c.includes("queen")) {
      checkQueen(tmp, i, j, c, isBlackTurn);
      setSel([i, j, c]);
      setCb(tmp);
    }
    // let tmp = { ...obi };
    // if (c.currPiece === "") {
    //   if (sel[2].currPiece === "pawn") {
    //     // console.log(tmp[alpha[i]][j]);
    //     if (isPossibleMove(sel, i, j, tmp)) {
    //       tmp[alpha[i]][j] = {
    //         ...tmp[alpha[i]][j],
    //         currPiece: sel[2].currPiece,
    //         player: sel[2].player,
    //       };
    //       tmp[alpha[sel[0]]][sel[1]] = {
    //         ...tmp[alpha[sel[0]]][sel[1]],
    //         currPiece: "",
    //         player: "",
    //       };
    //     }
    //   }
    //   setSel([]);
    // } else {
    //   if (c.currPiece === "pawn") {
    //     setSel([i, j, c]);
    //   }
    // }
    // setObb(tmp);
  };

  const restart = () => {
    setGameOver(false);
    setCb(cbi);
    setDeleted([]);
    setSel([]);
    setIsBlackTurn(true);
  };

  // if (gameOver) {
  //   return (
  //     <>
  //       <div className="gameover"> Game over </div>
  //       <div className="restart">
  //         <div onClick="{() => restart}"> Restart </div>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      {gameOver ? (
        <>
          <div className="gameover center"> Game over </div>
          <div className="winner center">
            Winner is Player - {winner} <br /> 🎉 Congratulations 🎉{" "}
          </div>
          <div className="restart center">
            <div onClick={restart}> Restart </div>
          </div>
        </>
      ) : (
        <div className="App">
          <div className="board">
            {cb.map((a, i) => {
              return a.map((c, j) => (
                <div
                  key={i + j}
                  className={`${
                    (i + j) % 2 === 0 ? "black block" : "white block"
                  } ${c.includes("pos") ? "anim" : ""}`}
                  onClick={() => divClick(i, j, c)}
                  style={{
                    backgroundColor: c.includes("pos") ? "#f9f07a" : ""
                  }}
                >
                  <div
                    className="blocktext"
                    style={{
                      color: c.includes("white") ? "white" : "black"
                    }}
                  >
                    <img
                      src={`/assets/${c.split("-pos")[0]}.png`}
                      alt=""
                      width="42px"
                    />
                    {/* {c.split("-")[1]} */}
                  </div>
                </div>
              ));
            })}
          </div>
          <div>
            <div>Turn of {isBlackTurn ? "Black" : "White"} Player</div>
            <h2>Dead Pawns</h2>
            {deleted.map((a, i) => {
              return (
                <div key={i}>
                  <img
                    src={`/assets/${a.split("-pos")[0]}.png`}
                    alt=""
                    width="42px"
                  />
                </div>
              );
            })}
          </div>
          {/* <div className="board">
        {Object.keys(obb).map((a, i) => {
          return obb[a].map((c, j) => (
            <div
              key={i + j}
              className={(i + j) % 2 === 0 ? "black block" : "white block"}
              onClick={() => divClick(i, j, c)}
            >
              <div
                className="blocktext"
                style={{ color: c.player == "black" ? "black" : "white" }}
              >
                {c.currPiece}
              </div>
            </div>
          ));
        })}
      </div> */}
        </div>
      )}
    </>
  );
}

export default App;

const checkPawn = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    if (i > 0 && j > 0 && tmp[i - 1][j - 1].includes("white")) {
      tmp[i - 1][j - 1] += "-pos";
    }
    if (j < 7 && i > 0 && tmp[i - 1][j + 1].includes("white")) {
      tmp[i - 1][j + 1] += "-pos";
    }
    if (
      i > 0 &&
      i < 8 &&
      j < 8 &&
      j >= 0 &&
      tmp[i - 1][j] == "" &&
      !tmp[i - 1][j].includes("black")
    ) {
      tmp[i - 1][j] += "-pos";
    }
  } else {
    if (isBlackTurn) return;
    if (i < 7 && j < 7 && tmp[i + 1][j + 1].includes("black")) {
      tmp[i + 1][j + 1] += "-pos";
    }
    if (j > 0 && i < 7 && tmp[i + 1][j - 1].includes("black")) {
      tmp[i + 1][j - 1] += "-pos";
    }
    if (
      i > 0 &&
      i < 8 &&
      j < 8 &&
      j >= 0 &&
      tmp[i + 1][j] == "" &&
      !tmp[i + 1][j].includes("white")
    ) {
      tmp[i + 1][j] += "-pos";
    }
  }
};

const checkKnight = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    changeTmp(tmp, i, j, "black");
  } else {
    if (isBlackTurn) return;
    changeTmp(tmp, i, j, "white");
  }
  function changeTmp(tmp, i, j, type) {
    if (i > 1 && j < 7 && !tmp[i - 2][j + 1].includes(type)) {
      tmp[i - 2][j + 1] += "-pos";
    }
    if (i > 1 && j > 0 && !tmp[i - 2][j - 1].includes(type)) {
      tmp[i - 2][j - 1] += "-pos";
    }
    if (i < 6 && j < 7 && !tmp[i + 2][j + 1].includes(type)) {
      tmp[i + 2][j + 1] += "-pos";
    }
    if (i < 6 && j > 0 && !tmp[i + 2][j - 1].includes(type)) {
      tmp[i + 2][j - 1] += "-pos";
    }
    if (i < 7 && j > 1 && !tmp[i + 1][j - 2].includes(type)) {
      tmp[i + 1][j - 2] += "-pos";
    }
    if (i > 0 && j > 1 && !tmp[i - 1][j - 2].includes(type)) {
      tmp[i - 1][j - 2] += "-pos";
    }
    if (i < 7 && j < 6 && !tmp[i + 1][j + 2].includes(type)) {
      tmp[i + 1][j + 2] += "-pos";
    }
    if (i > 0 && j < 6 && !tmp[i - 1][j + 2].includes(type)) {
      tmp[i - 1][j + 2] += "-pos";
    }
  }
};

const checkRook = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    changeTmp(tmp, i, j, "white");
  } else {
    if (isBlackTurn) return;
    changeTmp(tmp, i, j, "black");
  }

  function changeTmp(tmp, i, j, type) {
    let l = j - 1,
      r = j + 1,
      t = i - 1,
      b = i + 1;
    while (l >= 0 && (tmp[i][l] === "" || tmp[i][l].includes(type))) {
      tmp[i][l] += "-pos";
      if (tmp[i][l].includes(type)) {
        break;
      }
      l--;
    }
    while (r <= 7 && (tmp[i][r] === "" || tmp[i][r].includes(type))) {
      tmp[i][r] += "-pos";
      if (tmp[i][r].includes(type)) {
        break;
      }
      r++;
    }
    while (t >= 0 && (tmp[t][j] === "" || tmp[t][j].includes(type))) {
      tmp[t][j] += "-pos";
      if (tmp[t][j].includes(type)) {
        break;
      }
      t--;
    }
    while (b <= 7 && (tmp[b][j] === "" || tmp[b][j].includes(type))) {
      tmp[b][j] += "-pos";
      if (tmp[b][j].includes(type)) {
        break;
      }
      b++;
    }
  }
};

const checkBishop = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    changeTmp(tmp, i, j, "white");
  } else {
    if (isBlackTurn) return;
    changeTmp(tmp, i, j, "black");
  }

  function changeTmp(tmp, i, j, type) {
    let l = j - 1,
      r = j + 1,
      t = i - 1,
      b = i + 1;
    while (l >= 0 && t >= 0 && (tmp[t][l] === "" || tmp[t][l].includes(type))) {
      tmp[t][l] += "-pos";
      if (tmp[t][l].includes(type)) {
        break;
      }
      l--;
      t--;
    }
    t = i - 1;
    while (r <= 7 && t >= 0 && (tmp[t][r] === "" || tmp[t][r].includes(type))) {
      tmp[t][r] += "-pos";
      if (tmp[t][r].includes(type)) {
        break;
      }
      r++;
      t--;
    }
    l = j - 1;
    while (b <= 7 && l >= 0 && (tmp[b][l] === "" || tmp[b][l].includes(type))) {
      tmp[b][l] += "-pos";
      if (tmp[b][l].includes(type)) {
        break;
      }
      l--;
      b++;
    }
    b = i + 1;
    r = j + 1;
    while (b <= 7 && r <= 7 && (tmp[b][r] === "" || tmp[b][r].includes(type))) {
      tmp[b][r] += "-pos";
      if (tmp[b][r].includes(type)) {
        break;
      }
      b++;
      r++;
    }
  }
};

const checkKing = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    changeTmp(tmp, i, j, "black");
  } else {
    if (isBlackTurn) return;
    changeTmp(tmp, i, j, "white");
  }

  function changeTmp(tmp, i, j, type) {
    if (i > 0 && j < 7 && !tmp[i - 1][j + 1].includes(type)) {
      tmp[i - 1][j + 1] += "-pos";
    }
    if (i > 0 && j > 0 && !tmp[i - 1][j - 1].includes(type)) {
      tmp[i - 1][j - 1] += "-pos";
    }
    if (i < 7 && j < 7 && !tmp[i + 1][j + 1].includes(type)) {
      tmp[i + 1][j + 1] += "-pos";
    }
    if (i < 7 && j > 0 && !tmp[i + 1][j - 1].includes(type)) {
      tmp[i + 1][j - 1] += "-pos";
    }
    if (j > 0 && !tmp[i][j - 1].includes(type)) {
      tmp[i][j - 1] += "-pos";
    }
    if (i > 0 && !tmp[i - 1][j].includes(type)) {
      tmp[i - 1][j] += "-pos";
    }
    if (i < 7 && !tmp[i + 1][j].includes(type)) {
      tmp[i + 1][j] += "-pos";
    }
    if (j < 7 && !tmp[i][j + 1].includes(type)) {
      tmp[i][j + 1] += "-pos";
    }
  }
};

const checkQueen = (tmp, i, j, c, isBlackTurn) => {
  if (c.includes("black")) {
    if (!isBlackTurn) return;
    changeTmp(tmp, i, j, "white");
  } else {
    if (isBlackTurn) return;
    changeTmp(tmp, i, j, "black");
  }

  function changeTmp(tmp, i, j, type) {
    let l = j - 1,
      r = j + 1,
      t = i - 1,
      b = i + 1;

    while (l >= 0 && (tmp[i][l] === "" || tmp[i][l].includes(type))) {
      tmp[i][l] += "-pos";
      if (tmp[i][l].includes(type)) {
        break;
      }
      l--;
    }
    while (r <= 7 && (tmp[i][r] === "" || tmp[i][r].includes(type))) {
      tmp[i][r] += "-pos";
      if (tmp[i][r].includes(type)) {
        break;
      }
      r++;
    }
    while (t >= 0 && (tmp[t][j] === "" || tmp[t][j].includes(type))) {
      tmp[t][j] += "-pos";
      if (tmp[t][j].includes(type)) {
        break;
      }
      t--;
    }
    while (b <= 7 && (tmp[b][j] === "" || tmp[b][j].includes(type))) {
      tmp[b][j] += "-pos";
      if (tmp[b][j].includes(type)) {
        break;
      }
      b++;
    }

    l = j - 1;
    r = j + 1;
    t = i - 1;
    b = i + 1;

    while (l >= 0 && t >= 0 && (tmp[t][l] === "" || tmp[t][l].includes(type))) {
      tmp[t][l] += "-pos";
      if (tmp[t][l].includes(type)) {
        break;
      }
      l--;
      t--;
    }
    t = i - 1;
    while (r <= 7 && t >= 0 && (tmp[t][r] === "" || tmp[t][r].includes(type))) {
      tmp[t][r] += "-pos";
      if (tmp[t][r].includes(type)) {
        break;
      }
      r++;
      t--;
    }
    l = j - 1;
    while (b <= 7 && l >= 0 && (tmp[b][l] === "" || tmp[b][l].includes(type))) {
      tmp[b][l] += "-pos";
      if (tmp[b][l].includes(type)) {
        break;
      }
      l--;
      b++;
    }
    b = i + 1;
    r = j + 1;
    while (b <= 7 && r <= 7 && (tmp[b][r] === "" || tmp[b][r].includes(type))) {
      tmp[b][r] += "-pos";
      if (tmp[b][r].includes(type)) {
        break;
      }
      b++;
      r++;
    }
  }
};
