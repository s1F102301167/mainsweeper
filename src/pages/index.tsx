import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 0 -> 未クリック
  // 1 -> 左クリック
  // 2 -> はてな
  // 3 -> 旗
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
  const [samplePos, setSamplePos] = useState(0);
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
  const board: number[][] = [];
  console.log(samplePos);

  for (let y = 0; y < 9; y++){
    for (let x = 0; x < 9; x++){

    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}></div>
      {/* <div
        className={styles.sampleStyle}
        style={{ backgroundPosition: `${-30 * samplePos}px 0px` }}
      /> */}
      {/* <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button> */}
    </div>
  );
};

export default Home;

// 作業手順
// ボード作成
