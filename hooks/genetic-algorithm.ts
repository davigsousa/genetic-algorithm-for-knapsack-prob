import React, { useCallback, useEffect, useRef } from "react";
import { Solution } from "@/types/problem";
import { Actions } from "@/workers/actions";
import { Individual } from "@/algorithm/individual";
import { useProblemParams } from "@/contexts/ProblemParams";
import { LOG_ON_GENERATION } from "@/workers/runAlgorithm";

function getBestSolutionFromPopulation(population: Individual[]): Solution {
  const bestSolution = population.reduce((best, current) => {
    if (best.fitness > current.fitness) {
      return best;
    }

    return current;
  }, population[0]);

  return {
    boxes: bestSolution.chromosome.filter((gene) => gene.isPresent),
    fitness: bestSolution.fitness,
  };
}

export function useGeneticAlgorithm() {
  const workerRef = useRef<Worker>();
  const { params } = useProblemParams();

  const [generation, setGeneration] = React.useState<number>(0);
  const [bestSolution, setBestSolution] = React.useState<Solution | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/runAlgorithm.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event: MessageEvent) => {
      const { action, payload } = event.data;

      if (action === Actions.UPDATE_SOLUTION) {
        const { generation, population } = payload;
        const bestSolution = getBestSolutionFromPopulation(population);

        setGeneration(generation);
        setBestSolution(bestSolution);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [params]);

  const startAlgorithm = useCallback(() => {
    if (!params) return;

    workerRef.current?.postMessage({
      action: Actions.START_ALGORITHM,
      payload: {
        params,
        population: [],
      },
    });
  }, [params]);

  useEffect(startAlgorithm, [startAlgorithm]);

  return {
    generation,
    bestSolution,
  };
}
