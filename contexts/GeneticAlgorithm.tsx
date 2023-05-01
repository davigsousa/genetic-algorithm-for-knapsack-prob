import React, { useCallback } from "react";
import { Solution } from "@/types/problem";
import { commonVisualBoxes } from "@/mocks";

interface GeneticAlgorithmContextType {
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
  const [generation, setGeneration] = React.useState<number>(1);
  const [bestSolution, setBestSolution] = React.useState<Solution | null>(null);

  const startAlgorithm = useCallback(() => {
    const interval = setInterval(() => {
      setGeneration((generation) => generation + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GeneticAlgorithmContext.Provider
      value={{
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
