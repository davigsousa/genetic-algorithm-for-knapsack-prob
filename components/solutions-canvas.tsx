import { ProblemParams, useProblemParams } from "@/contexts/ProblemParams";
import { Solution } from "@/types/problem";
import { useCallback, useEffect, useRef } from "react";

function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

interface SolutionsCanvasProps {
  solution: Solution;
  problemParams: ProblemParams;
}

export default function SolutionsCanvas({
  solution,
  problemParams,
}: SolutionsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CANVAS_WIDTH = 300;
  const proportionalHeight =
    (CANVAS_WIDTH * problemParams.warehouse.height) /
    problemParams.warehouse.width;

  const drawSolution = useCallback(
    (context: CanvasRenderingContext2D) => {
      console.log("drawSolution");
      for (const box of solution.boxes) {
        context.fillStyle = getRandomHexColor();
        context.fillRect(box.position.x, box.position.y, box.width, box.height);
      }
    },
    [solution]
  );

  useEffect(() => {
    if (canvasRef) {
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        drawSolution(context);
      }
    }
  }, [drawSolution]);

  return (
    <canvas ref={canvasRef} width={CANVAS_WIDTH} height={proportionalHeight} />
  );
}
