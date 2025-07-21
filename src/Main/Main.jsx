import html2canvas from "html2canvas"; // nou
import styles from "./Main.module.css";
import { useState, useRef } from "react";

function Main() {
  const [squares, setSquares] = useState(16);
  const [size, setSize] = useState(25);
  const [color, setColor] = useState("#000000");
  const [reset, setReset] = useState(false);

  const gridRef = useRef(null); // referință la grilă

  const createGrid = () => {
    const total = squares * squares;
    return Array.from({ length: total }, (_, index) => (
      <div
        key={index}
        className={styles.square}
        style={{ width: `${size}px`, height: `${size}px` }}
        onMouseDown={(e) => (e.target.style.backgroundColor = color)}
        onMouseEnter={(e) => {
          if (e.buttons === 1) e.target.style.backgroundColor = color;
        }}
      />
    ));
  };

  const saveAsImage = () => {
    if (gridRef.current) {
      html2canvas(gridRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "drawboard.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎨 DrawBoard</h1>
      <p className={styles.subtitle}>
        Express your creativity — one square at a time.
      </p>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>
            Grid Size: {squares} x {squares}
          </label>
          <input
            type="range"
            min={4}
            max={50}
            value={squares}
            onChange={(e) => setSquares(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.controlGroup}>
          <label>Square Size: {size}px</label>
          <input
            type="range"
            min={10}
            max={50}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.controlGroup}>
          <label>Pick Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button className={styles.resetBtn} onClick={() => setReset(!reset)}>
          🧹 Clear Board
        </button>
      </div>

      <div
        key={reset}
        ref={gridRef}
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${squares}, ${size}px)`,
          gridTemplateRows: `repeat(${squares}, ${size}px)`,
        }}
      >
        {createGrid()}
      </div>
      <button className={styles.saveBtn} onClick={saveAsImage}>
        💾 Save as Image
      </button>
    </div>
  );
}

export default Main;
