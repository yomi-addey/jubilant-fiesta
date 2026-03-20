import { useEffect, useRef, useState } from "react";

interface GamePiecesProp {
  allPages: string[];
  currentPages: string[];
  setPages: (pages: string[]) => string[];
}

interface WebPageApple {
  pageName: string;
  applePos: { x: number; y: number };
}

const GamePieces = ({ allPages, currentPages, setPages }: GamePiecesProp) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas constants
  const height = 700;
  const width = height;

  // Snake constants
  const SNAKE_SPEED = 10;
  const SNAKE_PART_SIZE = 15;
  const APPLE_SIZE = SNAKE_PART_SIZE;

  const initSnakePos = { x: 100, y: 100 };

  const randomInt = (min: number, max: number): number => {
    const minCeiled: number = Math.ceil(min);
    const maxFloored: number = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  };

  // Positions
  const [apples, setApples] = useState(
    allPages.map((pageName) => {
      return {
        pageName: pageName,
        applePos: {
          x: randomInt(100, width * 0.75),
          y: randomInt(100, height * 0.75),
        },
      };
    }),
  );
  const [snake, setSnake] = useState([
    initSnakePos,
    { x: initSnakePos.x - SNAKE_PART_SIZE, y: initSnakePos.y },
  ]);

  const [direction, setDirection] = useState<string | null>(null);

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
        const color = "#f64040";
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

    const moveSnake = () => {
      if (direction) {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const snakeHead = { x: newSnake[0].x, y: newSnake[0].y };

          for (let i = newSnake.length - 1; i > 0; i--) {
            newSnake[i].x = newSnake[i - 1].x;
            newSnake[i].y = newSnake[i - 1].y;
          }

          switch (direction) {
            case "right":
              snakeHead.x += SNAKE_SPEED;
              break;
            case "left":
              snakeHead.x -= SNAKE_SPEED;
              break;
            case "up":
              snakeHead.y -= SNAKE_SPEED;
              break;
            case "down":
              snakeHead.y += SNAKE_SPEED;
              break;
            default:
              break;
          }

          newSnake[0] = snakeHead;
          handleAppleCollision(snakeHead);

          return newSnake;
        });
      }
    };

    const handleAppleCollision = (snakeHead: { x: number; y: number }) => {
      const eatenIndex = apples.findIndex((apple) => {
        const pos = apple.applePos;
        snakeHead.x === pos.x && snakeHead.y === pos.y;
      });

      // Add the webpage name to the list of available pages in the navbar
      setPages([...currentPages, apples[eatenIndex].pageName]);

      // Remove the eaten apple from the available apples/unexplored pages
      setApples(apples.splice(eatenIndex, 1));
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          setDirection("right");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        default:
          break;
      }
    };

    // Listen for keyboard movement
    window.addEventListener("keydown", handleKeyPress);

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawApples();
      moveSnake();
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [snake, direction, apples]);

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
