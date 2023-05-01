import { ProblemParams, useProblemParams } from "@/contexts/ProblemParams";
import { Solution } from "@/types/problem";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface SolutionsCanvasProps {
  solution: Solution;
  problemParams: ProblemParams;
}

export default function SolutionsCanvas({
  solution,
  problemParams,
}: SolutionsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasWidth = 300;
  const getProportionalSize = useCallback(
    (problemSize: number) =>
      (problemSize * canvasWidth) / problemParams.warehouse.width,
    [problemParams.warehouse.width, canvasWidth]
  );

  const canvasHeight = getProportionalSize(problemParams.warehouse.height);

  const drawSolution = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.fillStyle = "#CCCCCC";
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      for (const box of solution.boxes) {
        context.fillStyle = box.color;
        context.fillRect(
          getProportionalSize(box.position?.x || 0),
          getProportionalSize(box.position?.y || 0),
          getProportionalSize(box.width),
          getProportionalSize(box.height)
        );
      }
    },
    [solution, canvasHeight, getProportionalSize]
  );

  useEffect(() => {
    if (canvasRef) {
      const context = canvasRef.current?.getContext("2d");
      if (context) {
        drawSolution(context);
      }
    }
  }, [drawSolution]);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
}
