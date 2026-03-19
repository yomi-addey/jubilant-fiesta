import { useEffect, useRef, useState } from "react";

interface GamePiecesProp {}

interface WebPageApple {
  pageName: string;
  applePos: { x: number; y: number };
}

const GamePieces = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas constants
  const height = 700;
  const width = height;

  // Snake constants
  const SNAKE_SPEED = 10;
  const SNAKE_PART_SIZE = 15;
  const APPLE_SIZE = SNAKE_PART_SIZE;

  const initSnakePos = { x: 100, y: 100 };

  // Positions
  const [apples, setApples] = useState([
    { pageName: "Experience", applePos: { x: 100, y: 300 } },
    { pageName: "Projects", applePos: { x: 600, y: 50 } },
    { pageName: "About", applePos: { x: 600, y: 600 } },
  ]);
  const [snake, setSnake] = useState([
    initSnakePos,
    { x: initSnakePos.x - SNAKE_PART_SIZE, y: initSnakePos.y },
  ]);

  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawSnake = () => {
      snake.forEach((snakePart) => {
        ctx.beginPath();
        ctx.rect(snakePart.x, snakePart.y, SNAKE_PART_SIZE, SNAKE_PART_SIZE);
        ctx.fillStyle = "#ff67d9";
        ctx.fill();
        ctx.closePath;
      });
    };

    const drawApples = () => {
      apples.forEach((apple) => {
        const pos = apple.applePos;
        const fontSize = 16;
        const color = "#f64040"
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(apple.pageName, pos.x + APPLE_SIZE / 2, pos.y - 5);

        ctx.beginPath();
        ctx.rect(pos.x, pos.y, APPLE_SIZE, APPLE_SIZE);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      });
    };

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApples();
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [snake, apples]);

  return (
    <div>
      <canvas
        className="gameCanvas"
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

export default GamePieces;
