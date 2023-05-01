import React, { useCallback, useEffect, useRef } from "react";
import { Solution } from "@/types/problem";
import { Actions } from "@/workers/actions";
import { useProblemParams } from "./ProblemParams";
import { Individual } from "@/algorithm/individual";

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

interface GeneticAlgorithmContextType {
  generation: number;
  bestSolution: Solution | null;
  startAlgorithm: () => void;
}

export const GeneticAlgorithmContext =
  React.createContext<GeneticAlgorithmContextType | null>(null);

export function GeneticAlgorithmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const workerRef = useRef<Worker>();
  const { params } = useProblemParams();
  const [generation, setGeneration] = React.useState<number>(0);
  const [bestSolution, setBestSolution] = React.useState<Solution | null>(null);

  useEffect(() => {
    setGeneration(0);
    setBestSolution(null);

    workerRef.current = new Worker(
      new URL("../workers/runAlgorithm.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event: MessageEvent) => {
      const { action, payload } = event.data;

      if (action === Actions.UPDATE_SOLUTION) {
        const { generation, population } = payload;
        const bestSolution = getBestSolutionFromPopulation(population);

        setGeneration(generation / 1000);
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

  return (
    <GeneticAlgorithmContext.Provider
      value={{
        generation,
        bestSolution,
        startAlgorithm,
      }}
    >
      {children}
    </GeneticAlgorithmContext.Provider>
  );
}

export function useGeneticAlgorithm() {
  const context = React.useContext(GeneticAlgorithmContext);

  if (!context) {
    throw new Error(
      "useGeneticAlgorithm must be used within a GeneticAlgorithmProvider"
    );
  }

  return context;
}
