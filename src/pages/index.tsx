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

  const bombcountboard: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

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
  // 右クリック
  const clickR = (x: number, y: number) => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    if (board[y][x] === -1 && userInputs[y][x] === 0) {
      newuserInputs[y][x] = 2;
      setUserInputs(newuserInputs);
    }
    if (userInputs[y][x] === 2) {
      newuserInputs[y][x] = 3;
      setUserInputs(newuserInputs);
    }
    if (userInputs[y][x] === 3) {
      newuserInputs[y][x] = 0;
      setUserInputs(newuserInputs);
    }
  };
  const clickHandler = (x: number, y: number) => {
    if (bombcountboard[y][x] === 0 && userInputs[y][x] === 0) {
      while (newbombMap.flat().filter((number) => number === 1).length < 10) {
        const Y = Math.floor(Math.random() * 9);
        const X = Math.floor(Math.random() * 9);
        if (Y === y && X === x) {
          return;
        }
        newbombMap[Y][X] = 1;
      }
      setBombMap(newbombMap);
    }
    if (userInputs[y][x] === 0) {
      newuserInputs[y][x] = 1;
      setUserInputs(newuserInputs);
    }
  };
  // topboardに動きをつける
  // const clicktopboard = (z: number) => {
  //   if (board[z])
  // }

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
          bombcountboard[a][b] = 11;
          if (bombMap[a + direction[0]][b + direction[1]] !== 1) {
            bombcountboard[a + direction[0]][b + direction[1]] += 1;
          }
        }
        if (newuserInputs[a][b] === 2) {
          board[a][b] = 9;
        }
        if (newuserInputs[a][b] === 3) {
          board[a][b] = 10;
        }
      }
    }
  }
  // 空白連鎖
  const opencell = (x: number, y: number) => {
    board[y][x] = bombcountboard[y][x];
    if (bombcountboard[y][x] === 0) {
      for (const direction of directions) {
        if (
          y + direction[0] < 0 ||
          y + direction[0] >= 9 ||
          x + direction[1] < 0 ||
          x + direction[1] >= 9
        ) {
          continue;
        }
        if (board[y + direction[0]][x + direction[1]] === -1) {
          opencell(x + direction[1], y + direction[0]);
        }
      }
    }
  };
  for (let a = 0; a < 9; a++) {
    for (let b = 0; b < 9; b++) {
      if (newuserInputs[a][b] === 1) {
        opencell(b, a);
      }
    }
  }
  //にこにこクリック->すべてのボードが初期値に戻る
  const clicksmile = () => {
    setUserInputs((Inputs) => Inputs.map((row) => row.map(() => 0)));
    setBombMap((Bomb) => Bomb.map((row) => row.map(() => 0)));
  };

  // 爆弾クリック->マスをクリックしても何も動かない&topcenterをばってんニコちゃん
  // const isEnd = (x: number, y: number) => {
  //   if
  // }

  // // クリア条件(爆弾以外を全てクリック)->マスをクリックしても何も動かない&タイマーストップ&きらきらにこちゃん
  // const isClear = (x: number, y: number) => {
  //   if
  // };

  // ボムの数引く旗の数(boardが10の数(旗))
  const FlagCount = board.flat().filter((number) => number === 10).length;
  const score = bombConst - FlagCount;
  const flagbombscore = score.toString().padStart(3, '0');

  // // boardrightにタイマーbombmapに0以外がセットされたときにスタートし、isEndがTrueのときに止まる
  // const timer = () => {
  //   isPlayingがTrueのときにスタート
  // }

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

  console.table(bombMap);
  console.table(newuserInputs);
  // console.table(bombcountboard);
  console.table(board);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.topboard}>
          <div className={styles.topleft}>{flagbombscore}</div>
          <div
            className={styles.topcenter}
            onClick={() => clicksmile()}
            style={{ backgroundPosition: `${-30 * 13 - 2}px 1px` }}
            // backgroundPositionの後ろにisEnd ? `${-30 * 15 - 10}px 1px` : isClear ? `${-30 * 14 - 5}px 1px` :
          />
          <div className={styles.topright}>000</div>
        </div>
        <div className={styles.bottomboard}>
          <div className={styles.boardStyle}>
            {board.map((row, y) =>
              row.map((number, x) => (
                <div
                  className={styles.tileStyle}
                  style={{
                    border:
                      number === -1
                        ? undefined
                        : number === 9 || number === 10
                          ? undefined
                          : 'none',
                  }}
                  key={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                  onContextMenu={() => clickR(x, y)}
                >
                  {number !== -1 && (
                    <div
                      className={styles.sampleStyle}
                      style={{ backgroundPosition: `${-30 * (number - 1)}px 0px` }}
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
