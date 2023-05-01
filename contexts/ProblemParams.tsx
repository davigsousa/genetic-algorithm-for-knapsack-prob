import { Warehouse, Box } from "@/types/problem";
import { useRouter } from "next/router";
import React from "react";

export interface ProblemParams {
  populationSize: number;
  warehouse: Warehouse;
  boxes: Box[];
}

interface ParamsInputs {
  warehouse: Warehouse;
  numberOfBoxes: number;
}

interface ProblemParamsContextType {
  params: ProblemParams | null;
  generatingParams: boolean;
  updateParamsFromInputs: (inputs: ParamsInputs) => void;
}

export const ProblemParamsContext =
  React.createContext<ProblemParamsContextType | null>(null);

export function ProblemParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [generatingParams, setGeneratingParams] =
    React.useState<boolean>(false);
  const [params, setParams] = React.useState<ProblemParams | null>(null);

  const updateParamsFromInputs = ({
    warehouse,
    numberOfBoxes,
  }: ParamsInputs) => {
    setGeneratingParams(true);

    const generateRandomNumber = (min: number = 1, max: number = 10) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    let nextPrice = 1;

    const boxes: Box[] = [];
    for (let i = 0; i < numberOfBoxes; i++) {
      const width = generateRandomNumber(1, warehouse.width - 1);
      const height = generateRandomNumber(1, warehouse.height - 1);

      boxes.push({
        width,
        height,
        weight: generateRandomNumber(1, warehouse.weightLimit - 1),
        priceValue: generateRandomNumber(1, nextPrice),
        position: {
          x: generateRandomNumber(1, warehouse.width - (width / 2 - 1)),
          y: generateRandomNumber(1, warehouse.height - (height / 2 - 1)),
        },
      });

      nextPrice = nextPrice + generateRandomNumber(2, 4);
    }

    setParams({ warehouse, boxes, populationSize: 100 });
    setGeneratingParams(false);
    router.push("/boxes");
  };

  return (
    <ProblemParamsContext.Provider
      value={{
        params,
        generatingParams,
        updateParamsFromInputs,
      }}
    >
      {children}
    </ProblemParamsContext.Provider>
  );
}

export function useProblemParams() {
  const context = React.useContext(ProblemParamsContext);
  if (context === null) {
    throw new Error(
      "useProblemParams must be used within a ProblemParamsProvider"
    );
  }
  return context;
}
