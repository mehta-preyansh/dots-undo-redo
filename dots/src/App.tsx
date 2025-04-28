import { MouseEvent, useState } from "react";
import "./App.css";

type Dot = {
  x: number;
  y: number;
}

function App() {
  const [undoStack, setUndoStack] = useState<Dot[]>([]);
  const [redoStack, setRedoStack] = useState<Dot[]>([]);

  const handleUndo = () => {
    if(undoStack.length === 0) return;
    const lastDot = undoStack[undoStack.length - 1];
    setUndoStack((prevDots) => prevDots.slice(0, -1));
    setRedoStack((prevDots) => [...prevDots, lastDot]);
  };
  const handleRedo = () => {
    if(redoStack.length === 0) return;
    const lastDot = redoStack[redoStack.length - 1];
    setRedoStack((prevDots) => prevDots.slice(0, -1));
    setUndoStack((prevDots) => [...prevDots, lastDot]);
  };
  const handleClick = (e:MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if (offsetX < 0 || offsetY < 0 || offsetX > rect.width || offsetY > rect.height) return;
    const newDot: Dot = { x: offsetX, y: offsetY };
    setUndoStack((prevDots) => [...prevDots, newDot]); 
    setRedoStack([]); // Clear redo stack on new action
  };
  
  return (
    <div className="container">
      <div className="btn-wrapper">
        <button className="button" onClick={handleUndo}>
          {"Undo"}
        </button>
        <button className="button" onClick={handleRedo}>
          {"Redo"}
        </button>
      </div>
      <div id="space" className="space" onClick={handleClick}>
        {undoStack.map((dot, index) => {
          return (
            <div
              key={index}
              className="dot"
              style={{position:"absolute" , left: dot.x, top: dot.y }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
