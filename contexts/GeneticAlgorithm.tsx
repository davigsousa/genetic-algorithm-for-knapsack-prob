import React, { useCallback, useEffect, useRef } from "react";
import { Solution } from "@/types/problem";
import { commonVisualBoxes } from "@/mocks";
import { Actions } from "@/workers/actions";
import { useProblemParams } from "./ProblemParams";

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
    workerRef.current = new Worker(
      new URL("../workers/runAlgorithm.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event: MessageEvent) => {
      setGeneration(event.data.payload.generation);
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
