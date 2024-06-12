import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 0 -> 未クリック
  // 1 -> 左クリック
  // 2 -> はてな(右クリック２回)
  // 3 -> 旗(右クリック１回)
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  const bombConst = 10;
  // 0 -> ボム無し
  // 1 -> ボム有り
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );
  // -1 -> 石
  // 0 -> 画像無しセル
  // 1~8 -> 数字セル
  // 9 -> 石+はてな
  // 10 -> 石+旗
  // 11 -> ボムセル

  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  // console.log(board);
  const newuserInputs = structuredClone(userInputs);
  const newbombMap = structuredClone(bombMap);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] === -1) {
      while (newbombMap.flat().filter((number) => number === 1).length < 10) {
        const Y = Math.floor(Math.random() * 9);
        const X = Math.floor(Math.random() * 9);
        if (Y === y && X === x) {
          return;
        }
        newbombMap[Y][X] = 1;
        console.log(X, Y);
      }
      setBombMap(newbombMap);
    }
    // 左クリックをした
    if (userInputs[y][x] === 0) {
      newuserInputs[y][x] = 1;
      setUserInputs(newuserInputs);
    }
  };
  // ↓メモ
  // ユーザーインプットをクリック
  // 0 -> 未クリック
  // 1 -> 左クリック
  // 2 -> はてな
  // 3 -> 旗
  // if (board[y][x] === -1) {
  // for (const direction of directions) {
  // }
  // }
  // for (let y = 0; y < 9; y++) {
  //   for (let x = 0; x < 9; x++) {}
  // }
  // 上記を用いて８方向探索し、爆弾の数をそのマスに記載する
  // なかった場合：-1
  // １つの場合：samplePos
  // １つ以上の場合：samplePos + n

  // ボードに表示させるコード
  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
      for (const direction of directions) {
        if (
          a + direction[0] < 0 ||
          a + direction[0] >= 9 ||
          b + direction[1] < 0 ||
          b + direction[1] >= 9
        ) {
          continue;
        }
        if (bombMap[a][b] === 1) {
          board[a][b] = 10;
          if (bombMap[a + direction[0]][b + direction[1]] !== 1) {
            board[a + direction[0]][b + direction[1]] += 1;
          }
        }
      }
    }
  }
  // 空白連鎖

  console.table(bombMap);
  console.table(newuserInputs);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.topboard} />
        <div className={styles.bottomboard}>
          <div className={styles.boardStyle}>
            {board.map((row, y) =>
              row.map((number, x) => (
                <div
                  className={styles.tileStyle}
                  style={{ border: [number === -1 ? undefined : `none`] }}
                  key={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                >
                  {number !== -1 && (
                    <div
                      className={styles.sampleStyle}
                      style={{ backgroundPosition: `${-30 * number}px 0px` }}
                    />
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// 作業手順
// ボード作成
