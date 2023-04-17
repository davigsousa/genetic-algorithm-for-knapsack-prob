import React from "react";
import { Box } from "@/types/problem";

interface Solution {
  boxes: Box[];
  fitness: number;
}

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
  const [bestSolution, setBestSolution] = React.useState<Solution | null>(null);

  const startAlgorithm = () => {
    setBestSolution({
      boxes: [],
      fitness: 0,
    });
  };

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
