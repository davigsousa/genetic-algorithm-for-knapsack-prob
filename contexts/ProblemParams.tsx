import { Warehouse, Box } from "@/types/problem";
import React from "react";

interface ProblemParams {
  warehouse: Warehouse;
  boxes: Box[];
}

interface ParamsInputs {
  warehouse: Warehouse;
  numberOfBoxes: number;
}

interface ProblemParamsContextType {
  params: ProblemParams | null;
  updateParamsFromInputs: (inputs: ParamsInputs) => void;
}

export const ProblemParamsContext =
  React.createContext<ProblemParamsContextType | null>(null);

export function ProblemParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [params, setParams] = React.useState<ProblemParams | null>(null);

  const updateParamsFromInputs = (inputs: ParamsInputs) => {};

  return (
    <ProblemParamsContext.Provider
      value={{
        params,
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
